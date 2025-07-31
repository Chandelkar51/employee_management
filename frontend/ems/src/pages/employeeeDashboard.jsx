import { EmployeeSidebar } from '../components/EmployeeSidebar'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const EmployeeeDashboard = () => {
  return (<div className='bg-gray-100 min-h-screen'>
    <Navbar  />
    <EmployeeSidebar />
    <div className='ml-64 pt-14 p-4'>
      <Outlet />
    </div>
  </div>) 
}

export default EmployeeeDashboard