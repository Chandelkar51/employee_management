
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
// import {Link} from 'react-router-dom'
import { columns, LeaveButtons } from '../../util/leaveHelper';

export const LeaveMange = () => {
  const [leave, setLeave]= useState([]);
  const [filters, setFilter]=useState([]);

  useEffect(()=>{
    const fetchLeves= async()=>{ 
      try{
        const response=await axios.get(import.meta.env.VITE_HOST+'/api/leave',
          {
            headers: {Authorization:` Bearer ${localStorage.getItem("token")}`},
          }
        );
        
        if(response.data.success){
          const info=await response.data.leaves.map((leaves, index)=>({
            _id:leaves._id,
            sno: index+1,
            employeeID: leaves.employeeID?.employeeID,
            name: leaves.employeeID?.userId.name,
            leaveType: leaves.leaveType,
            department: leaves.employeeID?.department?.dep_name,
            days: new Date(leaves.endDate).getDate() - new Date(leaves.startDate).getDate(), // it will be negative in some case.
            status: leaves.status,
            action: <LeaveButtons id={leaves._id} />,

          }));
          
          setLeave(info);
          setFilter(info);
        }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }
    }
    fetchLeves();
  },[])
  
  const handleFilter=(e)=>{
    const data= leave.filter(leaves=>leaves
      .imployeeID.toLowerCase()
      .includes(e.target.value.toLowerCase())
    );
    console.log(data)
    setFilter(data);
  }

  const filterByStatus=(status)=>{
    const data=leave.filter((leaves)=> leaves.status.toLowerCase()
      .includes(status.toLowerCase())
    );
    setFilter(data);
  }

  return (
    <div>
      <div className='text-center my-2'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center mx-4'>
        <input type="text" 
          placeholder='Search by ImpID' 
          onChange={handleFilter}
          className='px-4 py-0.5 border'
        />
        <div>
          <button 
            className='rounded px-2 mx-2 bg-yellow-600 text-white hover:bg-teal-700 '
            onClick={()=>filterByStatus("pending")}
            >Pending
          </button>
          <button 
            className='rounded px-2 mx-2 bg-green-600 text-white hover:bg-teal-700 '
            onClick={()=>filterByStatus("approved")}
            >Approved
          </button>
          <button 
            className='rounded px-2 mx-2 bg-red-600 text-white hover:bg-teal-700 '
            onClick={()=>filterByStatus("rejected")}
            >Rejected
          </button>

        </div>
      </div>
      {!leave? <div>Loadding....</div> :(
      <div className='mt-6 p-4'>
        <DataTable 
          columns={columns} data={filters} >
        </DataTable>
      </div>
      )}
    </div>
  )
}
