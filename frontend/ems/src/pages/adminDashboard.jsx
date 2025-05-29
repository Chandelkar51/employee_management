import React, { useEffect } from 'react'
import { useAuth } from '../context/auth.context'
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { Navbar } from '../components/Navbar.jsx';

const AdminDashboard = () => {
  const {user, loading}=useAuth();
  const navigate=useNavigate()
  if(loading){
    return <div>Loading......</div>
  }
  if(!user){
    navigate('/login');
  }
  
  return (<div className=''>
    <Navbar  />
    <div className='flex bg-gray-100 h-screen'>
      <AdminSidebar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  </div>) 
}

export default AdminDashboard;