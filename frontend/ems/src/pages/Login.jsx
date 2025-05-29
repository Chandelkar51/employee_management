import React, { useState } from 'react'
import axios from 'axios'
import {useAuth} from '../context/auth.context.jsx'
import { NavLink, useNavigate } from 'react-router-dom'

const Login= ()=>{
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [error, setError]=useState(null)
    const {login}=useAuth();
    const navigate=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError(null);
        try{
            const response=await axios.post(import.meta.env.VITE_HOST+"/api/auth/login",
                {email, password});
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin"){
                    navigate('/admin-dashboard');
                }
                else{
                    navigate('/employee-dashboard');
                }
                alert("succefully login");
            }
        }
        catch(error){
            if(error.response && !error.response.data.success){
                setError(error.response.data.error);
            }
            else{
                setError("LoginPage Server Error");
            }
        }
    }
    
  return (
    <div className='flex flex-col items-center h-screen justify-center 
    bg-gradient-to-b from-teal-600 from-50% to-gray-100 to 50% space-y-6'>
        <h1 className='text-3xl text-white'>
            Employee Mangement System</h1>
        <div className='border shadow p-6 w-80 bg-white'>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700'>Email</label>
                    <input type="email" 
                        className='w-full px-3 py-2 border'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className='block text-gray-700'>Password</label>
                    <input type="password" 
                        className='w-full px-3 py-2 border'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required
                    />
                </div>
                <div className='mb-4 flex items-center justify-between '>
                    <label className="inline items-center">
                        <input type="checkbox" className='form-checkbox ' />
                        <span className='ml-2 text-gray-700 '>Remember me</span>
                    </label>
                    <NavLink to="/forget-password" className='text-teal-600'>Forget Password</NavLink>
                </div>
                <button type='submit' className='bg-teal-600 text-white py-2 w-full '>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login;