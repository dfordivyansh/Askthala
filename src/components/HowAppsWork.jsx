import React from 'react';
import { UserPlus, Target, Zap, ShieldCheck, Gift, Download, Settings, HelpCircle } from 'lucide-react';

// --- Data for the 6 Steps ---
const stepsData = [
  {
    number: '01',
    icon: <UserPlus size={32} />,
    title: 'Account Creation',
    description: 'Download the casino app and sign up in minutes. You’ll be asked to enter basic details and complete identity verification to ensure a secure and responsible gaming environment.'
  },
  {
    number: '02',
    icon: <Target size={32} />,
    title: 'Playing Casino Games',
    description: 'Browse popular casino games such as slots, blackjack, roulette, and live dealer games. Place your bets using the available balance and enjoy smooth, real-time gameplay powered by advanced technology.'
  },
  {
    number: '03',
    icon: <Zap size={32} />,
    title: 'Live Games & Real-Time Updates',
    description: 'Many casino apps offer live games with real-time interaction and instant updates. Results are processed instantly, and winnings are credited to your account without delays.'
  },
  {
    number: '04',
    icon: <ShieldCheck size={32} />,
    title: 'Security & Responsible Play',
    description: 'Reputable casino platforms use strong encryption and licensed systems to protect user data and transactions. Always choose platforms that promote fair play and responsible gaming practices.'
  },
  {
    number: '05',
    icon: <Gift size={32} />,
    title: 'Bonuses & Rewards',
    description: 'Casino apps provide welcome bonuses, free spins, and ongoing promotions. These offers enhance your playing experience and give added value while exploring different games.'
  },
  {
    number: '06',
    icon: <Download size={32} />,
    title: 'App Download & Access',
    description: 'Casino apps can be downloaded directly from official app stores or verified websites. This ensures smooth performance, quick access, and a reliable gaming experience across devices.'
  },
];

const HowAppsWork = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100 opacity-40 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <Settings size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Operational Guide</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Casino Apps</span> Work
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed opacity-90">
            Understanding how online casino apps operate is simple. Below is the typical journey from registration to playing games and withdrawing winnings.
          </p>
        </div>

        {/* --- Steps Card Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stepsData.map((step, index) => (
            <div 
              key={step.number}
              className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              
              {/* Large Watermark Number */}
              <div className="absolute -bottom-4 -right-4 text-9xl font-black text-gray-900 opacity-[0.03] leading-none select-none pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-300 relative z-10 group-hover:border-blue-200">
                {step.icon}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HowAppsWork;