import React from 'react';
import { ShieldCheck, Clock, Ban, AlertTriangle, TrendingDown, DollarSign, Sliders } from 'lucide-react';

const PlaySafeSection = () => {
  return (
    <section className="relative w-full py-10 md:py-10 overflow-hidden bg-white">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 transform scale-105 blur-sm"
          style={{ backgroundImage: "url('/profile.png')" }}
        ></div>
        {/* Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Play Safe – Our Approach to <br /> <span className="text-blue-600">Responsible Gambling</span>
          </h2>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 inline-block backdrop-blur-md">
            <p className="text-gray-700 text-lg font-medium mb-1">
              We encourage smart betting and taking breaks when needed.
            </p>
            <p className="text-sm text-gray-500 opacity-90">
              For help, visit <a href="https://www.gambleaware.org" className="text-blue-600 font-bold underline decoration-blue-300 decoration-2 underline-offset-4 hover:text-blue-800 transition-colors">GambleAware.org</a>.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Card: Tools */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col group/card">
            <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
              <div className="p-3 bg-blue-50 rounded-lg mr-4 text-blue-600">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Responsible Gambling Tools
              </h3>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center group">
                <Sliders className="text-gray-400 group-hover:text-blue-600 transition-colors mr-4" size={20} />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-lg font-medium">Bet limits</span>
              </div>
              <div className="flex items-center group">
                <Clock className="text-gray-400 group-hover:text-blue-600 transition-colors mr-4" size={20} />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-lg font-medium">Session reminders</span>
              </div>
              <div className="flex items-center group">
                <Ban className="text-gray-400 group-hover:text-blue-600 transition-colors mr-4" size={20} />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-lg font-medium">Self-exclusion options</span>
              </div>
            </div>
          </div>

          {/* Right Card: Warning Signs */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl hover:border-orange-500/50 transition-all duration-300 flex flex-col group/card">
            <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
              <div className="p-3 bg-orange-50 rounded-lg mr-4 text-orange-600">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Signs You Should Take a Break
              </h3>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center group">
                <TrendingDown className="text-gray-400 group-hover:text-orange-500 transition-colors mr-4" size={20} />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-lg font-medium">Chasing losses often?</span>
              </div>
              <div className="flex items-center group">
                <DollarSign className="text-gray-400 group-hover:text-orange-500 transition-colors mr-4" size={20} />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-lg font-medium">Betting more than planned?</span>
              </div>
              <div className="flex items-center group">
                <AlertTriangle className="text-gray-400 group-hover:text-orange-500 transition-colors mr-4" size={20} />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-lg font-medium">Feeling anxious about results?</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlaySafeSection;