// start: bar chart data
const dataset = [
  { month: '192.168.0.0.1', seoul: 20 },
  { month: '192.168.0.0.2', seoul: 35 },
  { month: '192.168.0.0.3', seoul: 60 },
  { month: '192.168.0.0.4', seoul: 90 },
  { month: '192.168.0.0.5', seoul: 140 },
  { month: '192.168.0.0.6', seoul: 180 },
  { month: '192.168.0.0.7', seoul: 220 },
  { month: '192.168.0.0.8', seoul: 200 },
  { month: '192.168.0.0.9', seoul: 150 },
  { month: '192.168.0.0.10', seoul: 80 },
  { month: '192.168.0.0.11', seoul: 40 },
  { month: '192.168.0.0.12', seoul: 25 },
]
// end: bar chart data


// start: pie chart data
const data = [
    { label: 'Web Attack', value: 5, color: '#0088FE' },
    { label: 'Infiltration', value: 15, color: '#00C49F' },
    { label: 'Sql Injection', value: 10, color: '#FFBB28' },
    { label: 'DDoS Attack', value: 2, color: '#FF8042' },
    { label: 'Category E', value: 4, color: '#00C49F' }
];
// end: pie chart data

// start: table function and data
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
// end: table function and data


const lineChartXAxis = [ 1, 2, 3, 5, 8, 10];

const lineChartSeries = [ 2, 5.5, 2, 8.5, 1.5, 5 ];


export { dataset, data, rows, lineChartXAxis, lineChartSeries };