import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AddDepartment = () => {
  const [department, setDepartment]=useState({
    dep_name: "",
    description: ""
  });
  const navigate=useNavigate()

  const handleChange=(e)=>{
    const {name, value}=e.target;
    setDepartment({...department, [name]: value});
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const response=await axios.post(import.meta.env.VITE_HOST+'/api/department/add', department,
        {
          headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
        });
      if(response.data.success){
        toast.success("New Department Added");
        navigate('/admin-dashboard/departments');
      }
    }
    catch(error){
      if(error.response && !error.response.data.success)
        toast.error(error.response.data.error);
    }
  }

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md w-96'>
        <div>
          <h2 className='text-2xl font-bold mb-6'>Add New Department</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="dep_name"
                className='text-sm block font-medium text-gray-700'>
                Department Name
              </label>
              <input type="text"
                className='mt-1 w-full block p-2 border bg-gray-100 rounded-md' 
                name='dep_name'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description" 
                className='text-sm block font-medium text-gray-700'
                >Description
              </label>
              <textarea name="description" 
                className='mt-1 w-full h-28 block p-2 border rounded-md bg-gray-100' 
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button 
              className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
              Add department</button>
          </form>
        </div>
    </div>
  )
}
