import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth.context'
export const EmployeeSidebar = () => {
    const {user}= useAuth()

  return (
    <div className='bg-gray-800 text-white pt-3 space-y-2 h-screen w-64'>
        <div className='px-4'>
            <NavLink to="/employee-dashboard" 
                className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end >
                <i class="fa-solid fa-gauge-high"></i>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/employee/${user._id}`} 
                className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
                <i class="fa-solid fa-user"></i>
                <span>Profile</span>
            </NavLink>
            <NavLink to="/employee-dashboard/leave" 
                className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
                <i class="fa-solid fa-calendar-days"></i>
                <span>Leave</span>
            </NavLink>
            <NavLink to="/employee-dashboard/salary" 
                className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
                <i class="fa-solid fa-money-bill-wave"></i>
                <span>Salary</span>
            </NavLink>
            <NavLink to="/employee-dashboard/setting" 
                className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
            </NavLink>
        </div>
    </div>
  )
}
