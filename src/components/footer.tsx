import React from 'react';
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2540] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Think Success Logo" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold">Think Success Consulting</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering Analysts to Excel
            </p>
            <p className="text-sm text-gray-400">
              Specialized consultancy helping Business and Data Analysts secure their dream careers through comprehensive support and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#008080] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-300 hover:text-[#008080] transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#008080] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[#008080] transition-colors">
                  Our Services
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Application Strategy</li>
              <li>Resume & LinkedIn Makeover</li>
              <li>Interview Assistance</li>
              <li>Verification Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <Mail size={16} className="text-[#008080] mt-1" />
                <div>
                  <p>thinksuccessITconsultants@gmail.com</p>
                  <p className="text-sm text-gray-400">We respond within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone size={16} className="text-[#008080] mt-1" />
                <div>
                  <p>+91 80084 38080</p>
                  <p className="text-sm text-gray-400">Mon–Fri, 9:00 AM – 6:00 PM (IST)</p>
                  <p className="text-sm text-gray-400">US hours available on request</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-[#008080] mt-1" />
                <div>
                  <p>North Carolina (USA) </p>
                  <p>Chicago (USA) </p>
                  <p>Hyderabad (India)</p>
                  <p className="text-sm text-gray-400">By appointment only</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock size={16} className="text-[#008080] mt-1" />
                <div>
                  <p>Monday – Friday</p>
                  <p className="text-sm text-gray-400">9:00 AM – 6:00 PM (IST)</p>
                  <p className="text-sm text-gray-400">US availability by appointment (EST/CDT)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Think Success Consulting. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#008080] transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#008080] transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#008080] transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
