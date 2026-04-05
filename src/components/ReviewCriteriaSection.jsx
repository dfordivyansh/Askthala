import React from 'react';
import { Smartphone, TrendingUp, ShieldCheck, Zap, CheckCircle, Search } from 'lucide-react';

const ReviewCriteriaSection = () => {
  return (
    <section className="bg-white py-10 md:py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How We Review <br className="hidden md:block" /> Casino Betting Platforms?
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            To review the best betting sites, here are the following measures taken by us:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Left Card: Criteria Grid */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Our Review Criteria
            </h3>
            <p className="text-gray-400 text-sm mb-8 opacity-80 uppercase tracking-wider font-semibold">
              Odds, Security, UX
            </p>

            <p className="text-lg text-gray-600 mb-8">
              We rate sites based on:
            </p>

            {/* The 2x2 Grid transformation of the bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              
              {/* Item 1 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-md transition-all duration-300 group">
                <Smartphone className="text-gray-400 group-hover:text-blue-600 mb-3 transition-colors" size={28} />
                <span className="text-gray-700 font-medium block">Ease of use on mobile & desktop</span>
              </div>

              {/* Item 2 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-md transition-all duration-300 group">
                <TrendingUp className="text-gray-400 group-hover:text-blue-600 mb-3 transition-colors" size={28} />
                <span className="text-gray-700 font-medium block">Competitive odds</span>
              </div>

              {/* Item 3 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-md transition-all duration-300 group">
                <ShieldCheck className="text-gray-400 group-hover:text-blue-600 mb-3 transition-colors" size={28} />
                <span className="text-gray-700 font-medium block">Data protection & encryption</span>
              </div>

              {/* Item 4 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-md transition-all duration-300 group">
                <Zap className="text-gray-400 group-hover:text-blue-600 mb-3 transition-colors" size={28} />
                <span className="text-gray-700 font-medium block">Fast deposits & withdrawals</span>
              </div>

            </div>
          </div>

          {/* Right Card: Trust Statement */}
          <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl flex flex-col justify-center overflow-hidden">
            
            {/* Watermark Icon */}
            <div className="absolute top-[-20px] right-[-20px] opacity-[0.05] pointer-events-none">
                <ShieldCheck size={300} className="text-gray-900" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-blue-600" size={32} />
                <h3 className="text-3xl font-bold text-gray-900">
                  Why Our Casino Ratings Are Reliable
                </h3>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-gray-200 to-transparent mb-8"></div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
               We only feature platforms that operate legally and meet proper licensing standards. Each recommendation is based on user experiences and compliance checks. This means Casino betting is legal in India when done through authorized and trusted apps.
              </p>

              {/* Trust Badge */}
              <div className="inline-flex items-center bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                 <ShieldCheck size={20} className="text-blue-600 mr-3" />
                 <span className="text-blue-600 font-bold text-sm tracking-wide uppercase">100% Verified & Secure</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReviewCriteriaSection;