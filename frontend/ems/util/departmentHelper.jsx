import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {toast} from 'react-toastify'

export const DepartmentButtons=({_id, onDepartmentDelete})=>{
    const navigate=useNavigate()
    const [depLoading, setDepLoading]=useState(false)

    const handleDelete=async (id)=>{
        const confirm=window.confirm("Do you want to delete?");
        if(confirm){
            try{
                const response=await axios.delete(`${import.meta.env.VITE_HOST}/api/department/${id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
                });
                if(response.data.success){
                    onDepartmentDelete();
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
    }
    
    return (
        <div className="flex space-x-3">
            <button 
                className="px-3 py-1 bg-teal-500 text-white rounded "
                onClick={()=>navigate(`/admin-dashboard/department/${_id}`)}
                >Edit</button>
            <button 
                className="px-3 py-1 bg-red-400 text-white rounded "
                onClick={()=>handleDelete(_id)}
                >Delete</button>
        </div>
    )
}