import { useAuth } from '../context/auth.context'
import { Users } from 'lucide-react';

export const Navbar = () => {
    const {user, logout}=useAuth()
  return (
    <div className='fixed top-0 left-0 w-full h-16 shadow z-50 bg-teal-600 flex justify-between items-center text-white px-6'>
      <div className="flex items-center">
        <Users className="h-8 w-8 text-teal-300 mr-2" />
        <span className="text-xl font-bold text-gray-900">StaffSync</span>
      </div>
      <p className='text-xl '>Welcome, <b>{user.name}</b></p>
      <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800 rounded '
        onClick={logout}
        >Logout
      </button>
    </div>
  )
}
