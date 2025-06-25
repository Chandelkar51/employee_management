import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { fetchDepartments, fetchEmployees } from '../../util/EmployeeHelper'
import { toast } from 'react-toastify'

export const AddSalary = () => {
    const [employee, setEmployee]=useState({
        employeeID: null,
        basicSalary: 0,
        allowance: 0,
        deduction: 0,
        payDate: null
    })
    const [departments, setDepartments]=useState([])
    const [employees, setEmployees]=useState([])

    const navigate=useNavigate()
    
    useEffect(()=>{
        const getData=async()=>{
            const dep=await fetchDepartments();
            setDepartments(dep);
        }
        getData();
    }, [])
    
// need to be implemented a section for update salary
    // useEffect(()=>{
    //     const fetchEmployee=async ()=>{
    //         try{
    //             const response=await axios.get(`http://127.0.0.1:3000/api/employee/${id}`,
    //             {
    //                 headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    //             });
            
    //             if(response.data.success){
    //                 const info=response.data.employee;
    //                 setEmployee((prev)=>({...prev, name: info.userId.name,
    //                     maritalStatus: info.maritalStatus,
    //                     designation: info.designation,
    //                     department: info.department.dep_name,
    //                     salary: info.salary
    //                 }));
    //             }
    //         }
    //         catch(error){
    //             if(error.response && !error.response.data.success)
    //             alert(error.response.data.error);
    //         }
    //     }
    
    //     fetchEmployee();
    // },[]);
    
    const handleDepartment= async(e)=>{
        const{name, value}=e.target;

        const emps=await fetchEmployees(value);
        setEmployees(emps);
    }

    const handleChange=(e)=>{
        const{name, value}=e.target;
        if(name== "employeeID"){
            const emp= employees.find(emp=>emp._id===value);
            employee.basicSalary=emp.salary;
        }
        setEmployee({...employee, [name]: value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        try{
            const response=await axios.post(`${import.meta.env.VITE_HOST}/api/salary/add/${employee.employeeID}`, employee,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
                }
            );

            if(response.data.success){
                toast.success("Salary updated");
                navigate('/admin-dashboard/employee');
            }
        }
        catch(error){
          if(error.response && !error.response.data.success)
            toast.error(error.response.data.error);
        }
    }

  return (
    // !employee ? <div>Loading....</div> :
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md '>
        <h2 className='text-2xl font-bold mb-6 '>Add Salary</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Department
                    </label>
                    <select
                        name='department'
                        value={employee.department}
                        onChange={handleDepartment}
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
                        Employee ID
                    </label>
                    <select
                        name='employeeID'
                        value={employee.employeeID}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required >
                        <option value="">Select Employee</option>
                        {employees.map(emp=> (
                            <option key={emp._id} value={emp._id}>{emp.employeeID}</option>
                        ))}
                    </select>
                </div>
                <div >
                    <label className='block text-sm font-medium text-gray-700 '>
                        Basic Salary
                    </label>
                    <input type="number"
                        name='basicSalary'
                        value={employee.basicSalary}
                        // onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
                <div >
                    <label className='block text-sm font-medium text-gray-700 '>
                        Allowance
                    </label>
                    <input type="number"
                        name='allowance'
                        // value={employee.name}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Deductions
                    </label>
                    <input type="number"
                        name='deduction'
                        // value={employee.salary}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 '>
                        Pay Date
                    </label>
                    <input type="date"
                        name='payDate'
                        // value={employee.salary}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required />
                </div>
            </div>
            <button type='submit'
                className='w-120 text-center items-center ml-40 mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md '>
                Add Salary
            </button>
        </form>
    </div>
  )
}
