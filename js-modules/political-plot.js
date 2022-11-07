import * as d3 from 'https://cdn.skypack.dev/d3@7';

const defaultOptions = {
  legend: false,
  dataURL: '/static/data/political-plot-demo1.csv',
  selector: '#plot-1',
  margin: {
    top: 30,
    right: 50,
    bottom: 10,
    left: 50,
    legend: 200
  },
  width: 760,
  height: 450,
  translations: {},
  axis: ['Progressisme', 'Démocratie', 'Ouverture', 'Interventionnisme', 'Liberté positive', 'Gauche'],
  avgKey: 'Gauche',
  colorScale: {
    domain: ['A1', 'A2', 'B1', 'B2'],
    range: ['#F88', '#F70', '#88F', '#08F']
  },
  idKey: 'id'
};

const stretchMean = (data, axisNames, idx, translations) => {
  let dataAxisNames = [...axisNames];
  dataAxisNames.splice(idx, 1);
  return dataAxisNames.reduce((sum, prevColumnName) => {
    let shiftedValue = Number(data[prevColumnName]) - Number(translations[prevColumnName] || 0);
    if (shiftedValue > 5) {
      shiftedValue = 5;
    } else if (shiftedValue < -5) {
      shiftedValue = -5;
    }
    return sum + shiftedValue;
  }, 0) / dataAxisNames.length;
};

const highlight = (key, color) => (e, d) => {

  const selectedColumn = d[key]

  // first every group turns grey
  d3.selectAll(".line")
    .transition().duration(200)
    .style("stroke", "lightgrey")
    .style("opacity", "0.2")
  // Second the hovered specie takes its color
  d3.selectAll("." + selectedColumn)
    .transition().duration(200)
    .style("stroke", color(selectedColumn))
    .style("opacity", "1")
    .style("stroke-width", "8px")
}

const unHighlight = (key, color) => (e, d) => {
  d3.selectAll(".line")
    .transition().duration(200).delay(1000)
    .style("stroke", (d) => color(d[key]))
    .style("opacity", "1")
    .style("stroke-width", "2px")
}

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
  // set the dimensions and margins of the graph
  const contentWidth = options.width - options.margin.left - options.margin.right;
  const innerWidth = options.legend ? contentWidth - options.margin.legend : contentWidth;
  const innerHeight = options.height - options.margin.top - options.margin.bottom;
  const { margin, axis: axisNames } = options;

  // append the svg object to the body of the page
  const svg = d3
    .select(options.selector)
    .append('svg')
    .attr('width', options.width)
    .attr('height', options.height);
  
  const innerSVG = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .style('background', '#1b1e23')
    .style('color', '#fff');

  // Parse the Data
  const data = await d3.csv(options.dataURL);

  // Color scale: give me a specie name, I return a color
  const color = d3.scaleOrdinal().domain(options.colorScale.domain).range(options.colorScale.range);

  // For each dimension, I build a linear scale. I store all in a y object
  const axis = axisNames.reduce((acc, columnName) => {
    const translation = Number(options.translations[columnName] || 0);
    const domain = translation > 0 ? [-5 + translation, 5] : [-5, 5 + translation];
    const shiftedOrigin = (translation * innerHeight) / 10;
    const range = translation > 0 ? [innerHeight, shiftedOrigin] : [innerHeight + shiftedOrigin, 0];
    return {
      [columnName]: d3
        .scaleLinear()
        .domain(domain)
        // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
        .range(range),
      ...acc,
    };
  }, {});

  // Build the X scale -> it find the best position for each Y axis
  const horizontalScalePoint = d3.scalePoint().range([0, innerWidth]).domain(axisNames);

  // Draw the lines
  innerSVG
    .selectAll('myPath')
    .data(data)
    .join('path')
    .attr('class', (d) => 'line ' + d[options.idKey]) // 2 class for each line: 'line' and the group name
    .attr('d', pathFromCSVRow(horizontalScalePoint, options, axis))
    .style('fill', 'none')
    .style('stroke', (d) => color(d[options.idKey]))
    .style('stroke-width', "2px")
    .style('opacity', 0.6)
    .on("mouseover", highlight(options.idKey, color))
    .on("mouseleave", unHighlight(options.idKey, color));

  // Draw the axis:
  innerSVG
    .selectAll('myAxis')
    // For each dimension of the dataset I add a 'g' element:
    .data(axisNames)
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
    })
    // Add axis title
    .append('text')
    .style('text-anchor', 'middle')
    .attr('y', -9)
    .text((d) => d)
    .style('fill', 'white');

  if (options.legend) {
    // Add one dot in the legend for each name.
    const legendSVG = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${options.width - options.margin.legend},${margin.top})`)
      .style('background', "#FFF")
    
    legendSVG
      .selectAll("mydots")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", 0)
      .attr("cy", (d,i) => 100 + i*25) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", (d) => color(d[options.idKey]))
    
    // Add one dot in the legend for each name.
    legendSVG
      .selectAll("mylabels")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", (d,i) => 100 + i*25) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", (d) => color(d[options.idKey]))
      .text((d) => d[options.idKey])
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
  }
}
