import React from 'react';
import { Trophy, TrendingUp, Users, ShieldCheck, Zap } from 'lucide-react';

const IplBettingInfo = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 opacity-60 blur-[80px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10"> 

        {/* Header Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
             <Trophy size={14} />
             <span>IPL Season 17</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
           World’s Leading Online Casino Platforms
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl border-l-4 border-blue-600 pl-6">
            Online casinos continue to grow worldwide, offering exciting gaming experiences across multiple platforms. Our guide highlights reliable casino sites to help players play with confidence.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200  relative overflow-hidden">
          
          {/* Decorative Icon Background */}
          <div className="absolute -right-10 -top-10 text-gray-50 opacity-80 transform rotate-12 pointer-events-none">
             <TrendingUp size={300} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Title & Key Stat */}
            <div className="lg:col-span-4">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                    <Users size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    Growing Popularity of Online Casino Gaming
                  </h3>
               </div>
               
               <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-2 text-blue-600 font-bold">
                    <Zap size={20} /> Did you know?
                  </div>
                  <p className="text-sm text-gray-600">
                    Online casino gaming is one of the fastest-growing digital entertainment segments worldwide, supported by mobile access and live gaming innovations.
                  </p>
               </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-8 space-y-8">
              
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Online casino gaming has gained massive popularity worldwide, driven by digital access and evolving gaming technology. Today, millions of players look for reliable casino platforms that offer smooth gameplay, user-friendly design, and timely transactions. This growing demand is why trusted online casino platforms continue to expand globally.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Many Casino bettors who are interested in regular betting are looking for a trustworthy online betting services with attractive odds, convenience, and rapid withdrawals. Even though there are many best sports betting sites available online, due to their powerful platforms, real-time betting possibilities, and wide range of payment methods, the <span className="text-gray-900 font-semibold">top 10 Indian betting sites</span> attract many consumers.
                </p>
              </div>

              <div className="flex gap-4 items-start p-4 bg-blue-50 rounded-xl border border-blue-100">
                 <ShieldCheck className="flex-shrink-0 text-blue-600 mt-1" size={24} />
                 <div>
                    <h4 className="text-gray-900 font-bold text-lg mb-1">Trust & Security</h4>
                    <p className="text-gray-600 text-base">
                      Players value casino platforms that focus on safety, fair play, and secure systems. Choosing well-reviewed and transparent casino platforms helps ensure a smoother and more enjoyable gaming experience.
                    </p>
                 </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IplBettingInfo;