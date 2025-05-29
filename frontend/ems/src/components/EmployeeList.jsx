import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { columns, EmployeeButtons } from '../../util/EmployeeHelper'

export const EmployeeList = () => {
  const [employees, setEmployees]=useState([])
  const [empLoading, setEmpLoading]=useState(false)
  const [filteredEmployees, setFilteredEmployees]=useState([])

  useEffect(()=>{
    const fetchEmployees=async ()=>{
      setEmpLoading(true);
      try{
        const response=await axios.get(import.meta.env.VITE_HOST+'/api/employee',
          {
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
          });
          
          if(response.data.success){
            const info = response.data.employees.map((emp, index) => (
              {
                _id: emp._id,
                sno: index+1,
                name: emp.userId?.name,
                dob: new Date(emp.dob).toLocaleDateString(),
                dep_name: emp.department?.dep_name,
                action: (<EmployeeButtons _id={emp._id} />)
              }
            ));
            setEmployees(info);
            setFilteredEmployees(info);
          }
        }
      catch(error){
        if(error.response && !error.response.data.success)
          alert(error.response.data.error);
      }
      finally{
        setEmpLoading(false);
      }
    }
    
    fetchEmployees();
  },[]);
  
  const handleFilter=(e)=>{
    const records=employees.filter((emp)=> 
      emp.name.toLowerCase()
      .includes(e.target.value.toLowerCase()))
    setFilteredEmployees(records);
  }

  return (
    empLoading ? <div>Loading....</div> :
    <div className='px-5 py-2'>
        <div className='text-center my-2'>
            <h3 className='text-2xl font-bold'>Manage Employees</h3>
        </div>
        <div className='flex justify-between items-center '>
            <input type="text" 
            placeholder='Search by name' 
            onChange={handleFilter}
            className='px-4 py-0.5 border' />
            <Link to="/admin-dashboard/add-employee" 
              className='px-4 py-1 bg-teal-600 rounded text-white' >
              Add new employee</Link>
        </div>
        <div className='py-2 m-2'>
          <DataTable
            columns={columns} data={filteredEmployees} pagination >
          </DataTable>
        </div>
    </div>
  )
}
