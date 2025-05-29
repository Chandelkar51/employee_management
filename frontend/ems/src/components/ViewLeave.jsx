import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const ViewLeave = () => {
  const {id}= useParams()
  const [leave, setLeave]=useState(null)

  const fetchLeave= async()=>{
      try{
        const response=await axios.get(`${import.meta.env.VITE_HOST}/api/leave/${id}`,
          {
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
          }
        );
        
        if(response.data.success){
          setLeave(response.data.leave)
        }
      }
      catch(error){
        if(error.response && !error.response.data.success)
            alert(error.response.data.error);
      }
  }

  useEffect(()=>{
    fetchLeave();
  },[leave])

  const changeStatus= async(id, status)=>{
      try{
        const response=await axios.put(`http://127.0.0.1:3000/api/leave/status/${id}`,
          {status: status},
          {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
          }
        );
        
        if(response.data.success){
          setLeave({...leave, [status]: LeaveList.status});
          fetchLeave();
        }
      }
      catch(error){
        if(error.response && !error.response.success){ 
          alert(error.response)
        }
      }
  }
   
  return (
    leave ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-medium mb-8 text-center'>
        Leave Details
      </h2>
      <div className='flex justify-evenly'>
        <div className=''>
          <img src={`http://localhost:3000/uploads/${leave.employeeID.userId?.profileImage}`} alt="missing" 
            className='max-h-44 w-44 rounded-full border mb-4'
          />
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Name :</p>
            <p className=' text-xl '>{leave.employeeID?.userId.name}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Department :</p>
            <p className=' text-xl '>{leave.employeeID.department?.dep_name}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Designation :</p>
            <p className=' text-xl '>{leave.employeeID.designation}</p>
          </div> 
        </div>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Leave Type :</p>
            <p className=' text-xl '>{leave.leaveType}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Start Date :</p>
            <p className=' text-xl '>{new Date(leave.startDate).toLocaleDateString()}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>End Date :</p>
            <p className=' text-xl '>{new Date(leave.endDate).toLocaleDateString()}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Reason :</p>
            <p className=' text-xl text-wrap max-w-52'>{leave.reason}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-xl font-medium '>Status :</p>
            <p className=' text-xl '>{leave.status}</p>
          </div>
        </div>
      </div>
      {leave.status=="Pending"?(
        <div className='p-2 flex items-center justify-center'>
          <button 
            className='px-2 py-1 text-center mx-2 text-white font-medium bg-green-600 rounded'
            onClick={()=>changeStatus(leave._id, "Approved")}
            >Accept
          </button>
          <button 
            className='px-2 py-1 mx-2 text-center text-white font-medium bg-red-600 rounded'
            onClick={()=>changeStatus(leave._id, "Rejected")}
            >Reject
          </button>
        </div>
      ):""}  
    </div>
    ) :<div>Loading....</div> 
  )
 }
 