const dataset = [
  { month: 'Jan', seoul: 20 },
  { month: 'Feb', seoul: 35 },
  { month: 'Mar', seoul: 60 },
  { month: 'Apr', seoul: 90 },
  { month: 'May', seoul: 140 },
  { month: 'Jun', seoul: 180 },
  { month: 'Jul', seoul: 220 },
  { month: 'Aug', seoul: 200 },
  { month: 'Sep', seoul: 150 },
  { month: 'Oct', seoul: 80 },
  { month: 'Nov', seoul: 40 },
  { month: 'Dec', seoul: 25 },
]

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('192.167.2.1', 159, 6.0, 24, 4.0),
  createData('SANDWITCH', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Longer Entry Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Longer Entry Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Longer Entry Eclair', 262, 16.0, 24, 6.0),
  createData('Longer Entry Cupcake', 305, 3.7, 67, 4.3),
  createData('Longer Entry Gingerbread', 356, 16.0, 49, 3.9),
  createData('Even Longer Entry Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Even Longer Entry Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Even Longer Entry Eclair', 262, 16.0, 24, 6.0),
  createData('Even Longer Entry Cupcake', 305, 3.7, 67, 4.3),
  createData('Even Longer Entry Gingerbread', 356, 16.0, 49, 3.9),
];

const anomalyPie = [
  { id: 0, value: 10, label: 'series A' },
  { id: 1, value: 15, label: 'series B' },
  { id: 2, value: 20, label: 'series C' },
  { id: 3, value: 15, label: 'series D' },
  { id: 4, value: 20, label: 'series E' },
]

export const lineChartXAxis = [1, 0, 3, 0, 5, 0];

export const safeSeries = {
  label: 'Safe',
  data: [2, 3, 2.5, 3.5, 3, 5],
  color: '#4caf50', // green
  area: false,
};

export const anomalySeries = {
  label: 'Anomaly',
  data: [0, 0, 0, 0, 0, 0],
  color: '#f44336', // red
  area: false,
};

export { dataset, rows, anomalyPie};