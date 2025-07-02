
// start: function for bar chart

const valueFormatter = (value) => `${value} mm`;

const chartSetting = {
  yAxis: [
    {
      label: 'Rainfall (mm)',
      width: 80,
    },
  ],
  series: [{ dataKey: 'seoul',  valueFormatter }],
  height: 210,
};

// end: function for bar chart





export { valueFormatter, chartSetting };