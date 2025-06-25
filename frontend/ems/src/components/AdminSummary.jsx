import React, { useEffect, useState } from 'react'
import { SummaryCard } from './SummaryCard'
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminSummary = () => {
  const [summary, setSummary]= useState(null)

  useEffect(()=>{
    const fetchSummary= async()=>{
      try{
        const response=await axios.get(import.meta.env.VITE_HOST+'/api/dashboard/summary',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
  
        if(response.data.success){
          setSummary(response.data);
        }
      }
      catch(error){
        if(error.response.data.error && !error.response.data.success){
          toast.error(error.response.data.error)
        }
      }
    }

    fetchSummary();
  },[]);
  
  return (
    <div className='mt-12 '>
      <h3 className='text-2xl font-bold pl-4'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 m-6'>
          <SummaryCard icon={<i className='fa-solid fa-users'/>} text="Total Employees" number={summary?.totalEmployee} color='bg-yellow-600' />
          <SummaryCard icon={<i className='fa-solid fa-building'/>} text="Total Departments" number={summary?.totalDepartment} color='bg-teal-600' />
          <SummaryCard icon={<i className='fa solid fa-money-bill-wave'/>} text="monthly Salary" number={`₹ ${summary?.totalSalary[0]?.salary}`} color='bg-green-600' />
      </div>
      <div className='mt-2'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 m-6'>
          <SummaryCard icon={<i className='fa-solid fa-file'/>} text="Leave Applied" number={summary?.leaveSummary.applied} color='bg-teal-600' />
          <SummaryCard icon={<i className='fa-solid fa-hourglass-half'/>} text="Leave Pending" number={summary?.leaveSummary.pending} color='bg-yellow-600' />
          <SummaryCard icon={<i className='fa-solid fa-check-circle'/>} text="Leave Approved" number={summary?.leaveSummary.approved} color='bg-green-600' />
          <SummaryCard icon={<i className='fa-solid fa-times-circle'/>} text="Leave Rejected" number={summary?.leaveSummary.rejected} color='bg-red-600' />

        </div>
      </div>
    </div>
  )
}
