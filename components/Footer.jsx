import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, ShieldCheck, ArrowRight, Send, Users } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-200 relative overflow-hidden">

      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Brand Column (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            <Link to="/" className="flex-shrink-0 cursor-pointer -mt-12">
              <img src="/logo.png" alt="Cricket Logo" className="h-40 w-auto cursor-pointer" />
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed max-w-md -mt-12">
              We cover all aspects of online betting in depth on our website to make
              you a well-informed bettor. Be sure to read all of our guidance to fully
              understand the rules, risks, and how to bet responsibly.
            </p>

            {/* 18+ Badge */}

          </div>

          {/* Navigation Column (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-gray-900 text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-sm"></span> Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Betting Sites', 'Betting Apps', 'Betting Tips'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="group flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Social Column (Spans 4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-gray-900 text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-sm"></span> Support & Connect
            </h3>

            <ul className="space-y-3 mb-8">
              {['Contact Us', 'News', 'Write For Us'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="group flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1BnSa246sC/" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://t.me/AskThala" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <Send size={18} />
              </a>
              <a href="https://t.me/AskThalaKing" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <Users size={18} />
              </a>
              <a href="https://whatsapp.com/channel/0029VbBVMw842DcXEKIdYm1n" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-center text-gray-500">
            Copyright © {currentYear} AskThala. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;