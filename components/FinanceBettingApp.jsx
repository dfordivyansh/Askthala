import React from 'react';
import { CheckCircle2, Wallet, PlayCircle, Trophy, BarChart2, Compass, Coins, AlertCircle } from 'lucide-react';

const FinanceBettingApp = () => {
  
  // Helper for the finance step cards
  const FinanceStep = ({ icon, title, text }) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm mb-4 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="text-gray-900 font-bold text-lg mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed opacity-90">
        {text}
      </p>
    </div>
  );

  // Helper for list items
  const ListItem = ({ text }) => (
    <li className="flex items-start gap-3 mb-3 last:mb-0">
      <CheckCircle2 size={18} className="text-blue-600 mt-1 flex-shrink-0" />
      <span className="text-gray-600 text-base leading-relaxed">{text}</span>
    </li>
  );

  return (
    <section className="bg-white py-10 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 opacity-60 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-100 opacity-60 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Top Row: Exploration & Strategy --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          
          {/* Card 1: Join & Explore */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Compass size={100} className="text-blue-600" />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                <Compass size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Join & Explore</h3>
            </div>

            <ul className="space-y-2 relative z-10">
              <ListItem text="This is a key betting stage. Sign in and confirm verification links sent to your email or phone." />
              <ListItem text="Explore the app's features and interface. Top apps feature intuitive designs for easy navigation." />
              <ListItem text="Locate sports markets, live events, promos, and account settings to familiarize yourself." />
            </ul>
          </div>

          {/* Card 2: Stake Amount */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Coins size={100} className="text-blue-600" />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                <Coins size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Stake Strategy</h3>
            </div>

            <ul className="space-y-2 relative z-10">
              <ListItem text="Every sports betting app includes minimum and maximum bet limits." />
              <ListItem text="Choose your stake amount carefully after making your selection." />
              <ListItem text="Double-check everything before confirming. Bet cancellation rules vary by app." />
            </ul>
          </div>

        </div>

        {/* --- Bottom Section: Finance Workflow --- */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Manage Your <span className="text-blue-600">Betting Budget Smartly</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto opacity-90">
              From adding funds to making informed bets, follow these simple steps to control your bankroll and enjoy a smoother betting experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FinanceStep 
              icon={<Wallet size={24} />}
              title="Add Funds Securely"
              text="Use trusted payment options such as UPI, cards, or digital wallets to top up your account. Complete verification steps to ensure fast and secure transactions."
            />
            <FinanceStep 
              icon={<PlayCircle size={24} />}
              title="Place Your Bets"
              text="Once your balance is updated, you’re ready to start playing. Select your stake and confirm your bet instantly within the app."
            />
            <FinanceStep 
              icon={<Trophy size={24} />}
              title="Pick Games & Events"
              text="Choose from popular casino games, live sports, or special events. There’s something available for every playing style and preference."
            />
            <FinanceStep 
              icon={<BarChart2 size={24} />}
              title="Review Stats & Insights"
              text="Check game history, trends, and in-app analytics before betting. Smart analysis helps improve decisions and manage risk better."
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinanceBettingApp;