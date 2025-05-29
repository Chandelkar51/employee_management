import { useState } from "react"
import { useAuth } from "../context/auth.context"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Setting= ()=>{
    const {user}=useAuth()
    const [setting, setSetting]=useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [error, setError]=useState(null)
    const navigate= useNavigate();
    
    const handleChange = (e)=>{
        const {name, value}=e.target;
        setSetting({...setting, [name]: value});
    }
    
    const handelSubmit = async(e)=>{
        try{
            e.preventDefault();
            if(setting.newPassword !== setting.confirmPassword){
                setError("Password is not matched!");
            }
            else{
                const response= await axios.put(import.meta.env.VITE_HOST+'/api/setting/change-password',
                    setting,
                    {
                        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
                    }
                );

                if(response.data.success){
                    alert("Password updated")
                    navigate('/employee-dashboard');
                    setError(null);
                }
            }
        }
        catch(error){
            if(error.response && !error.response.data.success)
                alert(error.response.data.error);
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-5">Change Password</h2>
            <p className="text-red-500 mb-2">{error}</p>
            <form onSubmit={handelSubmit}>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Old Password
                    </label>
                    <input type="password"
                        name="oldPassword"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input type="password"
                        name="newPassword"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required />
                </div>
                <button type="submit"
                    className="w-full mt-6 bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
                    Change Password
                </button>
            </form>
        </div>
    )
}