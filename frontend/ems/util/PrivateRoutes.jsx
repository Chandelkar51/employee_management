import React, { useState } from 'react'
import { useAuth } from '../src/context/auth.context'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {user, loading}=useAuth()
    if(loading){
        return <div>Loading.....</div>
    }
  return user ? children : <Navigate to="/" />
}

export default PrivateRoutes