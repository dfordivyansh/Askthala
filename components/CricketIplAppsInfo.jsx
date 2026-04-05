import React from 'react';
import { Trophy, Smartphone, TrendingUp, Globe, Tv, Zap, ShieldCheck, Download } from 'lucide-react';

const CricketIplAppsInfo = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-100 opacity-60 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 opacity-80 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Section 1: Intro & Benefits --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
               <Smartphone size={16} className="text-blue-600" />
               <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">App Ecosystem</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
             Popular Casino & IPL<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Apps in India
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed opacity-90 mb-6">
              In India, Casino and IPL apps have become a popular choice for sports fans looking to stay connected online. These apps focus on live match engagement, smooth navigation, and a simple user experience.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed opacity-90">
              Trusted and licensed platforms allow users to follow matches in real time with confidence. Easy installation, quick access to match details, and support for multiple sports make these apps convenient for a wide range of users.
            </p>
          </div>

          {/* Visual Benefits Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl relative">
             {/* Floating Icon */}
             <div className="absolute -top-6 -right-6 bg-blue-600 text-white p-4 rounded-2xl shadow-lg rotate-12 shadow-blue-600/30">
               <Trophy size={32} />
             </div>

             <h3 className="text-xl font-bold text-gray-900 mb-6">Why Use Betting Apps?</h3>
             
             <div className="space-y-4">
               <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                 <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Zap size={20} /></div>
                 <span className="text-gray-700 font-medium">Real-time Updates & Live Odds</span>
               </div>
               <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                 <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><ShieldCheck size={20} /></div>
                 <span className="text-gray-700 font-medium">Safe Real-Money Wagering</span>
               </div>
               <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                 <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Download size={20} /></div>
                 <span className="text-gray-700 font-medium">Easy Download & Access</span>
               </div>
             </div>
          </div>

        </div>

        {/* --- Section 2: Popularity Trends --- */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200 relative overflow-hidden shadow-lg">
          
          {/* Background Chart Line Graphic */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-10 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 20 L0 15 Q 20 5 40 10 T 100 0 L 100 20 Z" fill="#2563EB" />
          </svg>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                   <TrendingUp size={24} />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-900">The Popularity of Betting via Apps</h2>
               </div>
               
               <p className="text-lg text-gray-600 leading-relaxed mb-6">
                 Casino betting is a major trend in Indian online sports betting. India's most popular sport is Casino, and the IPL draws many bettors. <span className="text-gray-900 font-semibold">Live streaming</span> and <span className="text-gray-900 font-semibold">in-play betting</span> allow bettors to place bets while watching the game, increasing popularity.
               </p>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
               <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
                 <Globe size={18} className="text-blue-600" /> Global Sports Expansion
               </h3>
               <p className="text-gray-600 text-sm leading-relaxed mb-4">
                 While Casino remains king, other sports are gaining traction due to increased exposure via TV and online channels.
               </p>
               
               <div className="flex flex-wrap gap-2">
                 <span className="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-600 border border-gray-200 font-medium">Football</span>
                 <span className="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-600 border border-gray-200 font-medium">Tennis</span>
                 <span className="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-600 border border-gray-200 font-medium">Basketball</span>
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CricketIplAppsInfo;