import axios from "axios";
import { useNavigate } from "react-router-dom";


export const fetchDepartments=async ()=>{
    let department;
    try{
      const response=await axios.get(import.meta.env.VITE_HOST+'/api/department',
        {
          headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
        });
        if(response.data.success){
          department=response.data.departments
        }
      }
    catch(error){
      if(error.response && !error.response.data.success)
        alert(error.response.data.error);
    }
    return department;
}

export const columns=[
  {
    name: "S No.",
    selector: (row)=>row.sno,
    width: "70px"  
  },
  {
    name: "Name",
    selector: (row)=>row.name,
    sortable: true,
    widht: "60px"
  },
  {
    name: "DOB",
    selector: (row)=>row.dob,
    sortable: true,
    widht: "50px",
    center: true
  },
  {
    name: "Department Name",
    selector: (row)=>row.dep_name,
    widht: "70px",
    center: true
  },
  {
      name: "Action",
      selector: (row)=>row.action,
      center: true
  },
]

export const EmployeeButtons = ({_id}) => {
  const navigate=useNavigate()
  return (
    <div className="flex space-x-3">
      <button 
        className="px-3 py-1 bg-teal-600 text-white rounded "
        onClick={()=>navigate(`/admin-dashboard/employee/${_id}`)}
        >View
      </button>
      <button 
        className="px-3 py-1 bg-yellow-600 text-white rounded "
        onClick={()=>navigate(`/admin-dashboard/employee/edit/${_id}`)}
        >Edit
      </button>
      <button 
        className="px-3 py-1 bg-green-600 text-white rounded "
        onClick={()=>{navigate(`/admin-dashboard/employee/salary/${_id}`)}}
        >Salary
      </button>
      <button 
        className="px-3 py-1 bg-yellow-700 text-white rounded "
        onClick={()=>navigate(`/admin-dashboard/employee/leave/${_id}`)}
        >Leave
      </button>
      {/* <button 
        className="px-3 py-1 bg-red-600 text-white rounded "
        onClick={()=>handleDelete(_id)}
      >Delete</button> */}
    </div>
  )
}

export const fetchEmployees=async (id)=>{
  let employee;
  try{
    const response = await axios.get(`${import.meta.env.VITE_HOST}/api/employee/department/${id}`, // common for both department and leave.
      {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
      });
      if(response.data.success){
        employee = response.data.employee;
      }
    }
  catch(error){
    if(error.response && !error.response.data.success)
      alert(error.response.data.error);
  }
  return employee;
}
