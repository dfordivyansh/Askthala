import React from 'react';
import { Gift, Trophy, Globe } from 'lucide-react';

const SignupBonusSection = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section: Informational Text */}
        <div className="max-w-4xl mx-auto text-center mb-20"> 
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-6 border border-blue-100">
            <Globe className="text-blue-600 w-6 h-6 mr-2" />
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Casino Fever</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
           Spin, Deal & Win Worldwide
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Online casino gaming brings a world of excitement to your screen. From immersive slots to live dealer tables, players enjoy smooth gameplay and real-time action anywhere. With modern platforms and trusted features, casino betting continues to grow as a premium global entertainment choice.
          </p>
        </div>

        {/* Bottom Section: Feature Card for Bonuses */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
          {/* Decorative Background Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 opacity-50 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            <div className="text-left order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Exclusive Signup Bonus
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-8">
                & Free Bets for 2026
              </h3>
              
              <p className="text-lg text-gray-600 mb-8">
                Sign up now and claim your rewards:
              </p>
              
              <div className="space-y-4">
                {/* List Item 1 */}
                <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                    <Gift className="text-blue-600 w-6 h-6" />
                  </div>
                  <span className="text-lg text-gray-600">
                    <strong className="text-gray-900">₹25,000 bonus</strong> on first deposit (Indibet)
                  </span>
                </div>

                {/* List Item 2 */}
                <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                    <Trophy className="text-blue-600 w-6 h-6" />
                  </div>
                  <span className="text-lg text-gray-600">
                    <strong className="text-gray-900">500% deposit bonus</strong> (1win)
                  </span>
                </div>

                {/* List Item 3 */}
                <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                    <Gift className="text-blue-600 w-6 h-6" />
                  </div>
                  <span className="text-lg text-gray-600">
                    <strong className="text-gray-900">₹75,000 in free bets</strong> (Stake)
                  </span>
                </div>

                {/* List Item 4 */}
                <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                    <Trophy className="text-blue-600 w-6 h-6" />
                  </div>
                  <span className="text-lg text-gray-600">
                    Free cash challenges <strong className="text-gray-900">worth ₹51,000</strong> (12Bet)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right order-1 lg:order-2 flex justify-center">
              <div className="relative">
                {/* Image Glow Effect */}
                <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 rounded-full transform scale-90"></div>
                <img 
                  src="/bonus1.png" 
                  alt="Exclusive Signup Bonus and Free Bets" 
                  className="relative w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl" 
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupBonusSection;