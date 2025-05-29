import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { fetchDepartments } from '../../util/EmployeeHelper'

export const EditEmployee = () => {
    const [employee, setEmployee]=useState({
        name: "",
        maritalstatus: "",
        designation: "",
        department: "",
        salary: ""
    })
    const [departments, setDepartments]=useState([])
    const {id}=useParams()

    const navigate=useNavigate()
    
    useEffect(()=>{
        const getData=async()=>{
            const dep=await fetchDepartments();
            setDepartments(dep);
        }
        getData();
    }, [])

    useEffect(()=>{
        const fetchEmployee=async ()=>{
            try{
                const response=await axios.get(`${import.meta.env.VITE_HOST}/api/employee/${id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
                });
            
                if(response.data.success){
                    const info=response.data.employee;
                    setEmployee((prev)=>({...prev, name: info.userId?.name,
                        maritalStatus: info.maritalStatus,
                        designation: info.designation,
                        department: info.department?.dep_name,
                        salary: info.salary
                    }));
                }
            }
            catch(error){
                if(error.response && !error.response.data.success)
                alert(error.response.data.error);
            }
        }
    
        fetchEmployee();
    },[]);
    
    const handleChange=(e)=>{
        const{name, value}=e.target;
        
        setEmployee({...employee, [name]: value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
            const response=await axios.put(`${import.meta.env.VITE_HOST}/api/employee/edit/${id}`, employee,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
            });

            if(response.data.success){
                alert("Employee updated");
                navigate('/admin-dashboard/employee');
            }
        }
        catch(error){
          if(error.response && !error.response.data.success)
            alert(error.response.data.error);
        }
    }

  return (
    !employee ? <div>Loading....</div> :
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md '>
        <h2 className='text-2xl font-bold mb-6 '>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div >
                    <label className='block text-sm font-medium text-gray-700 '>
                        Name
                    </label>
                    <input type="text"
                        name='name'
                        value={employee.name}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
                <div>
                <label className='block text-sm font-medium text-gray-700 '>
                        Marital Status
                    </label>
                    <select
                        name='maritalStatus'
                        value={employee.maritalStatus}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required >
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="widow">Widow</option>
                    </select>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Designation
                    </label>
                    <input type="text"
                        name='designation'
                        value={employee.designation}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Department
                    </label>
                    <select
                        name='department'
                        value={employee.department}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required >
                        <option value="">Select Department</option>
                        {departments.map(dep=> (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Salary
                    </label>
                    <input type="number"
                        name='salary'
                        value={employee.salary}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
            </div>
            <button type='submit'
                className='w-120 text-center items-center ml-40 mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md '>
                Update Employee
            </button>
        </form>
    </div>
  )
}
