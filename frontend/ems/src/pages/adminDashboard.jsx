import { useAuth } from '../context/auth.context'
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { LoadingPage } from '../components/LoadingPage.jsx';

const AdminDashboard = () => {
  const {user, loading}=useAuth();
  const navigate=useNavigate()
  if(loading){
    return <LoadingPage />
  }
  if(!user){
    navigate('/login');
  }
  
  return (<div className='bg-gray-100 min-h-screen'>
      <Navbar  />
      <AdminSidebar />
      <div className='ml-64 pt-14 p-4'>
        <Outlet />
      </div>
  </div>) 
}

export default AdminDashboard;