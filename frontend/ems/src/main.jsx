import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/auth.context.jsx'
createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </AuthContext>,
)
