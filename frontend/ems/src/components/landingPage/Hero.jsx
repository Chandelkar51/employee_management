import React from 'react';
import Button from './Button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate=useNavigate()

  return (
    <div className="px-4 relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 md:right-20 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
              Employee Management Simplified
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
              The Smart Way to Manage Your Workforce
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
              Streamline HR processes, boost employee engagement, and make data-driven decisions with our comprehensive employee management system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button onClick={() => navigate('/registration')} className="w-full sm:w-auto">
                Get Started
              </Button>
              <Button variant="outline" onClick={() => navigate('/login')} className="w-full sm:w-auto">
                Login
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start">
              <a href="#demo" className="flex items-center text-teal-600 hover:text-teal-800 transition-colors">
                <span className="mr-2">See how it works</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="relative z-10 rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
                  alt="Employee management dashboard" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-teal-200 rounded-xl transform rotate-3 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;