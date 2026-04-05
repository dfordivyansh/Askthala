import React from 'react';
import { Home, ChevronRight, Trophy, Activity, Dices } from 'lucide-react';

const BettingSitesHero = () => {
  return (
    <section className="relative bg-white pt-32 pb-16 md:pt-30 md:pb-24 overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100 opacity-60 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm text-gray-500 mb-10">
          <a href="/" className="flex items-center hover:text-blue-600 transition-colors duration-200">
            <Home size={16} className="mr-2" /> 
            Home
          </a>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
            Betting Sites
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Text Content */}
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
               The World’s Trusted Online Casino  <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Guide 2026
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl border-l-4 border-blue-600 pl-6">
              Ask Thala enhances your online gaming experience by showcasing carefully reviewed casino platforms. We focus on trusted destinations offering slots, live dealer games, and classic casino entertainment for players worldwide.
            </p>

          </div>

          {/* Right Column: Image with Effects */}
          <div className="text-center relative group">
            
            {/* Glowing Backlight behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-200 opacity-40 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="relative transform transition-transform duration-700 hover:scale-105">
              <img 
                src="/game.png" 
                alt="Best Cricket Betting Sites in India" 
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl border border-gray-200 relative z-10" 
              />

              {/* Floating Stats Badge */}
              <div className="absolute -bottom-6 -right-2 md:right-8 z-20 bg-white border border-blue-100 p-4 rounded-xl shadow-xl flex flex-col items-center">
                <span className="text-3xl font-extrabold text-blue-600">20+</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Verified Sites</span>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BettingSitesHero;