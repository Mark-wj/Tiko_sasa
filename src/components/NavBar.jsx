import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiCalendar, FiFilm, FiHome, FiMail } from "react-icons/fi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: "/events", text: "Events", icon: <FiCalendar className="mr-2" /> },
    { to: "/movies", text: "Movies", icon: <FiFilm className="mr-2" /> },
    { to: "/hotels", text: "Hotels", icon: <FiHome className="mr-2" /> },
    { to: "/contact", text: "Contact", icon: <FiMail className="mr-2" /> },
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-rose-500 to-indigo-500 shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <span className="text-white text-2xl font-bold tracking-tight">
              🎟️ Tiko Sasa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
            <div className="flex space-x-4 ml-4">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-shadow"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
          <div className="bg-white h-full w-3/4 max-w-sm ml-auto p-6 transform transition-transform">
            <div className="flex flex-col h-full">
              <div className="flex justify-end mb-8">
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg flex items-center text-lg"
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;