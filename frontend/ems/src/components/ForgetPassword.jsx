import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

export const FrorgetPassword=()=>{
    const [forget, setForget]=useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [error, setError]=useState(null)

    const handelSubmit = async(e)=>{
        try{
            e.preventDefault();
            if(forget.newPassword !== forget.confirmPassword){
                setError("Password is not matched!");
            }
            else{
                setError(null);
                const response= await axios.put(import.meta.env.VITE_HOST+'/api/auth/forget-password',
                    forget,
                    {
                        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
                    }
                );
                
                if(response.data.success){
                    toast.info("Password updated")
                    navigate('/employee-dashboard');
                    setError(null);
                }
            }
        }
        catch(error){
            if(error.response && !error.response.data.success)
                toast.error(error.response.data.error);
        }
    }
    const handleChange=async(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setForget({...forget, [name]:value})
    }

    return(
        <div className="max-w-3xl mx-auto mt-14 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-5">Change Password</h2>
            <p className="text-red-500 mb-2">{error}</p>
            <form onSubmit={handelSubmit}>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input type="email"
                        name="email"
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