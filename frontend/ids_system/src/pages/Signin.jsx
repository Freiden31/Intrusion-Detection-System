import { useState, useEffect } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle, loginAccount } from '../datasets/api';
import { CircularProgress, Alert } from '@mui/material';



const Signin = () => {
    const navigate = useNavigate();

    // start: retreive token from url 
    const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    
    try {
        // api function no. 01
        const response = await loginWithGoogle(credential); 

        if (response?.status == 200 || response?.data.token){
            navigate('/'); // redirect to home page
        } else {
            alert("Failed to login!");
        }
       
    } catch (error) {
        const err = error?.response?.data;

        if(err?.error) {
            setError(err.error);
        } else {
            const errorMessage = Object.values(err).flat().join('');
            setError(errorMessage);
        }
    }
    };
    // end: retreive token from url

    // start: login account with username and password
    const [form, setForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('');
    const [load, setLoad] = useState(false);

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        setLoad(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setLoad(false);

        setError('');
        setForm({
            username: '',
            password: '',
        });

        // api function no. 02
        try {
            const response = await loginAccount(form.username, form.password);
            navigate('/'); // navigate to home page

        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    useEffect(() => {
        if(error){
            const timer = setTimeout(() => {
                setError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error])
    // end: login account with username and password


    return (
        <>
            <div className=" w-full h-[890px] p-4 flex flex-col items-center justify-center">
                { error && (
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
                                    justifyContent: 'center',
                                    letterSpacing: '.10em',           
                                }}
                                severity="error"
                            >
                                {error}
                            </Alert>                                          
                        </div>
                )}
                
                <div className='bg-[rgba(17,24,39,0.9)] flex flex-col items-center justify-center h-[410px] w-[28rem] p-6 rounded-[2px] text-gray-300'>
                    
                    <div className="mb-4 gap-4">
                        <h4 className="font-bold text-[16px] tracking-[.10em]">
                            Welcome!
                        </h4>
                    </div>

                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center justify-center gap-2">
                                <input 
                                    name="username"
                                    id="email_or_username"
                                    type="text"
                                    className='w-[290px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2 p-2' 
                                    autoComplete='off' 
                                    placeholder='Username'
                                    onChange={handleChange}
                                    value={form.username}
                                    required
                                />
                                <input 
                                    name="password"
                                    id="password"
                                    type="password"
                                    className='w-[290px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none mt-2 p-2' 
                                    autoComplete='off' 
                                    placeholder='Password' 
                                    value={form.password}
                                    onChange={handleChange}
                                    required 
                                />
                        </div>
                        <button
                            type='submit'
                            disabled={load}
                            className={`mt-3 w-[290px] h-8 ml-[3.4rem] p-1 rounded-[1px] text-[14px] tracking-[.20em] text-gray-300 flex items-center justify-center gap-2 ${
                                load ? 'bg-cyan-900' : 'bg-cyan-900 hover:bg-cyan-900'
                            }`}
                        >
                            {load ? (
                                <>
                                    <CircularProgress size={18} color="inherit" />
                                </>
                                ) : (
                                    'LOGIN'
                            )}
                        </button>
                    </form>
                    <div className="w-[290px] flex justify-end mt-3  tracking-[.05em]">
                        <Link 
                            component={RouterLink} 
                            to='/reset' 
                            underline='none' 
                            color='inherit'
                        >
                            <p className="text-[12px] text-cyan-500 ml-2 hover:text-gray-400">
                                Forgot Password
                            </p>
                        </Link>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-6 gap-2 tracking-[.10em]">
                        <h5 className="text-[14px]">Dont have an account yet?</h5>
                        <Link component={RouterLink} to='/signup' underline='none' color='inherit'>
                            <p className="text-[14px] text-cyan-500 hover:text-gray-400">Register here</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Signin;