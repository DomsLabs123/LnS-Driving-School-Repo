import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '@/assets/logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdownToggle = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const menuItems = [
    {
      name: 'Our Courses',
      dropdown: [
        { name: 'Practical Driving Course (PDC)', to: '/course-pdc' },
        { name: 'Theoretical Driving Course (TDC)', to: '/course-tdc' },
        { name: 'Motorcycle Riding Course (MDC)', to: '/course-mdc' },
        { name: 'Refresher Course', to: '/course-refresher' },
      ],
    },
    { name: 'Testimonials', to: '/' },
    { name: 'Contact Us', to: '/' },
    { name: 'About Us', to: '/' },
  ];

  return (
    <nav className="bg-slate-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          L & S Driving School
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group font-semibold z-50">
              {!item.dropdown ? (
                <Link
                  to={item.to}
                  className="text-white hover:text-yellow-300 transition"
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <button className="text-white hover:text-yellow-300 flex items-center transition">
                    {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute left-12 mt-2 w-[15rem] bg-white font-normal rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.dropdown.map((dropdownItem, i) => (
                      <Link
                        key={i}
                        to={dropdownItem.to}
                        className="block px-5 py-4 text-gray-800 hover:bg-gray-200 rounded-lg"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Login button (desktop) */}
          <Link
  to="/login-credentials"
  className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition"
>
  Login
</Link>

        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 bg-blue-500">
            {menuItems.map((item, index) => (
              <div key={index}>
                {!item.dropdown ? (
                  <Link
                    to={item.to}
                    className="block px-4 py-2 text-white hover:bg-blue-700"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className="w-full text-left px-4 py-2 text-white hover:bg-blue-700 flex justify-between"
                    >
                      {item.name} <ChevronDown />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="bg-blue-700">
                        {item.dropdown.map((dropdownItem, i) => (
                          <Link
                            key={i}
                            to={dropdownItem.to}
                            className="block px-4 py-2 text-white hover:bg-blue-800"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Login button (mobile) */}
            <Link
              to="/login-credentials"
              className="block px-4 py-2 text-white hover:bg-blue-700"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
