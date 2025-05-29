import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const RegistrationForm = () => {
    const [formData, setFormData]=useState({})

    const navigate=useNavigate()

    const handleChange=(e)=>{
        const{name, value, files}=e.target;
        if(name === "profileImage"){
            setFormData((prevdata)=>({...prevdata, [name]: files[0]}))
        }
        else{
            setFormData((prevdata)=>({...prevdata, [name]: value}))
        }
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const formDataObj=new FormData();
        
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key, formData[key]);
        });
        
        try{
            const response=await axios.post(import.meta.env.VITE_HOST+'/api/auth/register', formDataObj,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
                    "Content-Type": "multipart/form-data"
            });

            if(response.data.success){
                alert("Register successfully");
                navigate('/login');
            }
        }
        catch(error){
          if(error.response && !error.response.data.success)
            alert(error.response.data.error);
        }
    }

  return (
    <div className='max-w-md mx-auto mt-12 bg-gray-50 p-8 rounded-md shadow-md '>
        <h2 className='text-2xl font-bold mb-6 '>Create an Account</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='max-w-sm p-2'>
                <div >
                    <label className='block text-sm font-medium text-gray-700 '>
                        FullName
                    </label>
                    <input type="text"
                        name='name'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Email
                    </label>
                    <input type="email"
                        name='email'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
                <div>
                <label className='block text-sm font-medium text-gray-700 '>
                        Password
                    </label>
                    <input type="password"
                        name='password'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
                <div>
                <label className='block text-sm font-medium text-gray-700 '>
                        Role
                    </label>
                    <select
                        name='role'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        {/* <option value="employee">Employee</option> */}

                    </select>
                </div>
                <div>
                <label className='block text-sm font-medium text-gray-700 '>
                        Upload Image
                    </label>
                    <input type="file"
                        name='profileImage'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
            </div>
            <button type='submit'
                className='max-w-sm text-center items-center mx-4 mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md '>
                Create Account
            </button>
        </form>
    </div>
  )
}
