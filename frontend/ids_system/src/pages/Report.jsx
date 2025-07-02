import React, { useState } from 'react';
import { dataset, rows, anomalyPie, lineChartXAxis, safeSeries, anomalySeries } from '../datasets/reportdata';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import Stack from '@mui/material/Stack';
import { Chance } from 'chance';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';



// start: bar chart property

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

// end: bar chart property


// start: scatter chart functions

const chance = new Chance(42);

const scatterSeries = [
  {
    data: [
      ...getGaussianSeriesData([-1, -1]),
      ...getGaussianSeriesData([-1, 1]),
      ...getGaussianSeriesData([1, 1]),
      ...getGaussianSeriesData([1, -1]),
    ],
  },
].map((s) => ({
  ...s,
  valueFormatter: (v) => v && `(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`,
}));

function getGaussianSeriesData(mean, stdev = [0.5, 0.5], N = 50) {
  return [...Array(N)].map((_, i) => {
    const x =
      Math.sqrt(-2.0 * Math.log(1 - chance.floating({ min: 0, max: 0.99 }))) *
        Math.cos(2.0 * Math.PI * chance.floating({ min: 0, max: 0.99 })) *
        stdev[0] +
      mean[0];
    const y =
      Math.sqrt(-2.0 * Math.log(1 - chance.floating({ min: 0, max: 0.99 }))) *
        Math.cos(2.0 * Math.PI * chance.floating({ min: 0, max: 0.99 })) *
        stdev[1] +
      mean[1];
    return { x, y, z: x + y, id: `${mean.join(',')}${i}` };
  });
}

// end: scatter chart functions



