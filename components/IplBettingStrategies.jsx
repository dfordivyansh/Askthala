import React from 'react';
import { Brain, TrendingUp, Shield, Globe, Zap, Target, PieChart, BookOpen, AlertTriangle, Calculator, Layers, AlertCircle } from 'lucide-react';

// --- Data for the 5 Strategy Cards ---
const strategiesData = [
  {
    icon: <Brain size={32} />,
    title: 'Smart Game Analysis',
    description: 'Study game rules, payout ratios, RTP, and volatility before placing bets. Understanding how each casino game works helps you make smarter and more confident decisions.'
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Spot Profitable Patterns',
    description: 'Identify winning patterns in games like slots, blackjack, or live casino tables. Recognising trends early can help you time your bets better and improve outcomes.'
  },
  {
    icon: <Shield size={32} />,
    title: 'Strong Discipline',
    description: 'Stick to your betting plan and avoid emotional decisions. Never chase losses controlled play and discipline are essential for long-term casino enjoyment.'
  },
  {
    icon: <Globe size={32} />,
    title: 'Explore Game Options',
    description: 'Don’t limit yourself to one game. Explore slots, table games, and live casino options to find opportunities that match your skills and comfort level.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Stay Informed',
    description: 'Casino platforms update games, bonuses, and features regularly. Stay aware of new launches, bonus terms, and expert tips to gain a smart edge.'
  }
];

const IplBettingStrategies = () => {
  return (
    <section className="bg-white py-10 relative overflow-hidden">
      
      

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header --- */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <Target size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Pro Masterclass</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Key Strategies for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Casino Betting Success
            </span>
          </h2>
        </div>

        {/* --- Top 5 Strategy Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {strategiesData.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
          {/* Filler card for the 6th slot */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 flex flex-col justify-center items-center text-center shadow-sm">
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Want More?</h3>
             <p className="text-gray-600 mb-4">Read our complete casino betting guide below to learn advanced strategies and responsible gaming tips.</p>
             <BookOpen size={32} className="text-blue-600 animate-bounce" />
          </div>
        </div>

        {/* --- Detailed Content Sections --- */}
        <div className="space-y-16">

          {/* Section 1: Introduction & Research */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
               <h2 className="text-3xl font-bold text-gray-900 mb-6">
                 Maximize Your Casino Winnings. \ <br />Expert insights for confident casino play.
               </h2>
               <p className="text-lg text-gray-600 leading-relaxed mb-6">
                 Looking to level up your casino betting experience? Smart strategy plays a key role in increasing potential returns while keeping risks under control. At <b>Ask Thala</b>, our aim is to enhance your casino journey with expert tips, practical strategies, and responsible betting guidance.
               </p>
               <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600">
                 <h4 className="text-gray-900 font-bold mb-2 flex items-center gap-2"><Brain size={20} className="text-blue-600" /> Think Before You Bet</h4>
                 <p className="text-gray-600 text-sm">
                   A little research goes a long way in casino betting. Learn game variations, house edge, and optimal betting patterns. When you play with knowledge instead of emotion, you increase your chances of smarter outcomes.
                 </p>
               </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Creating Your Strategy</h3>
               <ul className="space-y-6">
                 <li className="flex gap-4">
                   <div className="mt-1 text-blue-600"><Layers size={24} /></div>
                   <div>
                     <h5 className="text-gray-900 font-bold">Build a Smart System</h5>
                     <p className="text-sm text-gray-600 mt-1">Plan your casino play around clear goals and comfort levels. Keep track of your bets, wins, and losses to understand which games suit you best and where you perform more consistently.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="mt-1 text-purple-600"><PieChart size={24} /></div>
                   <div>
                     <h5 className="text-gray-900 font-bold">Data & Game Insights</h5>
                     <p className="text-sm text-gray-600 mt-1">Review past gameplay results to spot useful patterns. Pay attention to payout rates, volatility, and betting limits to tailor a strategy that matches your playing style.</p>
                   </div>
                 </li>
               </ul>
            </div>
          </div>

          {/* Section 2: Bankroll Management (Highlighted) */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
               <Calculator size={200} className="text-gray-900" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold uppercase mb-4 border border-green-200">
                  <Calculator size={14} /> Crucial Advice
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Bankroll Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Effective bankroll management is essential for smart casino betting. Always stick to a fixed casino budget and play responsibly. To handle ups and downs, divide your bankroll into smaller portions and wager only a small percentage on each game or round.
                </p>
                <div className="space-y-4">
                   <p className="text-gray-600 text-sm">
                     <strong className="text-gray-900">Manage Variance:</strong> Casino games involve natural fluctuations. Understanding volatility helps you stay calm during losing streaks and avoid emotional betting decisions.
                   </p>
                   <p className="text-gray-600 text-sm">
                     <strong className="text-gray-900">Use Tools:</strong> Make use of bankroll trackers, RTP information, and betting calculators to plan stakes wisely and understand potential payouts before placing bets.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Continuous Learning & Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-yellow-500" /> Advanced Tools
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Use modern casino tools to make smarter betting decisions. Track RTP, volatility, and bonus terms to understand game behavior. Staying updated with new game releases and platform features helps you choose better betting opportunities.
                </p>
             </div>
             <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-500" /> Continuous Learning
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Casino betting evolves constantly. Smart players refine their strategies over time by learning new game mechanics and payout structures. Engage with guides, expert tips, and player communities to stay informed and improve your gameplay.
                </p>
             </div>
             <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-red-500" /> Personalized Tips
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Learn key concepts like bankroll control, betting limits, and odds interpretation. Understanding how payouts work allows you to build a strategy that fits your style and helps you make more confident betting decisions.
                </p>
             </div>
          </div>

          {/* Section 4: Avoiding Mistakes (Alert) */}
          <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500 shadow-sm">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full text-red-500 mt-1 shadow-sm border border-red-100">
                   <AlertCircle size={24} />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-gray-900 mb-4">
                     Avoiding Common <span className="text-red-600">Betting Mistakes</span>
                   </h2>
                   <p className="text-gray-700 leading-relaxed mb-4">
                     Players often lose money due to impulsive decisions and a lack of discipline. Most issues come from how casino bets are placed, not simply from bad luck or random outcomes.
                   </p>
                   <p className="text-gray-700 leading-relaxed">
                     Avoid emotional play, chasing losses, and betting without understanding the game. Learning from mistakes, managing your bankroll wisely, and playing responsibly help create a more controlled, enjoyable, and sustainable casino betting experience.
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IplBettingStrategies;