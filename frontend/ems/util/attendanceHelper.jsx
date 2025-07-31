import axios from "axios"
import {toast} from 'react-toastify'

export const columns=[
  {
    name: "S No.",
    selector: (row)=>row.sno,
    width: "70px"  
  },
  {
    name: "Emp ID",
    selector: (row)=>row.empID,
    sortable: true,
    widht: "30px",
  },
  {
    name: "Name",
    selector: (row)=>row.name,
    widht: "40px"
  },
  {
    name: "Department",
    selector: (row)=>row.dep_name,
    sortable: true,
    widht: "40px",
    // center: true
  },
  {
    name: "Action",
    selector: (row)=>row.action,
    widht:"200px",
    center: true
  },
]

export const Buttons = ({details, onChange}) => {

  const mark=async(status)=>{
    try {
      const attend={
        ID: details._id,
        status: status
        }
      const response=await axios.post(import.meta.env.VITE_HOST+'/api/attendance/mark', attend,
        {
          headers:{"AuthoriZation": `Bearer ${localStorage.getItem("token")}`}
        });
      
      if(response.data.success){
        // console.log("attendance marked")
        onChange(response.data.newAttendance);
      }
    } catch (error) {
        // console.log(error)
        toast.error(error.response.data.error);
    }
  }
  
  return (
    details.status ? (
      <span
        className={`font-semibold text-[16px] ${
          details.status === "Present"
            ? "text-green-700"
            : details.status === "Absent"
            ? "text-red-600"
            : details.status === "Late"
            ? "text-green-400"
            : "text-yellow-600"
        }`}
      >
        {details.status}
      </span>
    ) : (
      <div className="flex space-x-2">
        <button 
          className="px-2 py-1 bg-green-700 text-white rounded "
          onClick={()=>mark("Present")}
          >Present
        </button>
        <button 
          className="px-2 py-1 bg-red-600 text-white rounded "
          onClick={()=>mark("Absent")}
          >Absent
        </button>
        <button 
          className="px-2 py-1 bg-yellow-600 text-white rounded "
          onClick={()=>mark("Leave")}
          >Leave
        </button>
        <button 
          className="px-2 py-1 bg-green-400 text-white rounded "
          onClick={()=>mark("Late")}
          >Late/HD
        </button>
      </div>
    )
  )
}

export const createColumns =[
  { name: "S No",
    selector: (row, index) => index + 1,
    width: "80px"
  },
  { name: "Emp ID",
    selector: (row) => row.empID?.employeeID,
    sortable: true
  },
  { name: "Name",
    selector: (row) => row.empID?.userId?.name,
    sortable: true
  },
  { name: "Department",
    selector: (row) => row.empID?.department?.dep_name,
    sortable: true
  },
  {name: "Status",
    cell: (row) => (
      <span
        className={`font-semibold text-[16px] ${
          row.status === "Present"
            ? "text-green-700"
            : row.status === "Absent"
            ? "text-red-600"
            : row.status === "Late"
            ? "text-green-400"
            : "text-yellow-600"
        }`}
      >
        {row.status? row.status : '-'}
      </span>
    ),
    sortable: true,
  },
]
