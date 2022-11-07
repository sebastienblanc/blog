import * as d3 from 'https://cdn.skypack.dev/d3@7';

const defaultOptions = {
  legend: false,
  dataURL: '/static/data/political-plot-demo1.csv',
  selector: '#plot-1',
  margin: {
    top: 50,
    right: 50,
    bottom: 10,
    left: 50,
    legend: 200,
  },
  width: 760,
  height: 450,
  translations: {},
  axis: ['Progressisme', 'Démocratie', 'Ouverture', 'Interventionnisme', 'Liberté positive', 'Gauche'],
  avgKey: 'Gauche',
  colorScale: {
    domain: ['A1', 'A2', 'B1', 'B2'],
    range: ['#F88', '#F70', '#88F', '#08F'],
  },
  axisTitleRotation: -25,
  idKey: 'id',
};

const stretchMean = (data, axisNames, idx, translations) => {
  let dataAxisNames = [...axisNames];
  dataAxisNames.splice(idx, 1);
  return (
    dataAxisNames.reduce((sum, prevColumnName) => {
      let shiftedValue = Number(data[prevColumnName]) - Number(translations[prevColumnName] || 0);
      if (shiftedValue > 5) {
        shiftedValue = 5;
      } else if (shiftedValue < -5) {
        shiftedValue = -5;
      }
      return sum + shiftedValue;
    }, 0) / dataAxisNames.length
  );
};

/**
 * build a linear scale from an axis description
 */
const reduceAxis = (options) => (acc, columnName) => {
  const translation = Number(options.translations[columnName] || 0);
  const domain = translation > 0 ? [-5 + translation, 5] : [-5, 5 + translation];
  const shiftedOrigin = (translation * options._computed.innerHeight) / 10;
  const range = translation > 0 ? [options._computed.innerHeight, shiftedOrigin] : [options._computed.innerHeight + shiftedOrigin, 0];
  return {
    [columnName]: d3
      .scaleLinear()
      .domain(domain)
      // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
      .range(range),
    ...acc,
  };
};

const highlight = (key, color) => (e, d) => {
  const selectedColumn = d[key];

  const targetOpacity = 0.2
  d3.selectAll('.line').transition().duration(200).style('stroke', 'lightgrey').style('opacity', targetOpacity);
  d3.selectAll('.legend__dot').transition().duration(200).style('fill', 'lightgrey').style('opacity', targetOpacity);
  d3.selectAll('.legend__text').transition().duration(200).style('stroke', 'lightgrey').style('opacity', targetOpacity);

  d3.selectAll('.line.' + selectedColumn)
    .transition()
    .duration(200)
    .style('stroke', color(selectedColumn))
    .style('opacity', '1')
    .style('stroke-width', '8px');

  d3.selectAll('.legend__dot.' + selectedColumn)
    .transition()
    .duration(200)
    .style('fill', color(selectedColumn))
    .style('opacity', '1')

  d3.selectAll('.legend__text.' + selectedColumn)
    .transition()
    .duration(200)
    .style('stroke', color(selectedColumn))
    .style('opacity', '1')
};

const unHighlight = (key, color) => (e, d) => {
  const delay = 800;
  d3.selectAll('.line')
    .transition()
    .duration(200)
    .delay(delay)
    .style('stroke', (d) => color(d[key]))
    .style('opacity', '1')
    .style('stroke-width', '2px');

  d3.selectAll('.legend__dot')
    .transition()
    .duration(200)
    .delay(delay)
    .style('fill', (d) => color(d[key]))
    .style('opacity', '1')

  d3.selectAll('.legend__text')
    .transition()
    .duration(200)
    .delay(delay)
    .style('stroke', (d) => color(d[key]))
    .style('opacity', '1')
};

const drawAxis = (svg, axis, horizontalScalePoint, options) => {
  // Draw the axis:
  const axisSVG = svg
    .selectAll('myAxis')
    // For each dimension of the dataset I add a 'g' element:
    .data(options.axis)
    .enter()
    .append('g')
    .attr('class', 'axis')
    // I translate this element to its right position on the x axis
    // .attr('transform', (axisName) => {
    //   return `translate(${horizontalScalePoint(axisName)},${options.translations[axisName] || 0}00)`;
    // })
    .attr('transform', (axisName) => {
      return `translate(${horizontalScalePoint(axisName)})`;
    })
    // And I build the axis with the call function
    .each(function (d) {
      const ticksNbr = 10 - Math.abs(options.translations[d] || 0);
      d3.select(this).call(d3.axisLeft().ticks(ticksNbr).scale(axis[d]));
    });

  axisSVG
    // Add axis title
    .append('text')
    .attr('transform', `rotate(${options.axisTitleRotation}), translate(0, -10)`)
    .style('text-anchor', 'middle')
    .attr('y', -9)
    .text((d) => d)
    .style('fill', 'white');

  return axisSVG;
};

