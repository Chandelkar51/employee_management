import React from 'react'
import { useAuth } from '../context/auth.context'
import { Users } from 'lucide-react';

export const Navbar = () => {
    const {user, logout}=useAuth()
  return (
    <div className='flex justify-between items-center h-12 w-full text-white bg-teal-600 px-6'>
      <div className="flex items-center">
            <Users className="h-8 w-8 text-teal-300 mr-2" />
            <span className="text-xl font-bold text-gray-900">StaffSync</span>
          </div>
        <p className='text-xl '>Welcome, <b>{user.name}</b></p>
        <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800 rounded '
          onClick={logout}
        >Logout</button>
    </div>
  )
}
