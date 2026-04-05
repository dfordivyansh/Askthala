import React from 'react';
import { Home, ChevronRight, Smartphone, Zap, ShieldCheck, Wifi } from 'lucide-react';

const BettingAppHero = () => {
  return (
    <section className="relative bg-white pt-32 pb-16 md:pt-30 md:pb-24 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-100 opacity-60 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-50 opacity-60 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm text-gray-500 mb-10">
          <a href="/" className="flex items-center hover:text-blue-600 transition-colors duration-200">
            <Home size={16} className="mr-2" /> 
            Home
          </a>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
            Betting Apps
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Text Content */}
          <div className="text-left">
            

            <h1 className="text-4xl md:text-4xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Best Online Casino Apps Worldwide <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-3xl md:text-5xl">
                Anytime Access
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              Across the globe, mobile casino apps have transformed how players enjoy online gaming. With smooth performance, quick transactions, and easy access to casino games, these apps allow users to play conveniently anytime, anywhere—directly from their smartphones.
            </p>

          </div>

          {/* Right Column: Image Presentation */}
          <div className="text-center relative group">
            
            {/* Glowing Backlight behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-200 opacity-40 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative transform transition-transform duration-700 hover:scale-105 z-10">
              <img 
                src="/apps.png" 
                alt="Top Cricket Betting Apps in India" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-200 relative" 
              />

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 md:right-10 bg-white border border-blue-100 p-4 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 animate-bounce-slow">
                <div className="bg-blue-600 p-2 rounded-full text-white">
                  <Smartphone size={24} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase font-bold">Download Now</p>
                  <p className="text-gray-900 font-bold text-sm">iOS & Android</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BettingAppHero;