const drawLines = (svg, axis, data, horizontalScalePoint, color, options) =>
  svg
    .selectAll('myPath')
    .data(data)
    .join('path')
    .attr('class', (d) => 'line ' + d[options.idKey]) // 2 class for each line: 'line' and the group name
    .attr('d', pathFromCSVRow(horizontalScalePoint, options, axis))
    .style('fill', 'none')
    .style('stroke', (d) => color(d[options.idKey]))
    .style('stroke-width', '2px')
    .style('opacity', 0.6)
    .on('mouseover', highlight(options.idKey, color))
    .on('mouseleave', unHighlight(options.idKey, color));

const drawLegend = (svg, data, color, options) => {
  // Add one dot in the legend for each name.
  const legendSVG = svg
    .append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${options.width - options.margin.legend},${options.margin.top})`)
    .style('background', '#FFF');

  legendSVG
    .selectAll('mydots')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', 0)
    .attr('cy', (d, i) => 100 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
    .attr('r', 7)
    .attr('class', (d) => 'legend__dot ' + d[options.idKey]) // 2 class for each line: 'line' and the group name
    .style('fill', (d) => color(d[options.idKey]))
    .on('mouseover', highlight(options.idKey, color))
    .on('mouseleave', unHighlight(options.idKey, color));

  // Add one dot in the legend for each name.
  legendSVG
    .selectAll('mylabels')
    .data(data)
    .enter()
    .append('text')
    .attr('class', (d) => 'legend__text ' + d[options.idKey]) // 2 class for each line: 'line' and the group name
    .attr('x', 20)
    .attr('y', (d, i) => 100 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
    .style('fill', (d) => color(d[options.idKey]))
    .text((d) => d[options.idKey])
    .attr('text-anchor', 'left')
    .style('alignment-baseline', 'middle')
    .on('mouseover', highlight(options.idKey, color))
    .on('mouseleave', unHighlight(options.idKey, color));

  return legendSVG;
};

const pathFromCSVRow =
  (horizontalScalePoint, options, axis) =>
  /**
   * @param {string[]} data - a row of the csv
   * @returns {any} x and y coordinates of the line to draw for this raw
   */
  (data) => {
    return d3.line()(
      options.axis.map((axisName, idx) => {
        let value;
        if (axisName === options.avgKey) {
          value = stretchMean(data, options.axis, idx, options.translations);
        } else {
          const translation = Number(options.translations[axisName] || 0);
          const shiftedValue = Number(data[axisName]) + translation;

          value = Number(data[axisName]);

          if (translation) {
            if (translation > 0) {
              if (value <= -5 + translation) {
                value = -5 + translation;
              }
            } else {
              if (value >= 5 + translation) {
                value = 5 + translation;
              }
            }
          }
        }

        return [horizontalScalePoint(axisName), axis[axisName](value)];
      })
    );
  };

export async function drawPoliticalPlot(opts) {
  const options = { ...defaultOptions, ...opts };
  {
    const contentWidth = options.width - options.margin.left - options.margin.right;
    options._computed = {
      contentWidth: options.width - options.margin.left - options.margin.right,
      innerWidth: options.legend ? contentWidth - options.margin.legend : contentWidth,
      innerHeight: options.height - options.margin.top - options.margin.bottom,
    };
  }

  // append the svg object to the body of the page
  const svg = d3.select(options.selector).append('svg').attr('width', options.width).attr('height', options.height);

  const innerSVG = svg
    .append('g')
    .attr('transform', `translate(${options.margin.left},${options.margin.top})`)
    .style('background', '#1b1e23')
    .style('color', '#fff');

  // Parse the Data
  const data = await d3.csv(options.dataURL);

  // Color scale: give me a specie name, I return a color
  const color = d3.scaleOrdinal().domain(options.colorScale.domain).range(options.colorScale.range);

  // Build the X scale -> it find the best position for each Y axis
  const horizontalScalePoint = d3.scalePoint().range([0, options._computed.innerWidth]).domain(options.axis);

  const axis = options.axis.reduce(reduceAxis(options), {});

  drawLines(innerSVG, axis, data, horizontalScalePoint, color, options);

  drawAxis(innerSVG, axis, horizontalScalePoint, options);

  if (options.legend) {
    drawLegend(svg, data, color, options);
  }
}
