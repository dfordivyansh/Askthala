import React from 'react';
import { Mail, CheckCircle, TrendingUp, Shield, Zap, Bell } from 'lucide-react';

const SubscribeSection = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 opacity-60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-50 opacity-80 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: The Hook */}
          <div className="text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-8 shadow-sm border border-blue-100 transform rotate-3">
               <Mail size={32} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Subscribe to Free Casino Insights
            </h2>
            
            <div className="h-1 w-20 bg-blue-600 mb-8 rounded-full"></div>
            
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              If you want to stay ahead in the world of online casino gaming, our free subscription is for you. Receive useful insights, game highlights, and important updates delivered straight to your inbox.
            </p>
          </div>

          {/* Right Column: The Value Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl relative">
            {/* Floating Bell Icon */}
            <div className="absolute -top-6 -right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/30">
              <Bell size={28} fill="currentColor" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Join India's Growing Casino Betting Community
            </h3>

            <p className="text-gray-600 mb-8 leading-relaxed border-b border-gray-100 pb-6">
              Subscribe for daily match predictions, 96 Casino app news, and strategy updates. Get access to:
            </p>

            {/* Styled List */}
            <ul className="space-y-4">
              
              {/* Item 1 */}
              <li className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 cursor-default">
                <div className="flex-shrink-0 mt-1 mr-4 text-blue-600">
                  <Zap size={20} fill="currentColor" className="text-blue-600" />
                </div>
                <div className="text-lg text-gray-600">
                  Stake news for <span className="text-gray-900 font-bold">Indian Casino</span>
                </div>
              </li>

              {/* Item 2 */}
              <li className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 cursor-default">
                <div className="flex-shrink-0 mt-1 mr-4 text-blue-600">
                  <TrendingUp size={20} />
                </div>
                <div className="text-lg text-gray-600">
                  Online Casino betting trends
                </div>
              </li>

              {/* Item 3 */}
              <li className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 cursor-default">
                <div className="flex-shrink-0 mt-1 mr-4 text-blue-600">
                  <Shield size={20} />
                </div>
                <div className="text-lg text-gray-600">
                  Verified Casino bookies contacts (licensed)
                </div>
              </li>
            </ul>

            {/* Visual Button (Design Element) */}
            <div className="mt-10 pt-6">
               <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30 text-lg">
                 SUBSCRIBE NOW
               </button>
               <p className="text-center text-xs text-gray-400 mt-3">
                 No spam, just winning tips. Unsubscribe anytime.
               </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;