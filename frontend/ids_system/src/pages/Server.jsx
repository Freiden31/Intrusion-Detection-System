import React, {useState, useRef, useEffect} from 'react';
import{ Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';


// start: modal required inputs
const cloudServer = {
    AmazonAWS: [
        { label: 'AWS Access Key', name: 'accessKey', type: 'text', placeholder: 'AKIAIOSFODNN7EXAMPLE' },
        { label: 'AWS Secret Key', name: 'secretKey', type: 'password', placeholder: 'AWS Secret key' },
        { label: 'Region Name', name: 'region', type: 'text', placeholder: 'us-east-1' },
    ],

    DigitalOcean : [
        { label: 'Ocean API Token', name: 'apiToken', type: 'password', placeholder: '••••••••' },
        { label: 'Droplet Name', name: 'dropletName', type: 'text', placeholder: 'web-server-01' },
        { label: 'SSH Key', name: 'sshKey', type: 'text', placeholder: 'ssh-rsa AAA...' },
    ],

    Cisco : [
        { label: 'Cisco Device IP', name: 'deviceIP', type: 'text', placeholder: '192.168.1.1' },
        { label: 'Username', name: 'username', type: 'text', placeholder: 'admin' },
        { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
    ],
};
// end: modal required inputs


const Server = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedServer, setSelectedServer] = useState(false);
    const [formValues, setFormValues] = useState({});
    const modalRef = useRef(null);


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

    const handleOpen = (company) => {
        setSelectedServer(company);
        setFormValues({});
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSelectedServer(null);
        setFormValues({});
    };

    const handleBackdropClick = (e) => {
        if (e.target == modalRef.current) {
            handleClose();
        }
    };

    const handleChange = (fieldName, e) => {
        setFormValues((prev) => ({
            ...prev,
            [fieldName]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };

    // end : funtions for modal

    return (
        <>

            {/* start: header */}
            <Link 
                component={RouterLink} 
                to='/' underline='none' 
                color='inherit'
            >
                <div className='flex p-2'>
                    <ArrowBackIcon 
                        sx={{ fontSize: 18, marginTop: .2 }} 
                    />
                    <p className='tracking-[.20em] ml-3'>BACK</p>
                </div>
            </Link>

            <div className='mt-4 p-3 flex flex-col items-start gap-1'>
                <h5 className='text-lg tracking-[.18em]'>CLOUD SERVER</h5>
                <p className='text-base text-gray-300 mt-1 text-[14px]'>
                    <DnsOutlinedIcon 
                        sx={{ fontSize: 20, marginBottom: 0.3, marginRight: 0.5 }} 
                        color='inherit' 
                        aria-hidden="true" 
                    />
                    Configure Server
                </p>
            </div>

            {/* end: header */}


            <hr className='w-full h-1 mt-8 bg-gray-900' />


            {/* start: main */}
            <div className=' flex mt-6 p-0 gap-4'>


                {/* start: amazon AWS credetial collection */}
                <div>
                    <div 
                        className=' h-20 w-100 p-4 flex flex-col justify-center items-center  hover:text-gray-500' 
                        onClick={() => handleOpen('AmazonAWS')}
                    >
                        Amazon AWS -------------------------- ✗
                    </div>
                    <Link 
                        component={RouterLink} 
                        to='/monitor' 
                        underline='none' 
                        color='inherit'
                    >
                        <button className='mt-1 w-25 h-8 p-1 bg-cyan-700 text-[14px] rounded-[1px] text-gray-300 hover:bg-cyan-900'>View</button>
                    </Link>
                </div>
                {/* end: amazon AWS credetial collection */}


                {/* start: didgitalocean credetial collection */}
                <div>
                    <div 
                        className=' h-20 w-100 p-4 flex flex-col justify-center items-center hover:text-gray-500' 
                        onClick={() => handleOpen('DigitalOcean')}
                    >
                        DigitalOcean -------------------------- ✓
                    </div>
                    <Link 
                        component={RouterLink} 
                        to='/monitor' 
                        underline='none' 
                        color='inherit'
                    >
                        <button className='mt-1 w-25 h-8 p-1 bg-cyan-700 text-[14px] rounded-[1px] text-gray-300 hover:bg-cyan-900'>View</button>
                    </Link>
                </div>
                {/* end: didgitalocean credetial collection */}


                {/* start: cisco server credetial collection */}
                <div>
                    <div 
                        className=' h-20 w-100 p-4 flex flex-col justify-center items-center hover:text-gray-500' 
                        onClick={() => handleOpen('Cisco')}
                    >
                        Cisco Server -------------------------- ✗
                    </div>
                    <Link 
                        component={RouterLink} 
                        to='/monitor' 
                        underline='none' 
                        color='inherit'
                    >
                        <button className='mt-1 w-25 h-8 p-1 bg-cyan-700 text-[14px] rounded-[1px] text-gray-300 hover:bg-cyan-900'>View</button>
                    </Link>
                </div>
                {/* end: cisco server credetial collection */}

            </div>
            {/* end: main */}


            {/* start: footer */}
            <div className="mt-142 text-center relative">
                <p className="text-[12px]">&copy; {new Date().getFullYear()} Real-Time Monitoring System (R-TMS)</p>
            </div>
            {/* end: footer */}


            {/* for modal functionality */}
            {isOpen && (
                <div 
                    ref={modalRef} 
                    onClick={handleBackdropClick} 
                    className='fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur-sm px-4'
                >
                    <div 
                        className='w-250 bg-[rgba(17,24,39,0.9)] rounded-[1px] max-w-lg p-4 shadow-lg relative' 
                        onClick={(e) => e.stopPropagation}
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

                        <h5 className='text-[14px] font-bold mt-4 mb-2 text-gray-400 tracking-[.30em]'>{selectedServer.toUpperCase()} SERVER CREDENTIALS</h5>

                        <form 
                            onSubmit={handleSubmit} 
                            className='flex flex-col gap-4 mt-6'
                        >
                            {cloudServer[selectedServer]?.map(({ label, name, type, placeholder }) => (
                                <div 
                                    key={name} 
                                    className='flex items-center gap-4 justify-between w-full text-gray-300'
                                >
                                    <label 
                                        htmlFor={name} 
                                        className='w-1/3 text-[14px] font-medium'
                                    >
                                        {label}
                                    </label>
                                    <input 
                                        id={name} 
                                        type={type} 
                                        name={name} 
                                        placeholder={placeholder} 
                                        value={formValues[name] || ''} 
                                        onChange={(e) => handleChange(name, e)} 
                                        className='w-2/3 rounded-[1px] border border-gray-300 text-gray-400 px-4 py-2 placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2' 
                                        autoComplete='off' 
                                        required 
                                    />
                                </div>
                            ))}


                            <button 
                                type='submit' 
                                className='text-gray-300 rounded-[1px] h-10 bg-cyan-900 hover:bg-cyan-600 transition-colors duration-300 mt-4'
                            >
                                <h5 className='tracking-[.20em] text-[14px]'>Save</h5>
                            </button>

                        </form>

                    </div>
                </div>
            )}

        </>
    )
};

export default Server;