import React from 'react';
import { Smartphone, TrendingUp, Gift, Tv, CheckCircle2, HelpCircle } from 'lucide-react';

const BestBettingInfo = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-100 opacity-60 blur-[100px] rounded-full translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 mb-4 font-bold tracking-widest uppercase text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <HelpCircle size={16} />
              <span>Selection Criteria</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              India’s Top Betting Choices <br />
              
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 relative shadow-sm">
              {/* Decorative Quote Icon */}
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-600/20">
                  <CheckCircle2 size={24} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                How Do We Identify the Top Online Casino Platforms Worldwide?
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Every online casino platform has its own strengths and limitations, but only a few stand out consistently on a global level. To be featured in our top selections, a casino must deliver a reliable gaming environment and a strong overall experience. We focus on platforms that offer quality games, smooth performance, and transparent operations.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Feature 1: Odds */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Competitive Gameplay</h4>
              <p className="text-sm text-gray-600">
                A diverse game library with fair mechanics and smooth gameplay is essential for long-term casino enjoyment.
              </p>
            </div>

            {/* Feature 2: Live Features */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <Tv size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Live Casino</h4>
              <p className="text-sm text-gray-600">
                Live dealer games and real-time interaction enhance engagement and recreate an authentic casino experience.
              </p>
            </div>

            {/* Feature 3: Bonuses */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <Gift size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Sign-up Incentives</h4>
              <p className="text-sm text-gray-600">
                Attractive welcome offers and regular promotions help improve value for both new and returning players.
              </p>
            </div>

            {/* Feature 4: Mobile */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <Smartphone size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Mobile Priority</h4>
              <p className="text-sm text-gray-600">
                Top casino platforms prioritize seamless mobile performance, ensuring smooth play across all devices.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BestBettingInfo;