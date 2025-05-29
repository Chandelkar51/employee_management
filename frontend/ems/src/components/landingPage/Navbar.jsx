import React, { useState, useEffect } from 'react';
import { Menu, X, Users } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-teal-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">StaffSync</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-teal-600 transition-colors">Features</a>
            <a href="#faq" className="text-gray-700 hover:text-teal-600 transition-colors">FAQ</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/registration')}>
              Register
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-full left-0 right-0">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-teal-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            {/* <a 
              href="#testimonials" 
              className="text-gray-700 hover:text-teal-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a> */}
            <a 
              href="#faq" 
              className="text-gray-700 hover:text-teal-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" onClick={() => console.log('Login clicked')} className="w-full">
                Login
              </Button>
              <Button onClick={() => console.log('Register clicked')} className="w-full">
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;