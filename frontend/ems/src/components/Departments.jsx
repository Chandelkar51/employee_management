import { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { DepartmentButtons } from '../../util/departmentHelper.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { LoadingPage } from './LoadingPage.jsx'
import {UserIcon} from 'lucide-react'

export const Departments = () => {
  const [departments, setDepartments]=useState([])
  const [depLoading, setDepLoading]=useState(false)
  const [filteredDep, setFilteredDepartments]=useState([])

  const fetchDepartments=async ()=>{
    setDepLoading(true);
    try{
      const response=await axios.get(import.meta.env.VITE_HOST+'/api/department',
        {
          headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
        });
        if(response.data.success){
          setDepartments(response.data.departments);
          setFilteredDepartments(response.data.departments);
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
    setFilteredDepartments(records);
  }

return (<>
    <div className='p-5'>
      <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" 
          placeholder='Search by dep name' 
          className='px-4 py-0.5 border rounded'
          onChange={filterDepartments} />
        <Link to="/admin-dashboard/add-department" 
          className='px-4 py-1 bg-teal-600 rounded text-white' >
          Add new department</Link>
      </div>
      {depLoading ? <LoadingPage />: <div className='flex flex-wrap justify-around py-2'>
        {filteredDep.map((dep, index)=>(
          <div key={index} className="bg-gray-200 w-1/4 rounded-xl mx-4 my-2 p-4 shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1  duration-300 cursor-pointer border border-transparent hover:border-cyan-500/50 ">
            <div>
              <h3 className="text-xl font-bold text-black">{dep.dep_name} <span className='font-medium'>Department</span></h3>
              <p className="text-gray-600 mb-4 pt-2 text-sm leading-relaxed min-h-[100px]">
                {dep.description}
              </p>  
            </div>
            <div className="flex items-center text-gray-900 text-sm mb-4">
              <UserIcon />
              <span className="px-2">
                <span className='text-lg'>{dep.count}</span> Employees
              </span>
            </div>
            <div className=' pt-2'>
              <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
            </div>
          </div>)
        )}</div>}
    </div>
  </>)
}
