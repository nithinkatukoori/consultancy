import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/success-stories', label: 'Success Stories' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-4' : 'bg-white/95 backdrop-blur-sm py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-[#0A2540] to-[#008080] rounded-lg group-hover:scale-105 transition-transform">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#333333]">Think Success Consultancy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[#333333] hover:text-[#008080] font-medium transition-colors relative ${
                  location.pathname === item.path ? 'text-[#008080]' : ''
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#008080] rounded-full"></div>
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-[#008080] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006666] transition-colors hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Hired Faster
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#333333] hover:text-[#008080] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[#333333] hover:text-[#008080] font-medium transition-colors ${
                    location.pathname === item.path ? 'text-[#008080]' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-[#008080] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006666] transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Hired Faster
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;