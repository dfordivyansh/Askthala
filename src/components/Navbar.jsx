import React, { useState, useEffect } from 'react';
import { Menu, X, Trophy, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect to handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'BETTING SITES', path: '/sites' },
    { name: 'BETTING APPS', path: '/apps' },
    { name: 'BETTING TIPS', path: '/tips' },
    { name: 'BLOGS', path: '/blog' },
    { name: 'COMPLAINTS', path: '/complain' }
  ];

  // Helper to get display name
  const getUserName = () => {
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
          ? 'bg-white/90 backdrop-blur-md border-gray-200 shadow-md'
          : 'bg-white border-transparent shadow-sm'
        }`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 cursor-pointer pt-3">
            <img src="/logo.png" alt="Cricket Logo" className="h-40 w-auto cursor-pointer" />
          </Link>


          {/* Desktop Menu & Login */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Links */}
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group text-slate-600 px-1 py-2 text-sm font-bold tracking-wide transition-colors duration-300 hover:text-[#0066cc]"
                >
                  {link.name}
                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00E5FF] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Desktop Login/User State */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[#0a192f]">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0a192f]">
                    <User size={16} />
                  </div>
                  <span className="font-bold text-sm hidden lg:block text-slate-700 uppercase">
                    {getUserName()}
                  </span>
                </div>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-lg font-bold hover:bg-slate-50 hover:text-red-500 hover:border-red-200 transition-all duration-300 shadow-sm"
                >
                  <LogOut size={16} />
                  <span>LOGOUT</span>
                </button>
              </div>
            ) : (
              <Link
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#00E5FF] hover:text-[#0a192f] transition-all duration-300 shadow-lg shadow-blue-900/10 hover:shadow-cyan-400/20"
              >
                <User size={18} strokeWidth={2.5} />
                <span>LOGIN</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-[#00E5FF] hover:bg-slate-50 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 transition-all duration-300 ease-in-out overflow-hidden shadow-lg ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-3 rounded-lg text-base font-bold text-slate-700 hover:text-[#0a192f] hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-100"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Login Button Section */}
          <div className="pt-4 mt-2 border-t border-slate-100">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-3 text-slate-800">
                  <User size={20} className="text-[#0a192f]" />
                  <span className="font-bold uppercase">{getUserName()}</span>
                </div>
                <button
                  onClick={() => { onLogout(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-lg text-base font-bold bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all duration-200"
                >
                  <LogOut size={18} />
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                onClick={() => { onLoginClick(); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-lg text-base font-bold bg-[#0a192f] text-white border border-transparent hover:bg-[#00E5FF] hover:text-[#0a192f] transition-all duration-200 shadow-md"
              >
                <User size={18} />
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;