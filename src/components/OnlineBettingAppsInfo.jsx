import React from 'react';
import { Smartphone, Scale, Banknote, Globe, Info, ShieldAlert } from 'lucide-react';

const OnlineBettingAppsInfo = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10"> 
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-4 font-bold tracking-widest uppercase text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Info size={16} />
            <span>Industry Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What to Know Before Using  <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Online Casino Apps
            </span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Mobile Trends */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl hover:border-blue-500/50 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                <Smartphone size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Mobile Gaming Shift</h3>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed opacity-90">
              With the rapid growth of smartphones, online casino gaming has become more accessible than ever worldwide. Players now prefer casino apps that offer quick access, smooth performance, and flexibility to play anytime, anywhere. Mobile-first platforms continue to reshape how users experience casino entertainment.
            </p>
          </div>

          {/* Card 2: Legal & Payments */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                  <Scale size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Understanding Platform Regulations</h3>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed opacity-90 mb-6">
                Online casino regulations vary across regions, as there is no single global rulebook. Because of this, casino platforms operate under different licensing frameworks depending on where they are permitted to offer services. Players are encouraged to review local guidelines and choose platforms that operate responsibly within their region.
              </p>
            </div>

            {/* Payment Callout Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4 items-start mt-4">
               <div className="mt-1 text-green-600">
                 <Banknote size={24} />
               </div>
               <div>
                 <h4 className="text-gray-900 font-bold text-sm mb-1">Unique Payment Methods</h4>
                 <p className="text-sm text-gray-600">
                   While online payments are growing, many Indians prefer cash. Betting companies now offer <span className="text-gray-900 font-bold">prepaid cards and vouchers</span> to facilitate cash-based digital transactions.
                 </p>
               </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OnlineBettingAppsInfo;