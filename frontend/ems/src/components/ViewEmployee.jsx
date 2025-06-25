import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { LoadingPage } from './LoadingPage'

export const ViewEmployee = () => {
  const {id}=useParams()
  const [employee, setEmployee]= useState([])
  
  useEffect(()=>{
    const fetchEmployee=async ()=>{
      try{
        const response=await axios.get(`${import.meta.env.VITE_HOST}/api/employee/${id}`,
        {
          headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
        });

        if(response.data.success){
          setEmployee(response.data.employee);
        }
      }
      catch(error){
        if(error.response && !error.response.data.success)
          toast.error(error.response.data.error);
      }
    }

    fetchEmployee();
  },[]);
  
  return (
    (employee.length !=0) ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-medium mb-8 text-center'>
        Employee Details
      </h2>
      <div className='flex justify-evenly'>
          <div className=''>
            <img src={`http://localhost:3000/uploads/${employee?.userId?.profileImage}`} alt="missing" 
              className='rounded-4xl border w-72'/>
          </div>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Name :</p>
            <p className=' text-xl '>{employee?.userId?.name}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Employee ID :</p>
            <p className=' text-xl '>{employee.employeeID}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Date of Birth :</p>
            <p className=' text-xl '>{new Date(employee.dob).toLocaleDateString()}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Gender :</p>
            <p className=' text-xl '>{employee.gender}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Department :</p>
            <p className=' text-xl '>{employee?.department?.dep_name}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Designation :</p>
            <p className=' text-xl '>{employee?.designation}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Marital Status :</p>
            <p className=' text-xl '>{employee.maritalStatus}</p>
          </div>
        </div>
      </div>
    </div>
    ) : <LoadingPage />
  )
}
