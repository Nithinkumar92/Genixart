import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {motion} from 'framer-motion'
import axios from 'axios'
import {toast} from 'react-hot-toast'
const Login = () => {

const [state,setState] = useState('Login')
const {showLogin,setShowLogin,backendUrl,setToken,setUser} =useContext(AppContext)
const [name,setName]= useState('')
const [email,setEmail]= useState('')
const [password,setPassword]=useState('')
useEffect(()=>{
   document.body.style.overflow="hidden";
   return ()=>{
    document.body.style.overflow="unset"
   }
},[])

const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        let response;
        if (state === 'Login') {
            response = await axios.post(`${backendUrl}/api/user/login`, {
                email,
                password
            });
        } else {
            response = await axios.post(`${backendUrl}/api/user/register`, {
                name,
                email,
                password
            });
        }

        const data = response.data;

        if (data.success) {
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('token', data.token);
            setShowLogin(false);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "An unexpected error occurred");
        console.log(error);
    }
};
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <motion.form onSubmit={onSubmitHandler}
        initial={{opacity:0.2,y:50}}
        transition={{duration :0.3}}
        whileInView={{opacity :1,y:0}}
        viewport={{once:true}}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-neutral-600 font-medium'>{state}</h1>
            <p className='text-md text-center'>{state==='Login'?'welcome back! Please sign in to continue':'Get Started with Sign up'}</p>
            {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.profile_icon} className='size-6' alt='user icon'/>
                <input type='text' onChange={(e)=>setName(e.target.value)} value={name} className='outline-none text-sm' required placeholder='Full Name'/>
                
            </div>}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon}  alt='email icon'/>
                <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email} className='outline-none text-sm' required placeholder='Email'/>
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon}  alt='password icon'/>
                <input type='password' onChange={(e)=>setPassword(e.target.value)} value={password} className='outline-none text-sm' required placeholder='Password'/>
            </div>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'login' :'create account'}</button>

            {state==='Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('SignUp')}>Sign Up</span></p>
            :<p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>
}
            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt='' className='absolute top-5 right-5 cursor-pointer'/>
        </motion.form>
    </div>
  )
}

export default Login
