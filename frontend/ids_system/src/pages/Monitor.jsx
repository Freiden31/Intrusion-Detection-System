import React from 'react';
import { dataset, rows, } from '../datasets/dashboardData';
import { lineChartXAxis, safeSeries, anomalySeries } from '../datasets/reportdata';
import '@fontsource/share-tech';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';




// start: bar chart customization
const valueFormatter = (value) => `${value}mm`;

const chartSetting = {
  xAxis: [
    {
      label: 'rainfall (mm)',
    },
    
  ],
  height: 330,
  width: 850
};
// end: bar chart customization





const Monitor = () => {
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
                  <div className='flex items-center'>
                      <ArrowBackIcon sx={{ fontSize: 18, marginTop: .2 }} />
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
                          sx={{ fontSize: 20, marginBottom: 0.3, marginRight: 0.5 }} 
                          color='inherit' 
                          aria-hidden="true" 
                        />
                        Live Monitoring
                    </p>
                </div>

                <div className=' w-99 flex flex-row gap-4 mr-0 mt-9'>

                    <div className='flex flex-row text-gray-400'>
                        <DashboardOutlinedIcon 
                          sx={{ fontSize: 20, marginBottom: 0.3, marginRight: 0.5 }} 
                          color='inherit' 
                          aria-hidden="true"
                        />
                        <h6>DASHBOARD</h6>
                        <span className='ml-4'>|</span>
                    </div>

                    <Link 
                      component={RouterLink} 
                      to='/alert' 
                      underline='none' 
                      color='inherit'
                    >
                        <div className='flex flex-row'>
                            <NotificationsOutlinedIcon 
                              sx={{ fontSize: 20, marginBottom: 0.3, marginRight: 0.5 }} 
                              color='inherit' 
                              aria-hidden="true"
                            />
                            <h6>ALERT NOTIFICATION</h6>
                            <span className='ml-4'>|</span>
                        </div>
                    </Link>

                    <Link 
                      component={RouterLink} 
                      to='/report' 
                      underline='none' 
                      color='inherit'
                    >
                        <div className='flex flex-row'>
                            <FolderCopyOutlinedIcon 
                              sx={{ fontSize: 20, marginBottom: 0.3, marginRight: 0.5 }} 
                              color='inherit' 
                              aria-hidden="true"
                            />
                            <h6>REPORT</h6>
                        </div>
                    </Link>

                </div>

            </div>

            {/* end: header */}

            <hr className='w-full h-1 mt-8 bg-gray-900' />


            {/* start: main */}

            {/* start: top row */}
            <div className='w-full mt-6 flex gap-6'>
                <div className='left h-100 flex flex-col gap-4 flex-2'>

                    {/* start: gauge for ips and mb */}
                    <div className='bg-[rgba(17,24,39,0.9)] h-1/3 flex flex-1 flex-col p-4 '>
                        <h6 className='text-[14px] tracking-[.20em] place-self-start'>TOTAL MB</h6>
                        <Stack 
                          direction={{ xs: 'column', md: 'row' }} 
                          spacing={{ xs: 1, md: 3 }} 
                          className='place-self-center'
                        >
                            <Gauge className='text-cyan-500'
                                width={100} 
                                height={100} 
                                value={60} 
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
                        <h5 className='text-[10px] tracking-[.10em]'>60 MB total use in network storage.</h5>
                    </div>


                    <div className='bg-[rgba(17,24,39,0.9)] h-1/3 flex flex-1 flex-col p-4 '>
                        <h6 className='text-[14px] tracking-[.20em] place-self-start'>TOTAL IP ADDRESS</h6>
                        <div className='flex flex-row gap-2 mr-1'>
                          <Stack 
                            direction={{ xs: 'column', md: 'row' }} 
                            spacing={{ xs: 1, md: 3 }} 
                            className='place-self-start mt-5 ml-[-8px]'
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
                          <h5 className='text-[10px] tracking-[.10em] text-justify mt-10'>60 MB total use in network storage. 60 MB total use in network storage. 60 MB total use in network storage.</h5>
                        </div>
                    </div>
                </div>
                {/* end: gauge for ips and mb */}

                
                {/* start: barchart for ip and their mb usage */}
                <div className='bg-[rgba(17,24,39,0.9)] right h-100 flex-6 p-4'>
                  <h6 className='text-[14px] tracking-[.20em] place-self-start'>IP AND MB USAGE</h6>
                  <BarChart
                    dataset={dataset}
                    yAxis={[
                      { 
                        scaleType: 'band', 
                        dataKey: 'month',
                        label: 'Month'
                      }
                    ]}
                    series={[
                      { 
                        dataKey: 'seoul', 
                        valueFormatter, 
                        color: '#00bfff' 
                      }
                    ]}
                    layout="horizontal"
                    {...chartSetting}
                    sx={{
                      "& text": { fill: "#e4e7eb !important" },
                      "& line, & path": { stroke: "#e4e7eb !important" },
                    }}
                  />
                </div>
                {/* end: barchart for ip and their mb usage */}

            </div>
            {/* end: top row */}


            {/* start: center row */}
            <div className='w-full mt-6 flex gap-6'>
                
                {/* start: left - pie chart for trend anomalies */}
                {/* <div className='left bg-[rgba(17,24,39,0.9)] h-80 flex-2 p-4'>
                    <h6 className='text-[14px] tracking-[.20em] place-self-start'>TREND ANOMALY </h6>
                    <PieChart
                        series={[
                            {
                            data: data,
                            innerRadius: 40,
                            outerRadius: 90,
                            paddingAngle: 2,
                            cornerRadius: 5,
                            startAngle: -90,
                            endAngle: 360,
                            cx: 100,
                            cy: 80,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            fadedOpacity: 0.3,
                            },
                        ]}
                        width={220} 
                        height={220} 
                        slotProps={{
                          legend: {
                            sx: {
                              [`& .${legendClasses.label}`]: {
                                color: '#e4e7eb !important',
                                fontSize: 9
                              }
                            }
                          }
                        }}
                        className='mt-[42px]'
                    />
                </div> */}
                {/* start: left - pie chart for trend anomalies */}
                <div className='flex flex-7 flex-row gap-6 mt-2'>
                                <div className='bg-[rgba(17,24,39,0.9)] right h-[20rem] w-full p-4 '>
                                  <div>
                                    <h5 className='place-self-start text-[14px] tracking-[.20px]'>Time Series Plots</h5>
                                    <LineChart
                                        xAxis={[{
                                          data: lineChartXAxis,
                                          label: 'Time',
                                        }]}
                                        yAxis={[{
                                          label: 'Value',
                                          position: 'none'
                                        }]}
                                        series={[safeSeries, anomalySeries]}
                                        height={250}
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

                {/* start: right - line chart for network rythm */}
                {/* <div className='bg-[rgba(17,24,39,0.9)] right h-80 flex-6 p-4'>
                    <h6 className='text-[14px] tracking-[.20em] place-self-start'>TREND ANOMALY </h6>
                    <LineChart
                      xAxis={[{ 
                        data: lineChartXAxis,
                        label: 'X-Axis Label' 
                      }]}
                      series={[{ data: lineChartSeries, area: true, color: '#3c99dc' }]}
                      height={270}
                      sx={{
                        ".MuiChartsAxis-left .MuiChartsAxis-line": { display: "none" },
                        ".MuiChartsAxis-left .MuiChartsAxis-tickLabel": { display: "none" },
                        ".MuiChartsAxis-bottom .MuiChartsAxis-label text": { fill: "#e4e7eb" },
                        ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": { fill: "#e4e7eb" },
                        ".MuiChartsAxis-bottom .MuiChartsAxis-line": { stroke: "#e4e7eb" },
                        marginLeft: -5,
                      }}
                    />
                </div> */}
                 {/* end: right - line chart for network rythm */}

            </div>
            {/* end: center row */}


            {/* start: bottom row */}

            {/* end: table of ip information */}
            <div className='w-full mt-6 bg-[rgba(17,24,39,0.9)] right h-100 p-4'>
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
                        "& .MuiTableCell-root": { 
                          color: '#e4e7eb', 
                        },
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
                {/* end: table of ip information */}

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

export default Monitor;