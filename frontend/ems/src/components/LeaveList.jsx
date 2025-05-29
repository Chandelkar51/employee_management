import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../context/auth.context.jsx'
import { fetchEmployees }  from '../../util/EmployeeHelper.jsx'

export const LeaveList = () => {
  const {user}=useAuth()
  const {id}=useParams()
  const [leaves, setLeaves]=useState([])
  const [loading, setLoading]=useState(false)
  const [employee, setEmployee] = useState(null);
  // const [filteredLeaves, setFilteredLeaves]=useState([])

  useEffect(() => {
    const getEmployee = async () => {
      if(user.role== "employee"){
        const empData = await fetchEmployees(user._id);
        setEmployee(empData);
      }
    };
    if (user && user._id) {
      getEmployee();
    }
  }, [user]);

  useEffect(()=>{
    const fetchLeaves=async ()=>{
      setLoading(true)
      
      try{
        const response=await axios.get(`${import.meta.env.VITE_HOST}/api/leave/${id? id : employee._id}`,
          {
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
          });
          
          if(response.data.success){
            setLeaves(response.data.leave);
            // setFilteredLeaves(response.data.leave);
          }
        }
      catch(error){
        if(error.response && !error.response.data.success)
          alert(error.response.data.error);
      }
      finally{
        setLoading(false)
      }
    }
    
    fetchLeaves();
  },[employee]);
  
  const handleFilter=(e)=>{
    const records=leaves.filter((lvs)=> 
      lvs.name.toLowerCase().includes(e.target.value.toLowerCase()))
    // setFilteredLeaves(records);
  }
  
  let sno=1;
  return (
    loading ? <div>Loading....</div> :
    <div className='px-5 py-2'>
      <div className='text-center my-2'>
        <h3 className='text-2xl font-bold'>{user.role=="employee"? "Your Leaves" : "Leave History"}</h3>
      </div>
      <div className='flex justify-between items-center '>
        {/* <input type="text" 
          placeholder='Search by name' 
          onChange={handleFilter}
          className='px-4 py-0.5 border' 
        /> */}
        {user.role=="employee" ?
        <Link to='/employee-dashboard/apply-leave'
          className='px-4 py-1 ml-6 bg-teal-600 rounded text-white'
          >Apply Leave
        </Link> :""}
      </div>

      <div className='overflow-x-auto p-2 m-2'>
        {leaves.length >0 ? (
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border '>
              <tr>
                <th className='px-6 py-3'>SNo</th> 
                <th className='px-6 py-3'>Leave Type</th> 
                <th className='px-6 py-3'>start date</th> 
                <th className='px-6 py-3'>End Date</th> 
                <th className='px-6 py-3'>reason</th> 
                <th className='px-6 py-3'>Aplied Date</th> 
                <th className='px-6 py-3'>Status</th> 
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave)=>(
              <tr
                key={leave._id}
                className='bg-white border-b text-gray-800 dark:border-gray-700'
                >
                <td className='px-6 py-3'>{sno++}</td>
                <td className='px-6 py-3'>{leave.leaveType}</td>
                <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{leave.reason}</td>
                <td className='px-6 py-3'>{new Date(leave.appliedAt).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{leave.status}</td>
              </tr>
              ))}
            </tbody>
          </table>
        ) : <div className='border border-gray-300 text-center text-xl'>No Records</div>}
      </div>
    </div>
  )
}
