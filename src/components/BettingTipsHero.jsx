import React from 'react';
import { Home, ChevronRight, TrendingUp, BrainCircuit, BarChart2, Target, Zap } from 'lucide-react';

const BettingTipsHero = () => {
  return (
    <section className="relative bg-white pt-32 pb-16 md:pt-30 md:pb-24 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100 opacity-60 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100 opacity-60 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm text-gray-500 mb-10">
          <a href="/" className="flex items-center hover:text-blue-600 transition-colors duration-200">
            <Home size={16} className="mr-2" /> 
            Home
          </a>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
            Betting Tips
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Text Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-blue-600 mb-4 font-bold tracking-widest uppercase text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <BrainCircuit size={16} />
              <span>Data-Driven Analysis</span>
            </div>

            <h1 className="text-4xl md:text-4xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Expert Casino Betting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Tips & Strategies for 2026
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-blue-600 pl-6">
              Whether you’re new to online casinos or an experienced player, the right strategies can make a real difference. Successful casino betting is not just about luck it’s about understanding game rules, managing your bankroll wisely, and choosing the right moments to play.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-blue-600 pl-6">
              Our expert casino tips focus on smart gameplay, probability analysis, bonus usage, and game selection. By staying updated with the latest trends and proven strategies, you can enjoy a more informed and enjoyable casino betting experience in 2026.
            </p>

          </div>

          {/* Right Column: Image Presentation */}
          <div className="text-center relative group">
            
            {/* Glowing Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-200 opacity-40 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative transform transition-transform duration-700 hover:scale-105 z-10">
              <img 
                src="/tip.png" 
                alt="Expert Cricket Betting Tips" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-200 relative" 
              />

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-4 md:left-8 bg-white border border-blue-100 p-4 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 animate-bounce-slow">
                <div className="bg-blue-600 p-2 rounded-full text-white">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase font-bold">Success Rate</p>
                  <p className="text-gray-900 font-bold text-sm">High Accuracy</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BettingTipsHero;