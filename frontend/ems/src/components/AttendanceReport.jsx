import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import DataTable from 'react-data-table-component'
import { createColumns } from '../../util/attendanceHelper.jsx'
import {LoadingPage} from './LoadingPage.jsx'
import { ArrowLeft } from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const AttendanceReport = () => {
    const [reports, setReport]=useState([])
    const[loading, setLoading]=useState(false)
    const [searchBy, setSearchBy]=useState()
    const [filter, setFilter]=useState([])
    const navigate= useNavigate()

    useEffect(()=>{
      const fetchRecords=async()=>{
        setLoading(true);
        try {
          const response=await axios.get(import.meta.env.VITE_HOST+'/api/attendance/report',
            {
              headers: { 'Authorization' : `Bearer ${localStorage.getItem("token")}`}
            }
          );
              
          if(response.data.success){
            const grouped = {};
            response.data.attendance.forEach((item) => {
              if(!grouped[item.date]) 
                grouped[item.date] = [];
              grouped[item.date].push(item);
            });
            setReport(grouped);
            setFilter(grouped);
          }
        } catch (error) {
          // console.log(error)
          toast.error(error.message);
        }
        finally{
          setLoading(false);
        }
      }
      fetchRecords();
    }, []);
    
    function filterAttendance(e){
      if(searchBy=="date"){
        Object.keys(reports).map((date)=>{
          const dateStr=`${new Date(e.target.value).getDate()}/${new Date(e.target.value).getMonth()+1}/${new Date(e.target.value).getFullYear()}`;
          if(date === dateStr){
            const filteredReports={};
            filteredReports[date]=reports[date];
            setFilter(filteredReports);
          }
        })
      }
      else if(searchBy == 'empid'){
        const filteredReports = Object.entries(reports).reduce((acc, [date, arr]) => {
            acc[date] = arr.filter((emp) => 
              emp.empID?.employeeID.toLowerCase().includes(e.target.value.toLowerCase()));
            return acc;
          }, {});
        setFilter(filteredReports);
      }
    }

  return (
    <div className='overflow-auto'>
        <div className='font-bold text-2xl py-4 text-center'>
          <button  onClick={() => navigate(-1)}
            className=" fixed left-76  cursor-pointer p-1 rounded-full border border-gray-400 hover:bg-gray-300 "
            > <ArrowLeft />
          </button>
          <span>Previous Attendace Reports</span>
        </div>
        <div className='px-6'>
            <select name="searchBy" onChange={(e)=>setSearchBy(e.target.value)} className='border mx-2 w-[120px] rounded-[2px]'>
              <option value="">-Search By-</option>
              <option value="date">Date</option>
              <option value="empid">empID</option>
            </select>
            <input type={searchBy=="date" ? "date" : "text"} placeholder='Search here' name='search' onChange={filterAttendance} className='border px-1 rounded-[2px]' />
        </div>
        {loading ? <LoadingPage /> : Object.keys(filter).map((date) => (
        <div key={date} className="m-8 border p-4 rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-2 ml-4">{date}</h3>
        
          <DataTable
            columns={createColumns}
            data={Array.isArray(filter?.[date]) ? filter[date] : filter?.[date] ? [filter[date]] : []}
            pagination
            highlightOnHover
            // striped
            dense
          />
        </div>
      ))}
    </div>
  )
}

export default AttendanceReport