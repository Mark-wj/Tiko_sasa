import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  // State to track if the mobile menu is open
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu open/close
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the mobile menu (useful when a link is clicked)
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="top-0 py-1 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
      <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <button>
              <div className="flex items-center space-x-2">
                <h2 className="text-black dark:text-white font-bold text-2xl">
                  🎟️Tiko Sasa
                </h2>
              </div>
            </button>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <Link to="/events">Events</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <Link to="/hotels">Hotels</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="flex items-center justify-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-slate-200 dark:text-white"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="text-2xl text-slate-800 dark:text-white focus:outline-none active:scale-110 active:text-red-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu (conditionally rendered) */}
        {isOpen && (
          <div className="mt-2 lg:hidden">
            <ul className="flex flex-col space-y-2 text-base font-bold text-black/60 dark:text-white">
              <li className="hover:underline hover:underline-offset-4">
                <Link to="/events" onClick={closeMenu}>
                  Events
                </Link>
              </li>
              <li className="hover:underline hover:underline-offset-4">
                <Link to="/movies" onClick={closeMenu}>
                  Movies
                </Link>
              </li>
              <li className="hover:underline hover:underline-offset-4">
                <Link to="/hotels" onClick={closeMenu}>
                  Hotels
                </Link>
              </li>
              <li className="hover:underline hover:underline-offset-4">
                <Link to="/contact" onClick={closeMenu}>
                  Contact
                </Link>
              </li>
              {/* Mobile auth buttons (shown only if not logged in) */}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
