import { useState } from 'react'
import { Link } from 'react-router-dom'
import {columns, Buttons} from '../../util/attendanceHelper'
import DataTable from 'react-data-table-component'
import { useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { LoadingPage } from './LoadingPage'

export const Attendance = () => {
    const [empDetail, setEmpDetails]=useState([]);
    const [loading, setLoading]=useState(false);
    const [filter, setFiltere]=useState([]);
    const [refresh, setRefresh]=useState([]);
    
    useEffect(()=>{
        const fetchEmployee=async()=>{
            setLoading(true);
            try{
                const response=await axios.get(import.meta.env.VITE_HOST+`/api/attendance/`,
                    {
                        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
                    });
                
                if(response.data.success){
                    const info=response.data.attendance.map((attend, index)=>(
                        {
                            sno : index+1,
                            empID : attend.empID.employeeID,
                            name : attend.empID?.userId?.name,
                            dep_name : attend.empID.department?.dep_name,
                            action : (<Buttons details={attend} onChange={changed}/>)
                        }
                    ));
                    setEmpDetails(info);
                    setFiltere(info);
                }
            }
            catch(error){
                console.log(error);
                toast.error(error.response.data.error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchEmployee();
    },[refresh]); //Display employee details

    function changed(attend){ setRefresh(attend); } // Attendance marked

    const filterEmp=(e)=>{
        const records=empDetail.filter((emp)=> 
            emp.empID.toLowerCase().includes(e.target.value.toLowerCase()))
        setFiltere(records);
    } //Search by empID

    const date= Date.now();
    const days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  return (
    <div>
        <div className='text-center'>
            <h2 className='text-2xl font-bold p-2'>Manage Attendance</h2>
            <p className='text-xl font-medium '>{new Date(date).getDate()}-{month[new Date(date).getMonth()]}-{new Date(date).getFullYear()} <strong>,</strong>&nbsp; {days[(new Date(date)).getDay()]} </p>
        </div>
        <div className='flex justify-between items-center px-12'>
            <input type="text" 
             placeholder='Search by EmpID' 
             className='px-4 py-0.5 border rounded'
            onChange={filterEmp}
            />
            <Link to="/admin-dashboard/attendance/report" 
              className='px-4 py-1 bg-teal-600 rounded text-white' >
              Attendance Report</Link>
        </div>
        {loading ? <LoadingPage /> :
            <div className='p-2 mx-6'>
                <DataTable 
                    columns={columns} data={filter} 
                    pagination 
                    highlightOnHover >
                </DataTable>
            </div>
        }
    </div>
  )
}
