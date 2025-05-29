import React from 'react'
import { EmployeeSidebar } from '../components/EmployeeSidebar'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { SummaryCard } from '../components/SummaryCard'

const EmployeeeDashboard = () => {
  return (<div className=''>
    <Navbar  />
    <div className='flex bg-gray-100 h-screen'>
      <EmployeeSidebar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>

  </div>) 
}

export default EmployeeeDashboard