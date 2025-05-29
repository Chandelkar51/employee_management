import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import Hero from '../components/landingPage/Hero';
import Features from '../components/landingPage/Features';
import Footer from '../components/landingPage/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const LandingPage = () => {
  const {user, loading}=useAuth();
  const navigate=useNavigate()
  if(loading){
    return <div>Loading......</div>
  }
  if(!user);
  else if(user.role==="employee"){
    navigate('/employee-dashboard');
  }
  else if(user.role==="admin"){
    navigate('/admin-dashboard');
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;