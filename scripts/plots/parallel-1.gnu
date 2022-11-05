#!/usr/bin/gnuplot -persist
# set terminal pngcairo  transparent enhanced font "arial,10" fontscale 1.0 size 600, 400 
set output '../../static/img/plots/parallel-1.svg'

set datafile separator ','

set style data parallelaxes
unset border
unset ytics
set bmargin 3

set for [k=1:4] paxis k tics 1
set for [k=1:4] paxis k range [0:10]

set multiplot

# plot "iris.csv" using 1 linecolor var title "progressisme"
plot 'iris.csv' using 1 title "progressisme", \
  '' using 2 at 1.75 title "démocratie", \
  '' using 3 at 2.5 title "ouverture", \
  '' using (($1+$2+$3)/3) at 4 title "moyenne",
  '' using 4 with labels

plot infile index i u (0):(0):4 w labels