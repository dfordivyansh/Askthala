import React from 'react';
import { Trophy, Calendar, TrendingUp, Zap, Users, ArrowUpRight } from 'lucide-react';

const IplBettingSection = () => {
  return (
    <section className="bg-white py-10 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 text-left relative z-10">
            
            {/* Header */}
            <div className="flex items-center gap-2 text-blue-600 mb-4 font-bold tracking-widest uppercase text-sm">
               <Trophy size={16} />
               <span>Casino Carnival</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Casino Game Tips to Play Smarter in 2026
            </h2>
            
            <p className="text-lg text-gray-600 mb-10 border-l-4 border-blue-600 pl-6">
              IPL is India’s biggest Casino carnival and betting event.
            </p>

            {/* Section 1: Predictions */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 border border-blue-100">
                  <Calendar size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Match-by-Match Predictions
                </h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed pl-0 md:pl-14">
                Check our live blog for IPL 2026 games. Get daily insights, pitch reports, and odds movements.
              </p>
            </div>

            {/* Section 2: Players to Watch (Styled List) */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 border border-blue-100">
                  <Users size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Players to Watch Based on Betting Trends
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 mb-6 pl-0 md:pl-14">
                Watch out for:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-0 md:pl-14">
                {/* Item 1 */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 group">
                  <TrendingUp className="text-gray-400 group-hover:text-blue-600 mb-2 transition-colors" size={24} />
                  <span className="text-gray-900 font-medium">Consistent openers</span>
                </div>
                
                {/* Item 2 */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 group">
                  <Zap className="text-gray-400 group-hover:text-blue-600 mb-2 transition-colors" size={24} />
                  <span className="text-gray-900 font-medium">Powerplay bowlers</span>
                </div>

                {/* Item 3 */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 group">
                  <ArrowUpRight className="text-gray-400 group-hover:text-blue-600 mb-2 transition-colors" size={24} />
                  <span className="text-gray-900 font-medium">Impact substitutes</span>
                </div>
              </div>
            </div>

            {/* Bottom Box: Apps */}
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
              <p className="text-lg text-gray-600 leading-relaxed">
                Use apps like <span className="text-gray-900 font-semibold">96.com, 10Cric, Dafabet, Cricbaba, Indibet,</span> and <span className="text-gray-900 font-semibold">1xBet</span> for IPL match bets with enhanced odds.
              </p>
            </div>

          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 relative">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100 opacity-60 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group">
              <img 
                src="/casino1.png" 
                alt="IPL 2026 Captains and Trophy" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay Badge */}
              <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md border border-white/40 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                SEASON 2026
              </div>
              
              {/* Bottom Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IplBettingSection;