import React from 'react';
import { Layout, Tv, CreditCard, Zap, ShieldCheck, Headphones, Smartphone, CheckCircle2 } from 'lucide-react';

// --- Feature Data Mapping ---
const featuresData = [
  {
    icon: <Layout size={32} />,
    title: 'Simple User Interface',
    description: 'Casino betting apps should offer a clean and easy-to-navigate interface. Players must quickly find their favourite casino games, tables, and live dealers without confusion. A well-designed layout ensures smooth gameplay for both beginners and experienced users.'
  },
  {
    icon: <Tv size={32} />,
    title: 'Live Casino & Real-Time Gaming',
    description: 'Top casino apps provide live dealer games such as Roulette, Blackjack, Baccarat, and Teen Patti. Features like real-time gameplay, HD streaming, and instant interaction with dealers create an authentic casino-style experience from anywhere.'
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Secure Payment Method Integration',
    description: 'Reliable casino apps support multiple payment options for quick deposits and withdrawals. Secure methods like debit/credit cards, UPI, e-wallets, and cryptocurrencies ensure safe and hassle-free transactions for players.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Real-Time Game Results & Payouts',
    description: 'Casino betting apps should display instant game results, balance updates, and transparent payout calculations. Live notifications, betting history, and bonus tracking help users stay informed and confident while playing.'
  },
  {
    icon: <ShieldCheck size={32} />,
    title: 'Responsible Gaming Tools',
    description: 'Trusted casino apps promote responsible gaming by offering self-exclusion options, deposit limits, and session reminders. These tools help players control their gaming habits and maintain a safe betting environment.'
  },
  {
    icon: <Headphones size={32} />,
    title: '24/7 Customer Support',
    description: 'A responsive customer support system is essential for casino betting apps. Players should have access to live chat, email, or call support at any time to resolve payment issues, gameplay queries, or account concerns quickly.'
  }
];

const BettingAppsFeatures = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 opacity-60 blur-[120px] rounded-full translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 opacity-80 blur-[100px] rounded-full -translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Intro Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
              <Smartphone size={16} className="text-blue-600" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Mobile Experience</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Trusted Online Casino Platforms <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Worldwide
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed opacity-90 mb-6">
             There are many online casino apps available globally, offering smooth access to a wide range of casino games. The top platforms stand out with easy-to-use interfaces, fast performance, and strong security features that make the overall experience reliable and convenient.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 relative shadow-sm">
            <div className="absolute -top-3 -right-3 bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-600/20">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              <strong className="text-gray-900">Popular online casino apps</strong> provide real-money gaming options across slots, table games, and live dealer experiences. These platforms are designed for quick downloads, simple navigation, and secure play, making online casino gaming more accessible for players around the world.
            </p>
          </div>
        </div>

        {/* --- Features Grid Section --- */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Features to Look for  <span className="text-blue-600">in the Best Casino Betting Apps</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-3xl border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-100 group-hover:border-blue-200">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed opacity-90 flex-grow">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BettingAppsFeatures;