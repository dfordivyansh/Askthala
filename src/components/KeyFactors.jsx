import React from 'react';
import { ShieldCheck, Globe, TrendingUp, Smartphone, CreditCard, Gift, Award, Scale } from 'lucide-react';

// --- Data for the 7 Factors ---
const factorsData = [
  {
    number: '01',
    icon: <Award size={32} />,
    title: 'Reputation and Trust',
    description: 'Check player reviews, independent feedback platforms, and industry sources to understand a casino’s reputation. Trusted casino platforms are known for fair gameplay, transparent policies, and consistent user experiences.'
  },
  {
    number: '02',
    icon: <Scale size={32} />,
    title: 'Licenses and Regulation',
    description: 'Always choose online casinos that operate under recognized licensing authorities. Licensed platforms follow defined standards for fair play, security, and responsible operations, helping protect players worldwide.'
  },
  {
    number: '03',
    icon: <Globe size={32} />,
    title: 'Game Variety',
    description: 'A good online casino should offer a wide selection of games, including slots, table games, and live casino options. Variety enhances entertainment and allows players to choose games that match their preferences.'
  },
  {
    number: '04',
    icon: <TrendingUp size={32} />,
    title: 'Competitive Gameplay',
    description: 'Reliable casino platforms provide balanced game mechanics and fair return structures. Consistent performance and transparent game rules help create a better long-term gaming experience.'
  },
  {
    number: '05',
    icon: <Smartphone size={32} />,
    title: 'UI/Mobile Compatibility',
    description: 'Online casinos should be easy to navigate and fully optimized for mobile devices. A smooth interface and mobile-friendly design allow players to enjoy casino games anytime, anywhere.'
  },
  {
    number: '06',
    icon: <CreditCard size={32} />,
    title: 'Payments and Security',
    description: 'Choose casino platforms that support secure payment methods and protect user data. Encrypted transactions, trusted payment options, and clear withdrawal processes are essential for safe casino play.'
  },
  {
    number: '07',
    icon: <Gift size={32} />,
    title: 'Bonuses & Promotions',
    description: 'Casino bonuses can add value when used wisely. Review welcome offers, ongoing promotions, and terms carefully to understand wagering requirements and make informed choices.'
  },
];

const KeyFactors = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
     

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <ShieldCheck size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Expert Guide</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
           Key Points to Check  <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Before Choosing an Online Casino
            </span>
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
           Choose wisely by using this checklist to find a safe, transparent, and reliable casino platform.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {factorsData.map((factor, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden flex flex-col ${index === 6 ? 'lg:col-start-2' : ''}`}
            >
              
              {/* Large Background Number Watermark */}
              <div className="absolute top-0 right-2 text-[120px] font-black text-gray-900 opacity-[0.03] leading-none -mt-4 -mr-4 select-none pointer-events-none group-hover:opacity-[0.06] transition-opacity">
                {factor.number}
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100 group-hover:border-blue-200 group-hover:scale-110 transition-all duration-300 relative z-10">
                {factor.icon}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {factor.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {factor.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default KeyFactors;