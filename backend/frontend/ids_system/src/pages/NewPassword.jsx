import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress} from '@mui/material';
import { newPassword } from '../datasets/api';

const NewPassword = () => {
    const [form, setForm] = useState({ password: '', confirm_password: '' })
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
                password: '',
                confirm_password: '',
            })
    
            // api function no. 02
            try {
                const response = await newPassword(form.password, form.confirm_password);
    
            } catch (error) {
                setError('Password do not match!');
            }
        };

    return (
        <>
            <div className=" w-full h-[890px] p-4 flex items-center justify-center">
                <div className='bg-[rgba(17,24,39,0.9)] flex flex-col items-center justify-center h-[285px] w-[24rem] p-4 rounded-[2px] text-gray-300'>
                        
                        <div className='w-full flex items-center justify-center text-[20px] tracking-[.05em]'>
                            Create new password
                        </div>
                    <form className="w-full mt-2 mb-3" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center justify-center gap-2">
                                <input 
                                    name="password"
                                    id="password"
                                    type="password"
                                    className='w-[290px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none p-2' 
                                    placeholder='New Password' 
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 mt-4">
                                <input 
                                    name="confirm_password"
                                    id="confirm_password"
                                    type="password"
                                    className='w-[290px] rounded-[2px] border border-gray-300 text-gray-400  placeholder-gray-500 placeholder:text-sm focus:border-cyan-500 focus:ring-cyan-300 focus:outline-none p-2' 
                                    placeholder='Confirm New Pasword' 
                                    value={form.confirm_password}
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
                                    'CONFIRM'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default NewPassword;