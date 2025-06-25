import React from 'react'
import { useAuth } from '../src/context/auth.context'
import { Navigate } from 'react-router-dom';
import { LoadingPage } from '../src/components/LoadingPage';

const RoleBaseRoute = ({children, requiredrole}) => {
    const {user, loading}=useAuth()
    if(loading){
        return <LoadingPage />
    }

    if(!requiredrole.includes(user.role)){
        <Navigate to="/unauthorized" />
    }
  return user ? children : <Navigate to="/login" />
}

export default RoleBaseRoute