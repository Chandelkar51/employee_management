import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns=[
    {
        name: "S No.",
        selector: (row)=>row.sno
    },
    {
        name: "Employee ID",
        selector: (row)=>row.employeeID
    },
    {
        name: "Name",
        selector: (row)=>row.name,
        sortable: true,
    },
    {
        name: "Leave Type",
        selector: (row)=>row.leaveType
    },
    {
        name: "Days",
        selector: (row)=>row.days,
        sortable: true,
    },
    {
        name: "Department",
        selector: (row)=>row.department
    },
    {
        name: "Status",
        selector: (row)=>row.status
    },
    {
        name: "Action",
        selector: (row)=>row.action
    },
]

export const LeaveButtons=({id})=>{
    const navigate=useNavigate() 
    
    return (
        <div className="flex space-x-3">
            <button 
                className="px-3 py-1 bg-teal-600 text-white rounded "
                onClick={()=>(
                    navigate(`/admin-dashboard/leave/${id}`))}
                >View
            </button>
            
        </div>
    )
}

