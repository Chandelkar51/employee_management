import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/auth.context.jsx'
import {Bounce, ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
    <ToastContainer
      position='bottom-right' 
      hideProgressBar={false}
      rtl={false}
      theme="light"
      transition={Bounce}
      newestOnTop
      autoClose={3000}
    />
  </AuthContext>,
)
