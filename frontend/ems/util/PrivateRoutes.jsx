import React, { useState } from 'react'
import { useAuth } from '../src/context/auth.context'
import { Navigate } from 'react-router-dom'
import { LoadingPage } from '../src/components/LoadingPage'

const PrivateRoutes = ({children}) => {
    const {user, loading}=useAuth()
    if(loading){
        return <LoadingPage />
    }
  return user ? children : <Navigate to="/" />
}

export default PrivateRoutes