const Report = () => {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    // start: funtion for menu
    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    }
    // start: funtion for menu


    return (
        <>
            {/* start: header */}
            <div className='flex justify-between p-2'>
                <Link 
                    component={RouterLink} 
                    to='/server' 
                    underline='none' 
                    color='inherit'
                >
                    <div className='flex'>
                        <ArrowBackIcon 
                            sx={{ 
                                fontSize: 18, 
                                marginTop: .2 
                            }} 
                        />
                        <p className='tracking-[.20em] ml-3'>BACK</p>
                    </div>
                </Link>

                <Link 
                    component={RouterLink} 
                    to='/signin' 
                    underline='none' 
                    color='inherit'
                >
                    <div>
                        <p className='tracking-[.20em] ml-3'>LOGOUT</p>
                    </div>
                </Link>
            </div>

            
            <div className=' mt-4 p-3 flex justify-between items-start gap-1'>

                <div className='flex flex-col items-start gap-1'>
                    <h5 className='text-lg tracking-[.18em]'>SERVER MONITORING</h5>
                    <p className='text-base text-gray-300 mt-1 text-[14px]'>
                        <AnalyticsOutlinedIcon 
                            sx={{ 
                                fontSize: 20, 
                                marginBottom: 0.3, 
                                marginRight: 0.5 
                            }} 
                            color='inherit' 
                            aria-hidden="true" 
                        />
                            Live Monitoring
                    </p>
                </div>
                            
                {/* start: tabs */}
                <div className=' w-99 flex flex-row gap-4 mr-0 mt-9'>
                    <Link 
                        component={RouterLink} 
                        to='/monitor' 
                        underline='none' 
                        color='inherit'
                    >
                        <div className='flex flex-row'>
                            <DashboardOutlinedIcon 
                                sx={{ 
                                    fontSize: 20, 
                                    marginBottom: 0.3, 
                                    marginRight: 0.5 
                                }} 
                                color='inherit' 
                                aria-hidden="true" />
                            <h6>DASHBOARD</h6>
                            <span className='ml-4'>|</span>
                        </div>
                    </Link>

                    <Link 
                        component={RouterLink} 
                        to='/alert' 
                        underline='none' 
                        color='inherit'
                    >
                        <div className='flex flex-row'>
                            <NotificationsOutlinedIcon 
                                sx={{ 
                                    fontSize: 20, 
                                    marginBottom: 0.3, 
                                    marginRight: 0.5 
                                }} 
                                color='inherit' 
                                aria-hidden="true"
                            />
                            <h6>ALERT NOTIFICATION</h6>
                            <span className='ml-4'>|</span>
                        </div>
                    </Link>

                    <div className='flex flex-row text-gray-400'>
                        <FolderCopyOutlinedIcon 
                            sx={{ 
                                fontSize: 20, 
                                marginBottom: 0.3, 
                                marginRight: 0.5 
                            }} 
                            color='inherit' 
                            aria-hidden="true"
                        />
                        <h6>REPORT</h6>
                    </div>
                </div>
                {/* end: tabs */}

            </div>
            {/* end: header */}

            <hr className='w-full h-1 mt-8 bg-gray-900' />
            
            {/* start: main */}
            <div className=' mt-6 h-10 flex place-content-between'>
                
                <h5 className='text-[12px] tracking-[.15em] mt-2'>DATE: March 01, 2025</h5>
                <div>
                    <button
                        id='button'
                        aria-controls={ open ? 'menu' : undefined }
                        aria-haspopup='true'
                        aria-expanded={ open ? 'true' : undefined }
                        onClick={ handleClick }
                        className='mt-1 w-25 h-8 p-1 bg-cyan-700 text-[14px] rounded-[1px] text-gray-300 hover:bg-cyan-900 mr-4'
                    >
                        Filter
                    </button>
                    <button className='mt-1 w-25 h-8 p-1 bg-cyan-700 text-[14px] rounded-[1px] text-gray-300 hover:bg-cyan-900'>
                        Export
                    </button>
                </div>
                <Menu
                    id='menu'
                    anchorEl={anchor}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'button',
                        },
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: 'transparent',      
                            color: '#d1d5db',                  
                            fontFamily: '"Poppins", sans-serif', 
                            fontSize: '16px',                 
                            borderRadius: '12px',             
                            boxShadow: '0 8px 16px rgba(0,0,0,0.3)', 
                        }
                    }}
                >
                    <MenuItem 
                        onClick={handleClose}
                        sx={{       
                            color: '#f0fdf4',                
                            fontFamily: 'Share Tech, sans-serif',
                            fontSize: '14px',              
                            '&:hover': {
                            backgroundColor: '#212121',    
                            color: '#e4ebe7',             
                            },
                        }}
                    >
                        Last 24H
                    </MenuItem>
                    <MenuItem 
                        onClick={handleClose}
                        sx={{       
                            color: '#f0fdf4',                
                            fontFamily: 'Share Tech, sans-serif', 
                            fontSize: '14px',              
                            '&:hover': {
                                backgroundColor: '#212121',  
                                color: '#e4ebe7',           
                            },
                        }}
                    >
                        Last 7 days
                    </MenuItem>
                    <MenuItem 
                        onClick={handleClose}
                        sx={{       
                            color: '#f0fdf4',                
                            fontFamily: 'Share Tech, sans-serif',
                            fontSize: '14px',             
                            '&:hover': {
                                backgroundColor: '#212121',
                                color: '#e4ebe7',              
                            },
                        }}
                    >
                        Last Month
                    </MenuItem>
                </Menu>
            </div>
            
            {/* start: main */}

            {/* start: top row */}
            <div className='w-full mt-6 flex gap-6'>

                {/* start: left */}
                <div className='left h-130 flex flex-col gap-4 flex-2'>

                    {/* start: anomaly count */}
                    <div className='bg-[rgba(17,24,39,0.9)] h-1/3 flex flex-1 flex-col items-center justify-center   p-4'>
                          <Stack 
                            direction={{ xs: 'column', md: 'row' }} 
                            spacing={{ xs: 1, md: 3 }} 
                          >
                              <Gauge 
                                  width={100} 
                                  height={100} 
                                  value={1230} 
                                  sx={{
                                    [`& .${gaugeClasses.valueText}`]: { fontSize: 20 },
                                    [`& .${gaugeClasses.valueText} text`]: { fill: '#e4e7eb' },
                                    [`& .${gaugeClasses.valueArc}`]: { fill: '#00bfff' },
                                    [`& .${gaugeClasses.referenceArc}`]: { fill: (theme) => theme.palette.text.disabled },
                                  }}
                              />
                          </Stack>
                          <h5 className='text-[12px] tracking-[.15em]'>ANOMALY COUNT</h5>
                    </div>
                    {/* end: anomaly count */}
                    

                    {/* start: anomaly rate */}
                    <div className='bg-[rgba(17,24,39,0.9)] h-1/3 flex flex-1 flex-col items-center justify-center p-4'>
                        <Stack 
                          direction={{ xs: 'column', md: 'row' }} 
                          spacing={{ xs: 1, md: 3 }} 
                          className='place-self-center'
                        >
                            <Gauge className='text-cyan-500'
                                width={100} 
                                height={100} 
                                value={4.57} 
                                startAngle={-90} 
                                endAngle={90} 
                                sx={{
                                  [`& .${gaugeClasses.valueText}`]: { fontSize: 20 },
                                  [`& .${gaugeClasses.valueText} text`]: { fill: '#e4e7eb' },
                                  [`& .${gaugeClasses.valueArc}`]: { fill: '#00bfff' },
                                  [`& .${gaugeClasses.referenceArc}`]: { fill: (theme) => theme.palette.text.disabled },
                                }}
                            />
                        </Stack>
                        <h5 className='text-[12px] tracking-[.15em]'>ANOMALY RATE</h5>
                    </div>
                    {/* end: anomaly rate */}
                    

                    {/* start: anomaly pie */}
                    <div className='bg-[rgba(17,24,39,0.9)] h-1/3 flex flex-1 flex-col items-center justify-center p-4'>
                      <h5 className='text-[12px] tracking-[.15em] place-self-start'>ANOMALY TREND</h5>
                        <PieChart
                            series={[{ data: anomalyPie }]}
                            width={120}
                            height={120}
                            slotProps={{
                              legend: {
                                sx: { gap: '2px',
                                  [`& .${legendClasses.label}`]: { color: '#e4e7eb !important', fontSize: 9, }
                                }
                              }
                            }}
                        />
                    </div>
                    {/* end: anomaly pie */}

                </div>
                {/* end: left */}


                {/* start: right */}
                <div className='bg-[rgba(17,24,39,0.9)] right h-130 flex-7 p-4'>
                    <div>
                      <h5 className='place-self-start'>Time Series Plots</h5>
                      <Stack 
                        sx={{ 
                            width: '100%', 
                            maxWidth: 800, 
                            marginTop: '17px', 
                            marginLeft: '25px' 
                        }}
                      >
                        <ScatterChart
                          height={440}
                          width={880}
                          series={scatterSeries}
                          grid={{ 
                              horizontal: true, 
                              vertical: true 
                          }}
                          xAxis={[{
                              min: -3,
                              max: 3,
                              label: 'X Axis',
                              labelStyle: {
                                fill: 'white',
                                fontSize: 14,
                                fontWeight: 'bold',
                              },
                              colorMap: {
                                type: 'piecewise',
                                thresholds: [-1.5, 0, 1.5],
                                colors: ['#d01c8b', '#f1b6da', '#b8e186', '#4dac26'],
                              },
                          }]}
                          yAxis={[{
                              min: -3,
                              max: 3,
                              label: 'Y Axis',
                              labelStyle: {
                                fill: 'white',
                                fontSize: 14,
                                fontWeight: 'bold',
                              },
                              colorMap: {
                                type: 'piecewise',
                                thresholds: [-1.5, 0, 1.5],
                                colors: ['lightblue', 'blue', 'orange', 'red'],
                              },
                            }]}
                          sx={{
                            '& .MuiChartsGrid-line': { stroke: 'transparent' }, 
                            '& .MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: 'white' }, 
                            '& .MuiChartsAxis-left .MuiChartsAxis-line': { stroke: 'white' }, 
                            '& .MuiChartsAxis-tick > line': { stroke: 'white' }, 
                            '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: 'white' }, 
                            '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: 'white' }, 
                            '& .MuiChartsAxis-bottom .MuiChartsAxis-label text': { fill: 'white' },
                            '& .MuiChartsAxis-left .MuiChartsAxis-label text': { fill: 'white' },
                          }}
                        />
                      </Stack>
                    </div>
                </div>
                {/* end: left */}

            </div>
            {/* end: top row */}

            {/* start: center 1/2 */}
            <div className='flex flex-7 flex-row gap-6 mt-6'>
                <div className='bg-[rgba(17,24,39,0.9)] right h-64 flex-3  p-4'>
                  <div>
                      <h5 className='place-self-start text-[14px] tracking-[.20px]'>Time Series Plots</h5>
                      <BarChart
                        dataset={dataset}
                        xAxis={[{
                            dataKey: 'month',
                            label: 'Month', 
                            labelStyle: { fill: 'white' }, 
                          }]}
                        {...chartSetting}
                        sx={{
                          '.MuiChartsAxis-left .MuiChartsAxis-line': { stroke: 'white' },
                          '.MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: 'white' }, 
                          '.MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: 'white' },
                          '.MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: 'white' }, 
                          '.MuiChartsAxis-left .MuiChartsAxis-label text': { fill: 'white'  },
                          '.MuiChartsAxis-bottom .MuiChartsAxis-label text': { fill: 'white' },
                        }}
                      />

                  </div>  
                </div>
            </div>
            {/* end: center 1/2 */}


            {/* start: center 2/2 */}
            <div className='flex flex-7 flex-row gap-6 mt-6'>
                <div className='bg-[rgba(17,24,39,0.9)] right h-64 w-full p-4 '>
                  <div>
                    <h5 className='place-self-start text-[14px] tracking-[.20px]'>Time Series Plots</h5>
                    <LineChart
                        xAxis={[{
                          data: lineChartXAxis,
                          label: 'Time',
                        }]}
                        yAxis={[{
                          label: 'Value',
                        }]}
                        series={[safeSeries, anomalySeries]}
                        height={200}
                        slotProps={{
                          legend: {
                            sx: {
                              '& .MuiChartsLegend-mark': { marginRight: 0.5 },
                              '& .MuiChartsLegend-label': { color: '#ffffff', fontSize: 12 },
                            },
                          },
                        }}
                      sx={{
                        '.MuiChartsAxis-left .MuiChartsAxis-line': { stroke: '#e4e7eb' },
                        '.MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: '#e4e7eb' },
                        '.MuiChartsAxis-left .MuiChartsAxis-label': { fill: '#e4e7eb' },
                        '.MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#e4e7eb' },
                        '.MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: '#e4e7eb' },
                        '.MuiChartsAxis-bottom .MuiChartsAxis-label': { fill: '#e4e7eb' },
                      }}
                    />
                  </div>
                </div>
            </div>
            {/* end: center 2/2 */}
            

            {/* start: bottom row */}
            <div className='w-full bg-[rgba(17,24,39,0.9)] right h-100 p-4'>
                  <h6 className='text-[14px] tracking-[.20em] place-self-start'>LIVE TRAFFIC</h6>
                    <TableContainer 
                      component={Paper} 
                      sx={{ 
                        maxHeight: 330, 
                        marginTop: 2, 
                        backgroundColor: 'transparent',
                        color: '#e4e7eb', 
                        boxShadow: 'none',
                        border: 'none',
                        fontFamily: '"Share Tech", sans-serif',
                          '&::-webkit-scrollbar': { width: '8px', backgroundColor: 'transparent' },
                          '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
                          '&::-webkit-scrollbar-thumb': { backgroundColor: '#212121', borderRadius: '4px' },
                          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                      }}
                    >
                      <Table 
                        sx={{ 
                          minWidth: 650,  
                          color: 'white', 
                          "& .MuiTableCell-root": { color: '#e4e7eb' },
                        }} 
                        size="small" 
                        aria-label="a dense table"
                        stickyHeader
                      >
                        <TableHead>
                          <TableRow >
                            <TableCell 
                              sx={{ 
                                color: 'white', 
                                borderColor: 'transparent', 
                                backgroundColor: '#212121', 
                                fontFamily: '"Share Tech", sans-serif', 
                                fontSize: '14px', 
                                letterSpacing: '.18em', 
                                fontWeight: 'bold'  
                              }}
                            >
                              DESSERT
                            </TableCell>
                            <TableCell 
                              align="right" 
                              sx={{ 
                                color: 'white', 
                                borderColor: 'transparent', 
                                backgroundColor: '#212121', 
                                fontFamily: '"Share Tech", sans-serif', 
                                fontSize: '14px', letterSpacing: '.18em', 
                                fontWeight: 'bold' 
                              }}
                            >
                              CALORIES
                            </TableCell>
                            <TableCell 
                              align="right" 
                              sx={{ 
                                color: 'white', 
                                borderColor: 'transparent', 
                                backgroundColor: '#212121', 
                                fontFamily: '"Share Tech", sans-serif', 
                                fontSize: '14px', 
                                letterSpacing: '.18em', 
                                fontWeight: 'bold' 
                              }}
                            >
                              FAT(g)
                            </TableCell>
                            <TableCell 
                              align="right" 
                              sx={{ 
                                color: 'white', 
                                borderColor: 'transparent', 
                                backgroundColor: '#212121', 
                                fontFamily: '"Share Tech", sans-serif', 
                                fontSize: '14px', 
                                letterSpacing: '.18em', 
                                fontWeight: 'bold' 
                              }}
                            >
                              CARBS(g)
                            </TableCell>
                            <TableCell 
                              align="right" 
                              sx={{ 
                                color: 'white', 
                                borderColor: 'transparent', 
                                backgroundColor: '#212121', 
                                fontFamily: '"Share Tech", sans-serif', 
                                fontSize: '14px', 
                                letterSpacing: '.18em', 
                                fontWeight: 'bold' 
                              }}
                            >
                              PROTEIN
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 },
                                borderColor: 'transparent',
                                fontFamily: '"Share Tech", sans-serif !important',
                                letterSpacing: '0.10em'
                              }}
                            >
                              <TableCell 
                                component="th" 
                                scope="row" 
                                sx={{ 
                                  color: 'white', 
                                  borderColor: 'transparent', 
                                  overflow: 'auto', 
                                  fontFamily: '"Share Tech", sans-serif', 
                                  letterSpacing: '.15em'
                                }}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell 
                                align="right" 
                                sx={{ 
                                  color: '#A9A9A9', 
                                  borderColor: 'transparent', 
                                  fontFamily: '"Share Tech", sans-serif', 
                                  letterSpacing: '.15em'
                                }}
                              >
                                {row.calories}
                              </TableCell>
                              <TableCell 
                                align="right" 
                                sx={{ 
                                  color: 'white', 
                                  borderColor: 'transparent', 
                                  fontFamily: '"Share Tech", sans-serif', 
                                  letterSpacing: '.15em' 
                                }}
                              >
                                {row.fat}
                              </TableCell>
                              <TableCell 
                                align="right" 
                                sx={{ 
                                  color: 'white', 
                                  borderColor: 'transparent', 
                                  fontFamily: '"Share Tech", sans-serif', 
                                  letterSpacing: '.15em' 
                                }}
                              >
                                {row.carbs}
                              </TableCell>
                              <TableCell 
                                align="right" 
                                sx={{ 
                                  color: 'white', 
                                  borderColor: 'transparent', 
                                  fontFamily: '"Share Tech", sans-serif', 
                                  letterSpacing: '.15em' 
                                }}
                              >
                                {row.protein}
                              </TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

            </div>
            {/* end: bottom row */}

            {/* end: main */}


            {/* start: footer */}
            <div className="mt-6 text-center relative">
                <p className="text-[12px]">&copy; {new Date().getFullYear()} Real-Time Monitoring System (R-TMS)</p>
            </div>
            {/* end: footer */}
        </>
    )
};

export default Report;


