import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Sign up')
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log('triggered');
        try {
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
                console.log('This is recieved data ', data);
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                console.log('This is recieved data ', data);

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
            console.log('this is error',error);
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/40 flex justify-center items-center'>

            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl  font-medium text-first'>{state}</h1>
                <p className='text-sm text-center'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' &&
                    <div className='border px-6 py-2 flex items-center  gap-2 rounded-full mt-5'>
                        <img src={assets.user_icon} alt="" />
                        <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Full Name' required />
                    </div>
                }

                <div className='border px-6 py-2 flex items-center  gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="" />
                    <input className='outline-none text-sm' type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder='Email id' required />
                </div>

                <div className='border px-6 py-2 flex items-center  gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" />
                    <input className='outline-none text-sm' type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder='Password' required />
                </div>

                <p className='text-sm text-first my-4 cursor-pointer'>Forgot password?</p>

                <button className='bg-first w-full text-white py-2 rounded-full' type='submit'>{state === 'Login' ? 'Login' : 'Create Account'}</button>

                {state !== 'Sign up' ?
                    <div className='flex flex-row gap-2 mt-2 justify-center '>
                        <p>Don't have an account?</p>
                        <span onClick={() => setState('Sign up')} className='text-first cursor-pointer'>Sign up</span>
                    </div>
                    :
                    <div className='flex flex-row gap-2 mt-2 justify-center'>
                        <p>Already have an account?</p>
                        <span onClick={() => setState('Login')} className='text-first cursor-pointer'>Login</span>
                    </div>
                }


                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
            </motion.form>

        </div>
    )
}

export default Login
