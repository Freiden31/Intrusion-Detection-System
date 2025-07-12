import React from "react";
import { Link as Routerlink } from 'react-router-dom';
import Link from '@mui/material/Link';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { CircularProgress } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serServer } from "../datasets/api";

const Home = () => {
    const [formValues, setFormValues] = useState({ 
        hostname: '',
        username: '', 
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const currentyear = new Date().getFullYear();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    
    
    // start : funtions for modal
    useEffect(() => {
        if(!isOpen) return;
    
        const modalNode = modalRef.current;
        if(!modalNode) return;
    
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };

    }, [isOpen]);
    
    const handleOpen = () => {
        setFormValues({
            hostname: '',
            username: '',
            password: '',
        });
        setIsOpen(true);
    };
    
    const handleClose = () => {
        setIsOpen(false);
        setFormValues({
            hostname: '',
            username: '',
            password: '',
        });
    };
    
    const handleBackdropClick = (e) => {
        if (e.target == modalRef.current) {
            handleClose();
        }
    };
    
    const handleSubmit = async e => {
        e.preventDefault();

        setLoad(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setLoad(false);

        setMessage('');
        setError('');

        const payload = {
            hostname: formValues.hostname,
            username: formValues.username,
            password: formValues.password,
        };

        try {
            const response = await serServer(payload);
            setMessage('Connected Successfully!');
            handleClose();
            navigate('/monitor')
        } catch (error) {
            setError('Failed to connect!');
            setFormValues({
                hostname: '',
                username: '',
                password: ''
            })
        }

        handleClose();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };
    
    // end : funtions for modal

    return (
        <>  

            {/* start: Header */}
            {/* Logout */}
            <Link 
                component={Routerlink} 
                to='/signin' 
                underline="none" 
                color='inherit'
            >
                <div className="p-2 mr-7">
                    <div className="container flex justify-end">
                        <h4 className="tracking-[.20em]">LOGOUT</h4>
                    </div>
                </div>
            </Link>


            {/* Main */}
            <div className=" p-10 mt-9 flex gap-8">


                {/* Server Setup */}
                <div 
                    component={Routerlink} 
                    to='/server' 
                    underline="none" 
                    color="inherit"
                >
                    <section 
                        className="server-setup rounded-sm shadow-md h-20 w-100 mx-auto pt-16 pb-20 px-8 flex items-center gap-8 hover:border-[0.5px] hover:border-white" 
                        aria-labelledby="server-setup-title"
                    >
                        <DnsOutlinedIcon 
                            sx={{ fontSize: 85 }} 
                            className="text-gray-500 " 
                            aria-hidden="true" 
                        />
                        <div
                            onClick={handleOpen} 
                            className="text-left"
                        >
                            <h4 
                                id="server-setup-title" 
                                className="tracking-[.20em]"
                            >
                                SERVER SETUP
                            </h4>
                            <p className="text-gray-500">Monitor your server network here to make you alert.</p>
                        </div>
                    </section>
                    </div>


                {/* Manage Account */}
                <Link 
                    component={Routerlink} 
                    to='/account' 
                    underline="none" 
                    color="inherit"
                >
                    <section 
                        className="server-setup rounded-sm shadow-md h-20 w-100 mx-auto pt-16 pb-20 px-8 flex items-center gap-8 hover:border-[0.5px] hover:border-white" 
                        aria-labelledby="server-setup-title"
                    >
                        <ManageAccountsOutlinedIcon 
                            sx={{ fontSize: 85 }} 
                            className="text-gray-500 " 
                            aria-hidden="true" 
                        />
                        <div className="text-left">
                            <h4 
                                id="server-setup-title" 
                                className="tracking-[.20em]"
                            >
                                MANAGE ACCOUNT
                            </h4>
                            <p className="text-gray-500">Modify your account information here.</p>
                        </div>
                    </section>
                </Link>


                {/* Server Setup */}
                <Link 
                    component={Routerlink} 
                    to='/settings' 
                    underline="none" 
                    color="inherit"
                >
                    <section 
                        className="server-setup rounded-sm shadow-md h-20 w-100 mx-auto pt-16 pb-20 px-8 flex items-center gap-8 hover:border-[0.5px] hover:border-white" 
                        aria-labelledby="server-setup-title"
                    >
                        <SettingsOutlinedIcon 
                            sx={{ fontSize: 85 }} 
                            className="text-gray-500 " 
                            aria-hidden="true" 
                        />
                        <div className="text-left">
                            <h4 
                                id="server-setup-title" 
                                className="tracking-[.20em]"
                            >
                                SETTINGS
                            </h4>
                            <p className="text-gray-500">Modify system appearance for better experience.</p>
                        </div>
                    </section>
                </Link>

            </div>
            {/* end: Header */}


            {/* start: Footer */}
            <div className="mt-142 text-center relative">
                <p className="text-[12px]">&copy; {currentyear} Real-Time Monitoring System (R-TMS)</p>
            </div>
            {/* end: Footer */}


            {/* start: modal functionality */}
            {isOpen && (
                <div 
                    ref={modalRef} 
                    onClick={handleBackdropClick} 
                    className='fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur-sm px-4'
                >
                    <div 
                        className='w-250 bg-[rgba(17,24,39,0.9)] rounded-[1px] max-w-lg p-4 shadow-lg relative' 
                    >
                        <button 
                            className='absolute top-1 right-3  text-gray-400 hover:text-gray-700 rounded-full p-2 transition-colors duration-200' 
                            onClick={handleClose} 
                            aria-label='Close modal'
                        >
                            <svg 
                                xmlns='http://www.w3.org/2000/svg' 
                                className='h-5 w-5' 
                                fill='none' 
                                viewBox='0 0 24 24' 
                                stroke='currentColor' 
                                strokeWidth={2}
                            >
                                <path 
                                    strokeLinecap='round' 
                                    strokeLinejoin='round' 
                                    d='M6 18L18 6M6 6l12 12' 
                                />
                            </svg>
                        </button>

                        <h5 className='text-[14px] font-bold mt-4 mb-2 text-gray-400 tracking-[.30em]'> SERVER CREDENTIALS</h5>

                        <form 
                            onSubmit={handleSubmit} 
                            className='flex flex-col gap-4 mt-6'
                        >
                                <div
                                    className='w-full flex flex-col gap-4 justify-between w-full text-gray-300'
                                >
                                    <div className="w-full flex flex-row">
                                    <label 
                                            htmlFor='hostname'
                                            className='w-1/3 text-[14px] tracking-[.1em] font-medium mt-4'
                                        >
                                            HOSTNAME
                                        </label>
                                        <input 
                                            id='hostname'
                                            type='text' 
                                            name='hostname'
                                            value={formValues.hostname}
                                            onChange={handleChange}
                                            placeholder='192.168.0.0.1'
                                            className='w-[290px] rounded-[1px] border border-gray-300 text-gray-400 px-4 py-2 placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2' 
                                            autoComplete='off' 
                                            required 
                                        />
                                    </div>

                                    <div className="w-full flex flex-row">
                                        <label 
                                            htmlFor='username'
                                            className='w-1/3 text-[14px] tracking-[.1em] font-medium mt-4'
                                        >
                                            USERNAME
                                        </label>
                                        <input 
                                            id='username'
                                            type='text' 
                                            name='username' 
                                            value={formValues.username}
                                            onChange={handleChange}
                                            placeholder='root'
                                            className='w-[290px] rounded-[1px] border border-gray-300 text-gray-400 px-4 py-2 placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2' 
                                            autoComplete='off' 
                                            required 
                                        />
                                    </div>
                                    <div className="w-full flex flex-row">
                                        <label 
                                            htmlFor='username'
                                            className='w-1/3 text-[14px] tracking-[.1em] font-medium mt-4'
                                        >
                                            PASSWORD
                                        </label>
                                        <input 
                                            id='password'
                                            type='password' 
                                            name='password' 
                                            value={formValues.password}
                                            onChange={handleChange}
                                            placeholder='root'
                                            className='w-[290px] rounded-[1px] border border-gray-300 text-gray-400 px-4 py-2 placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2' 
                                            autoComplete='off' 
                                            required 
                                        />
                                    </div>

                                              
                                </div>
                                <button 
                                    type='submit'
                                    disabled={load} 
                                    className={`w-[25.2rem] text-gray-300 flex justify-center items-center rounded-[1px] h-10 bg-cyan-900 hover:bg-cyan-600 transition-colors duration-300 mt-1 ml-4 place-self-center ${
                                        load ? 'bg-cyan-900' : 'bg-cyan-900 hover:bg-cyan-900'
                                    }`}
                                >
                                    { load ? (
                                        <>
                                            <CircularProgress size={18} color="inherit" />
                                        </>  
                                        ) : (
                                            'CONNECT'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {/* end: modal functionality */}
        </>
    )
};

export default Home;