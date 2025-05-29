import React, { useEffect, useState } from 'react'
import { SummaryCard } from './SummaryCard'
import axios from 'axios'

export const EmployeeSummary = () => {
  const [summary, setSummary]= useState(null)

//   useEffect(()=>{
//     const fetchSummary= async()=>{
//       try{
//         const response=await axios.get('http://127.0.0.1:3000/api/dashboard/summary',{
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         });
  
//         if(response.data.success){
//           setSummary(response.data);
//         }
//       }
//       catch(error){
//         if(error.response.data.error && !error.response.data.success){
//           alert(error.response.data.error)
//         }
//       }
//     }

//     fetchSummary();
//   },[]);
    
  return (
    <div className='mt-4'>
      {/* <h3 className='text-2xl font-bold pl-4'>Dashboard Overview</h3> */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 m-2'>
        <SummaryCard icon={<i className='fa-solid fa-user'></i>} text={"Welcome"} color='bg-gray-600' />
      </div>
      <div className='mt-2'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 m-6'>
          <SummaryCard icon={<i className='fa-solid fa-file'/>} text="Leave Applied" number={0} color='bg-teal-600' />
          <SummaryCard icon={<i className='fa-solid fa-hourglass-half'/>} text="Leave Pending" number={0} color='bg-yellow-600' />
          <SummaryCard icon={<i className='fa-solid fa-check-circle'/>} text="Leave Approved" number={0} color='bg-green-600' />
          <SummaryCard icon={<i className='fa-solid fa-times-circle'/>} text="Leave Rejected" number={0} color='bg-red-600' />

        </div>
      </div>
    </div>
  )
}
