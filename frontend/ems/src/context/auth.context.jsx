import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
const UserContext=createContext();

const AuthContext = ({children}) => {
  const [user, setUser]=useState(null)
  const [loading, setLoading]=useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const verifyUser=async()=>{
      try{
        const token=localStorage.getItem('token');
        if(token){
          const response=await axios.post(import.meta.env.VITE_HOST+"/api/auth/verify",{},
            {headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if(response.data.success){
            setUser(response.data.user)
          }
        }
        else{
          setUser(null);
          setLoading(false);
        }
      }catch(error){
        if(error.response && !error.response.data.success){
          setError(error.response.data.error);
          setUser(null);
        }
      }
      finally{
        setLoading(false);
      }
    }
    verifyUser();
  },[]);

  const login=(user)=>{
    setUser(user);
  }
  
  const logout=()=>{
    setUser(null);
    localStorage.removeItem("token");
    alert("You Loged Out")
  }
  
  return (
    <UserContext.Provider value={{user, login, logout, loading}}>
        {children}
    </UserContext.Provider>
  )
}
export const useAuth=()=>useContext(UserContext);
export default AuthContext;