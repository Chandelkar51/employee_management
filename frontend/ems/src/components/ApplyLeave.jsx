import React, { useEffect, useState } from 'react'
import { fetchEmployees }  from '../../util/EmployeeHelper.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth.context.jsx'
import { toast } from 'react-toastify'

export const ApplyLeave = (id) => {
    const navigate=useNavigate()
    const {user}=useAuth()

    const [leave, setLeave]=useState({
        employeeID: id,
    })
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        
        const getEmployee = async () => {
            const empData = await fetchEmployees(user._id);
            setEmployee(empData);
            setLeave(prev => ({ ...prev, employeeID: empData._id })); 
        };

        if (user && user._id) {
            getEmployee();
        }
    }, [user]);

    const handleChange=(e)=>{
        const{name, value, files}=e.target;
        setLeave((prevdata)=>({...prevdata, [name]: value}))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
            const response=await axios.post(import.meta.env.VITE_HOST+'/api/leave/apply',
                leave,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
            });

            if(response.data.success){
                toast.success("Leave applied");
                navigate('/employee-dashboard/leave');
            }
        }
        catch(error){
          if(error.response && !error.response.data.success)
            toast.error(error.response.data.error);
        }
    }
    
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md '>
        <h2 className='text-2xl font-bold mb-6 '>Request for leave</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Employee ID
                    </label>
                    <input
                        type='text'
                        value={employee?.employeeID}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        // required 
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Leave Type
                    </label>
                    <select
                        name='leaveType'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required >
                        <option value="">Select</option>
                        <option value="Anual">Anual</option>
                        <option value="Sick">Sick</option>
                        <option value="Casual">Casual</option>
                    </select>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        From Date
                    </label>
                    <input type="date"
                        name='startDate'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required 
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        To Date
                    </label>
                    <input type="date"
                        name='endDate'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>             
                <div >
                <label className='block text-sm font-medium text-gray-700 '>
                        Description
                    </label>
                    <textarea 
                        name='reason'
                        placeholder='Reason'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
            </div>
            <button type='submit'
                className='w-120 text-center items-center ml-40 mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md '>
                Apply
            </button>
        </form>
    </div>
  )
}
