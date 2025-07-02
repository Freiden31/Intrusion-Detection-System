import React from "react";
import { CircularProgress, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from "react";
import { registerAccount } from "../datasets/api";
import Alert from '@mui/material/Alert';

const Signup = () => {
    // start: register account with form
    const [form, setForm] = useState({ 
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        confirm_password: '',
    })
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState(false);

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async e => {
        e.preventDefault();

        setLoad(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setLoad(false);

        setError('');
        setMessage('');
        setForm({
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            confirm_password: '',
        });

        // api function no.03
        try {
            const response = await registerAccount(form.first_name, form.last_name, form.email, form.username,  form.password, form.confirm_password);
            setMessage(response.message)
        } catch (error) {
            const err = error.response?.data;

            if (err?.error) {
                setError(err.error); 
            } else {
                const errorMessages = Object.values(err).flat().join(' ');
                setError(errorMessages);
            }
        }
    }

    useEffect(() => {
        if(error){
            const timer = setTimeout(() => {
                setError('');
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [error]);
    // end: register account with form



    return (
        <>
            <div className=" w-full h-[870px] p-4 flex flex-col items-center justify-center">
                {error && (
                            <div className="w-full flex items-center justify-center gap-4 mb-2 ">
                                <Alert 
                                    sx={{
                                        backgroundColor: 'rgba(83, 39, 34, 0.83)',
                                        width: '28rem', 
                                        height: 60, 
                                        color:  '#fcfcfc',
                                        fontFamily: "Share Tech",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'justify',
                                        textAlign: 'justify',
                                        letterSpacing: '.10em',
                                        height: '6rem'              
                                    }}
                                    severity="error"
                                >
                                    {error}
                                </Alert>                                    
                            </div>
                        )}

                    {message && (
                        <div className="w-full flex items-center justify-center gap-4 mb-2 ">
                             <Alert 
                                sx={{
                                    backgroundColor: 'rgba(60, 85, 26, 0.83)',
                                    width: '28rem', 
                                    height: 60, 
                                    color:  '#fcfcfc',
                                    fontFamily: "Share Tech",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    letterSpacing: '.10em',
                                    height: '6rem'           
                                }} 
                                severity="success"
                            >
                                {message}
                            </Alert>                            
                        </div>
                    )}
                <div className='bg-[rgba(17,24,39,0.9)] flex flex-col items-center justify-center h-[630px] w-[28rem] p-6 rounded-[2px] text-gray-300'>
                    
                    <div className="mb-6 gap-4">
                        <h4 className="font-bold text-[16px] tracking-[.10em] mb-2">Get Started!</h4>
                        <p className="text-[12px]">Use your social profile to register.</p>
                    </div>

                    {/* start: social app authentication */}
                    <div className=" w-full flex items-center justify-center gap-4 mb-4">
                        <div style={{ width: '290px', fontFamily: "Share Tech"  }}>
                            <GoogleLogin
                                // onSuccess={handleSuccess}
                                // onError={() => console.log('Login Failed')}
                                size="medium"
                                shape="rectangular"
                                theme="outline"
                            />
                        </div>
                    </div>
                    {/* end: social app authentication */}

                    <div className="w-full flex items-center justify-center gap-4">
                        <hr className="h-[.5px] w-[112px] bg-white" /> 
                        <h5 className="text-[12px]">or</h5> 
                        <hr className="h-[.5px] w-[112px] bg-white" />
                    </div>

                    <form className="w-full mt-2" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="w-full flex items-center justify-center gap-4">
                                <input 
                                    name="first_name"
                                    id="first_name"
                                    type="text"
                                    className='w-[128px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2 p-2' 
                                    autoComplete='off' 
                                    placeholder="First Name" 
                                    value={form.first_name}
                                    onChange={handleChange}
                                    required 
                                />
                                <input 
                                    name="last_name"
                                    id="last_name"
                                    type="text"
                                    className='w-[128px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2 p-2' 
                                    autoComplete='off' 
                                    placeholder="Last Name"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    className='w-[270px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2 p-2' 
                                    autoComplete='off' 
                                    placeholder='Email'
                                    value={form.email}
                                    onChange={handleChange}
                                    required 
                                />
                                <input 
                                    name="username"
                                    id="username"
                                    type="text"
                                    className='w-[270px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2 p-2' 
                                    autoComplete='off' 
                                    placeholder='Username'
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                                <input 
                                    name="password"
                                    id="password"
                                    type="password"
                                    className='w-[270px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2 p-2' 
                                    autoComplete='off' 
                                    placeholder='Password'
                                    value={form.password}
                                    onChange={handleChange}
                                    required 
                                />
                                <input 
                                    name="confirm_password"
                                    id="confirm_password"
                                    type="password"
                                    className='w-[270px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2 p-2' 
                                    autoComplete='off' 
                                    placeholder='Confirm Password'
                                    value={form.confirm_password}
                                    onChange={handleChange} 
                                    required
                                />
                         </div>

                        <button 
                            type="submit"
                            disabled={load}
                            className={`mt-3 w-[270px] h-8 ml-[4rem] p-1 bg-cyan-700 text-[14px] tracking-[.20em] rounded-[1px] text-gray-300 hover:bg-cyan-900 flex items-center justify-center gap-2 ${
                                load ? 'bg-cyan-900' : 'bg-cyan-900 hover:bg-cyan-900'
                            }`}
                        >
                            { load ? (
                                <>
                                    <CircularProgress size={18} color="inherit" />
                                </>
                                ) : (
                                    'REGISTER'
                                )
                            }
                        </button>
                    </form>

                    <div className="flex flex-row items-center justify-center mt-6 gap-2 tracking-[.10em]">
                        <h5 className="text-[14px]">Already have an account?</h5>
                        <Link component={RouterLink} to='/signin' underline="none" color="inherit">
                            <p className="text-[14px] text-cyan-500 hover:text-gray-400">Login here</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Signup;