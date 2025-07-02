import { useState } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress} from '@mui/material';
import { resetPasswordRequest } from '../datasets/api';

const ResetPassword = () => {
    const [form, setForm] = useState({ email: '' })
    const [error, setError] = useState('');
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    
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
                email: '',
            })
    
            // api function no. 02
            try {
                const response = await resetPasswordRequest(form.email);
    
            } catch (error) {
                setError('Email address not registered!' || 'Invalid email address!');
            }
        };

    return (
        <>
            <div className=" w-full h-[890px] p-4 flex items-center justify-center">
                <div className='bg-[rgba(17,24,39,0.9)] flex flex-col items-center justify-center h-[225px] w-[24rem] p-4 rounded-[2px] text-gray-300'>
                        <Link component={RouterLink} to="/signin" underline='none' color='inherit'>
                            <div className='flex flex-row w-full justify-start items-center mr-[14rem]   mb-4'>
                                <ArrowBackIcon 
                                    sx={{ fontSize: 18,  flex: 'none' }} 
                                />
                                <p className='tracking-[.05em] flex-none ml-3'>Back</p>
                            </div>
                        </Link>
            
                    <form className="w-full mt-2 mb-3" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center justify-center gap-2">
                                <input 
                                    name="email"
                                    id="email"
                                    type="email"
                                    className='w-[290px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none p-2' 
                                    placeholder='Email' 
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <button
                            type='submit'
                            disabled={load}
                            className={`mt-3 w-[290px] h-8 ml-[1.9rem] p-1 rounded-[1px] text-[14px] tracking-[.20em] text-gray-300 flex items-center justify-center gap-2 ${
                                load ? 'bg-cyan-500' : 'bg-cyan-700 hover:bg-cyan-900'
                            }`}
                        >
                            {load ? (
                                <>
                                    <CircularProgress size={18} color="inherit" />
                                </>
                                ) : (
                                    'SEND'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ResetPassword;