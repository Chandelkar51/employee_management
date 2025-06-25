import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../util/departmentHelper.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { LoadingPage } from './LoadingPage.jsx'

export const Departments = () => {
  const [departments, setDepartments]=useState([])
  const [depLoading, setDepLoading]=useState(false)
  const [filteredDepartments, seetFilteredDepartments]=useState([])
  // const navigate=useNavigate()

  const fetchDepartments=async ()=>{
    setDepLoading(true);
    try{
      const response=await axios.get(import.meta.env.VITE_HOST+'/api/department',
        {
          headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
        });
        if(response.data.success){
          const data = response.data.departments.map((dep, index) => (
            {
              _id: dep._id,
              sno: index+1,
              dep_name: dep.dep_name,
              action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
            }
          ));
          setDepartments(data);
          seetFilteredDepartments(data);
        }
      }
    catch(error){
      if(error.response && !error.response.data.success)
        toast.error(error.response.data.error);
    }
    finally{
      setDepLoading(false);
    }
  }
  
  const onDepartmentDelete = async () => {
    fetchDepartments();
  };

  useEffect(()=>{
    fetchDepartments();
  },[]);

  const filterDepartments=(e)=>{
    const records=departments.filter((dep)=> 
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    seetFilteredDepartments(records);
  }

  return (<>
    <div className='p-5'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Departments</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input type="text" 
            placeholder='Search by dep name' 
            className='px-4 py-0.5'
            onChange={filterDepartments} />
            <Link to="/admin-dashboard/add-department" 
              className='px-4 py-1 bg-teal-600 rounded text-white' >
              Add new department</Link>
        </div>
      {depLoading ? <LoadingPage />:
        <div className='p-2 mt-4'>
          <DataTable
            columns={columns} data={filteredDepartments} pagination >
          </DataTable>
        </div>}
    </div>
  </>)
}
