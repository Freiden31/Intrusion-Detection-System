import React from 'react';
import '../style/alert.scss';
import '@fontsource/share-tech';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';



const Alert = () => {
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

            {/* start: tabs */}
            <div className='mt-4 p-3 flex justify-between items-start gap-1'>
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
                                aria-hidden="true" 
                            />
                            <h6>DASHBOARD</h6>
                            <span className='ml-4'>|</span>
                        </div>
                    </Link>

                    <div className='flex flex-row text-gray-400'>
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

                    <Link 
                        component={RouterLink} 
                        to='/report' 
                        underline='none' 
                        color='inherit'
                    >
                        <div className='flex flex-row'>
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
                    </Link>
                </div>
            </div>
            {/* end: tabs */}

            {/* end: header */}

            <hr className='w-full h-1 mt-8 bg-gray-900' />

            {/* start: main */}

            <div className='bg-[rgba(17,24,39,0.9)] right h-165 flex-6 p-6 overflow-y-auto scrollbar-custom mt-6'>
                <div className='mt-4 mb-4'>

                    {/* start: Yesterday */}
                    <div className='flex flex-row items-start'>
                        <ArrowRightOutlinedIcon sx={{ color: 'whitesmoke'}} />
                        <span><h5> Yesterday (2) </h5></span>
                    </div>
                    <Accordion 
                        sx={{ 
                            backgroundColor: 'transparent',  
                            marginTop: 2, 
                            color: '#a9a9a9'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon 
                                    sx={{
                                        color:'#e4ebe7'
                                    }} 
                                />
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography 
                                component="span" 
                                sx={{ 
                                    fontFamily: 'Share Tech, sans-serif'
                                }}
                            >
                                DDoS Attack
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    {/* end: Yesterday */}

                    <hr className='w-full h-1 mt-8 bg-gray-900' />

                    {/* start: last 7 days */}
                    <div className='flex flex-row items-start mt-6'>
                        <ArrowRightOutlinedIcon sx={{ color: 'whitesmoke'}} />
                        <span><h5> Last 7 days </h5></span>
                    </div>

                    <Accordion 
                        sx={{ 
                            backgroundColor: 'transparent',  
                            marginTop: 2, 
                            color: '#a9a9a9'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon 
                                    sx={{
                                        color:'#e4ebe7'
                                    }} 
                                />
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography 
                                component="span" 
                                sx={{ 
                                    fontFamily: 'Share Tech, sans-serif'
                                }}
                            >
                                Web Attack
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </AccordionDetails>
                    </Accordion>
                    {/* end: last 7 days */}

                    <hr className='w-full h-1 mt-8 bg-gray-900' />

                    {/* start: last month */}
                    <div className='flex flex-row items-start mt-6'>
                        <ArrowRightOutlinedIcon sx={{ color: 'whitesmoke'}} />
                        <span><h5> Last Month </h5></span>
                    </div>

                    <Accordion 
                        sx={{ 
                            backgroundColor: 'transparent',  
                            marginTop: 2, 
                            color: '#a9a9a9'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon 
                                    sx={{
                                    color:'#e4ebe7'
                                    }}
                                />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography 
                                component="span" 
                                sx={{ 
                                    fontFamily: 'Share Tech, sans-serif'
                                }}
                            >
                                Data Infiltration
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    {/* end: last month */}
                </div>
      
            </div>
            {/* end: main */}

            {/* stsart: footer */}
            <div className="mt-4 text-center relative">
                <p className="text-[12px]">&copy; {new Date().getFullYear()} Real-Time Monitoring System (R-TMS)</p>
            </div>
            {/* end: footer */}
        </>
    )
};

export default Alert;