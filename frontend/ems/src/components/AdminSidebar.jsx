import { NavLink } from 'react-router-dom'

export const AdminSidebar = () => {
  return (
    <div className='p-4 fixed top-16 left-0 w-64 h-screen bg-gray-800 text-white shadow z-40' >
        <NavLink to="/admin-dashboard" 
            className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}
            end >
            <i class="fa-solid fa-gauge-high"></i>
            <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" 
            className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
            <i class="fa-solid fa-building"></i>
            <span>Department</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employee" 
            className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
            <i class="fa-solid fa-users"></i>
            <span>Employee</span>
        </NavLink>

        <NavLink to="/admin-dashboard/attendance" 
            className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`} >
            <i class="fa-solid fa-user-check"></i>
            <span>Attendance</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leave" 
            className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
            <i class="fa-solid fa-calendar-days"></i>
            <span>Leave</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary/add" 
            className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
            <i class="fa-solid fa-money-bill-wave"></i>
            <span>Salary</span>
        </NavLink>
            
        <NavLink to="/admin-dashboard/setting" 
            className={({isActive})=>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
            <i class="fa-solid fa-gear"></i>
            <span>Settings</span>
        </NavLink>
    </div>
  )
}
