import React from 'react';
import { MessageSquare, WifiOff, Smartphone, UserCheck, MapPin, BellRing, Cpu, CheckCircle2, SmartphoneCharging, EarthIcon } from 'lucide-react';

// --- Data for the Mobile App Advantages ---
const guideData = [
  {
    icon: <MessageSquare size={32} />,
    title: 'Aviator Game Benefits',
    description: 'Mobile apps offer real-time crash tracking, instant cash-out buttons, and smooth animations for Aviator. Fast response times help players make quick decisions without lag.'
  },
  {
    icon: <WifiOff size={32} />,
    title: 'Slots Game Advantages',
    description: 'Casino apps provide hundreds of slot games, faster spin loading, auto-play options, and exclusive free-spin offers—delivering a smoother and more immersive slots experience.'
  },
  {
    icon: <SmartphoneCharging size={32} />,
    title: 'Blackjack Experience',
    description: 'Mobile apps feature live dealer blackjack, quick chip selection, and intuitive controls. Optimized layouts help players make strategic moves easily on smaller screens.'
  },
  {
    icon: <UserCheck size={32} />,
    title: 'Faster Gameplay Performance',
    description: 'Mobile casino apps are built for speed, ensuring quick game loading, smooth transitions, and uninterrupted play across all casino games.'
  },
  {
    icon: <MapPin size={32} />,
    title: 'Personalized Game Suggestions',
    description: 'Apps analyze player behavior to recommend Aviator rounds, trending slots, or preferred blackjack tables—creating a more tailored gaming experience.'
  },
  {
    icon: <BellRing size={32} />,
    title: 'Instant Game Alerts',
    description: 'Get real-time notifications for Aviator rounds, new slot releases, blackjack tournaments, and limited-time bonuses—so you never miss action.'
  },
  {
    icon: <Cpu size={32} />,
    title: 'Secure & Seamless Payments',
    description: 'Mobile apps support encrypted transactions and digital wallets, allowing fast deposits and withdrawals while playing Aviator, Slots, or Blackjack.'
  },
  {
    icon: <EarthIcon size={32} />,
    title: 'Play Anytime, Anywhere',
    description: 'With mobile access, players can enjoy Aviator, spin slots, or join live blackjack tables anytime—without needing a desktop setup.'
  }
];

const WhyChooseMobileApps = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 opacity-60 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-100 opacity-60 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header --- */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <Smartphone size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">App Advantages</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">MOBILE CASINO APPS?</span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed opacity-90">
            Mobile casino apps enhance gameplay with speed, smart features, and game-focused tools—making them ideal for modern players worldwide.
          </p>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guideData.map((step, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col ${
                index === 6 ? 'md:col-span-2 lg:col-span-1' : '' /* Center last item on medium screens if needed, or let it flow */
              }`}
            >
              
              {/* Icon */}
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                {step.description}
              </p>

              {/* Decorative corner accent */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-300 text-blue-600">
                <CheckCircle2 size={40} />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseMobileApps;