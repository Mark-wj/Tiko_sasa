import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiLinkedin, FiYoutube, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-24">
          {/* About Section */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">🎟️ Tiko Sasa</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Your all-in-one platform for events, movies, and hotel bookings. 
              Discover experiences and plan your perfect getaway with ease.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="p-2 md:p-3 bg-teal-600/20 rounded-full">
                  <FiPhone className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400">Phone</p>
                  <p className="font-medium text-sm md:text-base">+254-769-992344</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="p-2 md:p-3 bg-teal-600/20 rounded-full">
                  <FiMail className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400">Email</p>
                  <p className="font-medium text-sm md:text-base">info@tikosasa.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-base md:text-lg font-semibold text-white">Services</h4>
              <ul className="space-y-2 md:space-y-3">
                <li><a href="#" className="hover:text-teal-400 transition-colors text-sm md:text-base">Events</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors text-sm md:text-base">Movies</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors text-sm md:text-base">Hotels</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors text-sm md:text-base">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-base md:text-lg font-semibold text-white">Support</h4>
              <ul className="space-y-2 md:space-y-3">
                <li><a href="#" className="hover:text-teal-400 transition-colors text-sm md:text-base">FAQ</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors text-sm md:text-base">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors text-sm md:text-base">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors text-sm md:text-base">Security</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-base md:text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-gray-400 text-sm md:text-base">
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <form className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-gray-800 rounded-full px-4 py-2 md:px-6 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" 
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-2 md:py-3 rounded-full hover:shadow-lg transition-all text-sm md:text-base whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            {/* Social Links */}
            <div className="flex justify-center sm:justify-start space-x-3 md:space-x-4 pt-3 md:pt-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition-colors">
                <FiFacebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition-colors">
                <FiLinkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition-colors">
                <FiYoutube className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition-colors">
                <FiInstagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-3 md:space-y-0">
            <p className="text-xs md:text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Tiko Sasa. All rights reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <a href="#" className="hover:text-teal-400 transition-colors text-xs md:text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-teal-400 transition-colors text-xs md:text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;