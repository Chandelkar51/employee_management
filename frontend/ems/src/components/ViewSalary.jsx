import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/auth.context'

export const ViewSalary = () => {
    const {user}=useAuth()
    const {id}=useParams()
    const [salary, setSalary]= useState([])
    const [filteredSalary, setFilteredSalary]=useState([])

    useEffect(()=>{
        const fetchSalary= async()=>{
        
            try{
                const response=await axios.get(`${import.meta.env.VITE_HOST}/api/salary/${id? id : user._id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
                });
            
                if(response.data.success){
                    setSalary(response.data.salaries);
                    setFilteredSalary(response.data.salaries);
                }
            }
            catch(error){
                if(error.response && !error.response.data.success)
                alert(error.response.data.error);
            }
        }
        fetchSalary();
    },[]);
    
    const handleFilter=(e)=>{
        const records=salary.filter((slr)=> 
            slr.employeeID.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredSalary(records);
    }

    let sno=1;
  return (
    filteredSalary=== null ? <div>Loading....</div> : (
        <div className='overflow-x-auto p-5'>
            <div className='text-center my-2'>
                <h3 className='text-2xl font-bold mb-4'>Salary History</h3>
            </div>
            {/* <div className='flex justify-end my-3 '>
                <input type="text" 
                    placeholder='Search by EmpID' 
                    onChange={handleFilter}
                    className='rounded-md px-4 py-0.5 border'
                />
            </div> */}
            {filteredSalary.length >0 ? (
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border '>
                        <tr>
                           <th className='px-6 py-3'>SNo</th> 
                           <th className='px-6 py-3'>Emp ID</th> 
                           <th className='px-6 py-3'>Salary</th> 
                           <th className='px-6 py-3'>Allowance</th> 
                           <th className='px-6 py-3'>Deduction</th> 
                           <th className='px-6 py-3'>Total</th> 
                           <th className='px-6 py-3'>Pay Date</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalary.map((slr)=>(
                            <tr
                                key={slr._id}
                                className='bg-white border-b text-gray-800 dark:border-gray-700'
                            >
                                <td className='px-6 py-3'>{sno++}</td>
                                <td className='px-6 py-3'>{slr.employeeID?.employeeID}</td>
                                <td className='px-6 py-3'>{slr.basicSalary}</td>
                                <td className='px-6 py-3'>{slr.allowance}</td>
                                <td className='px-6 py-3'>{slr.deduction}</td>
                                <td className='px-6 py-3'>{slr.netSalary}</td>
                                <td className='px-6 py-3'>{new Date(slr.payDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <div className='border border-gray-300 text-center text-xl'>No Records</div>}
        </div>
    )
  )
}
