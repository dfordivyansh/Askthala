import React from 'react';
import { AlertTriangle, Coins, TrendingUp, Flame, Target, UserX, Heart, Crosshair, ShieldAlert } from 'lucide-react';

// --- Data for the Mistakes ---
const mistakesData = [
  {
    icon: <Coins size={32} />,
    title: 'Changing Bet Size Randomly',
    description: 'Increasing or decreasing your stake based on recent wins or losses can quickly drain your balance. Avoid chasing losses or overbetting after a win. Stick to a fixed bet size (around 1–3% of your bankroll) to stay in control and play longer.'
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Chasing Hot Streaks',
    description: 'Many players believe a game or slot is “hot” after a few wins. In reality, casino games run on RNG (Random Number Generators). Past results don’t affect future outcomes. Focus on games with better odds instead of chasing streaks.'
  },
  {
    icon: <Flame size={32} />,
    title: 'Playing Too Many Games',
    description: 'Jumping between too many casino games in one session increases risk and confusion. More games don’t mean more chances to win. Pick 1–2 games you understand well and play them with a clear plan.'
  },
  {
    icon: <Target size={32} />,
    title: 'Unrealistic Winning Expectations',
    description: 'Expecting big wins every session is unrealistic. Casino games always have a house edge. Smart players aim for entertainment, controlled play, and small consistent wins instead of jackpot dreams every time.'
  },
  {
    icon: <UserX size={32} />,
    title: 'Falling for “Guaranteed” Systems',
    description: 'There is no guaranteed casino strategy. Avoid websites or players claiming sure-shot tricks or secret formulas. If it sounds too good to be true, it usually is. Trust your knowledge, not false promises.'
  },
  {
    icon: <Heart size={32} />,
    title: 'Playing With Emotions',
    description: 'Letting emotions control your bets—whether excitement, frustration, or loyalty to a favorite game—often leads to poor decisions. Successful casino play requires calm thinking, discipline, and knowing when to stop.'
  },
  {
    icon: <Crosshair size={32} />,
    title: 'Ignoring Game Rules & House Edge',
    description: 'Many players jump into games without understanding rules or payout structures. Always check the house edge and basic strategy before playing. Knowledge gives you better control and improves long-term results.'
  }
];

const BettingMistake = () => {
  return (
    <section className="bg-white py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-100 opacity-60 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-100 opacity-60 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header --- */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6 shadow-sm">
             <ShieldAlert size={16} className="text-red-600" />
             <span className="text-red-600 text-xs font-bold uppercase tracking-widest">Risk Management</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Common Casino <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Mistakes</span> <br />
            & How to Avoid Them
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed opacity-90">
            Even regular casino players make these mistakes. Learn how to spot and avoid common casino pitfalls to protect your bankroll and enjoy smarter gameplay.
          </p>
        </div>

        {/* --- Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mistakesData.map((item, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col ${
                index === 6 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : '' /* Center last item on large screens */
              }`}
            >
              
              {/* Icon */}
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-600 shadow-sm border border-red-100 group-hover:scale-110 transition-transform duration-300 group-hover:text-white group-hover:bg-red-600">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                {item.description}
              </p>

              {/* Caution Corner Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-300 text-red-500 pointer-events-none">
                <AlertTriangle size={32} />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BettingMistake;