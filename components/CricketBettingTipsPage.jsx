import React from 'react';
import { CheckCircle2, Scale, ShieldCheck, Trophy, Globe, TrendingUp, MapPin, Search, Zap, Target, AlertCircle } from 'lucide-react';

const CricketBettingTipsPage = () => {

  // Helper for the tips list
  const TipItem = ({ text }) => (
    <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
      <CheckCircle2 size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
      <span className="text-gray-600 text-base leading-relaxed">{text}</span>
    </li>
  );

  // Helper for League Cards
  const LeagueCard = ({ icon, title, description, footerText, accentColor = "text-blue-600" }) => (
    <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full group">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 bg-gray-50 rounded-xl shadow-sm border border-gray-100 group-hover:bg-white transition-colors ${accentColor}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      {footerText && (
        <div className="mt-auto pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Key Details</p>
            <p className="text-gray-700 text-xs leading-relaxed font-medium">{footerText}</p>
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 opacity-60 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-100 opacity-60 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header & Intro --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <Target size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Winning Strategy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Casino <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Betting Tips</span>
          </h2>
        </div>

        {/* --- Section 1: Fundamentals (2 Cards) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity"><Scale size={100} className="text-blue-600" /></div>
            <div className="flex items-center gap-4 mb-4">
               <div className="p-2 bg-blue-50 rounded-lg text-blue-600 border border-blue-100"><Scale size={24} /></div>
               <h3 className="text-xl font-bold text-gray-900">Understanding the Rules</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Before stepping into online casino betting, it’s important to understand the legal side. Gambling laws in India differ from state to state, so knowing what’s allowed where you live helps you play with confidence. When you’re aware of the rules, you can enjoy casino games responsibly without unnecessary stress.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity"><ShieldCheck size={100} className="text-blue-600" /></div>
            <div className="flex items-center gap-4 mb-4">
               <div className="p-2 bg-blue-50 rounded-lg text-blue-600 border border-blue-100"><ShieldCheck size={24} /></div>
               <h3 className="text-xl font-bold text-gray-900">Selecting the Right Casino Platform</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Choosing a reliable casino platform is just as important as picking the right game. Always go for well-known websites that hold valid licenses and use secure technology to protect your data. Think of it as choosing a safe and trusted place to play. Reading genuine user reviews can also help you understand the platform’s credibility before you sign up.
            </p>
          </div>
        </div>

        {/* --- Section 2: The Checklist (Full Width) --- */}
        <div className="mb-20">
          <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100 shadow-lg relative">
             <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl transform -rotate-6 hidden md:block border border-blue-100">
               <Zap size={32} className="text-blue-600" />
             </div>
             
             <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 pl-0 md:pl-8">
               Guide to Smarter Wagering
             </h3>
             <p className="text-gray-600 mb-8 pl-0 md:pl-8 max-w-3xl">
               Use this detailed checklist to make informed casino bets. These tips help beginners and experienced players improve their online casino betting experience.
             </p>

             <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-8">
                <TipItem text="Learn the rules and payout structure of casino games." />
                <TipItem text="Understand game variations and house edge basics." />
                <TipItem text="Choose a trustworthy licensed online casino." />
                <TipItem text="Create your account and complete verification." />
                <TipItem text="Fund your account using secure payment methods." />
                <TipItem text="Explore different casino games and betting limits." />
                <TipItem text="Select games that suit your skill level and budget." />
                <TipItem text="Look for smart opportunities using strategy and timing." />
                <TipItem text="Enter your stake and confirm your bet carefully." />
                <TipItem text="Monitor gameplay and results in real time." />
                <TipItem text="Set a strict budget and play responsibly." />
             </ul>
          </div>
        </div>

        {/* --- Section 3: Strategy for Major Leagues --- */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-bold text-gray-900 mb-6">Free Tips for Popular Casino Games</h2>
           <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Understand game rules, payout ratios, and table limits before placing your bets. In games like slots, live casino, and card games, knowing volatility and bonus conditions plays a key role. For better returns, focus on smart bankroll management and choose games with higher return-to-player (RTP).
              </p>
              <div className="flex items-center justify-center gap-2 text-yellow-600 font-bold text-sm uppercase tracking-wider bg-yellow-50 py-2 px-4 rounded-full w-fit mx-auto border border-yellow-100">
                <TrendingUp size={16} /> In-Play Betting Strategy
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Markets allow you to profit from dynamic match shifts. Keep up with live updates to maximize profits.
              </p>
           </div>
        </div>

        {/* --- Section 4: League Predictions Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <LeagueCard 
            icon={<Trophy size={24} />}
            title="Slot Game Tips"
            description="Slot games are among the most popular casino options, offering fast gameplay and exciting bonuses. They come with different themes, paylines, and volatility levels, making them suitable for all types of players."
            footerText="Classic Slots, Video Slots, Progressive Jackpot Slots, 3-Reel Slots, 5-Reel Slots."
          />

          <LeagueCard 
            icon={<MapPin size={24} />}
            title="Live Casino Tips"
            description="Live casino games provide a real-time gaming experience with professional dealers. Players can interact, place bets live, and enjoy the feel of a real casino from anywhere."
            footerText="Live Roulette, Live Blackjack, Live Baccarat, Live Poker, Game Shows."
            accentColor="text-green-600"
          />

          <LeagueCard 
            icon={<MapPin size={24} />}
            title="Card Game Strategies"
            description="Card-based casino games combine skill and strategy with chance. Understanding rules, odds, and basic strategies can significantly improve your betting decisions."
            footerText="Blackjack, Poker, Baccarat, Teen Patti, Andar Bahar."
            accentColor="text-orange-600"
          />

          <LeagueCard 
            icon={<Globe size={24} />}
            title="Table Game Betting"
            description="Table games offer structured gameplay and clear betting options. These games are ideal for players who prefer calculated wagers and steady pacing."
            footerText="Roulette, Sic Bo, Craps, Dragon Tiger."
            accentColor="text-purple-600"
          />

        </div>

        {/* --- Footer Note --- */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 max-w-5xl mx-auto">
             <strong className="text-gray-900">Casino Betting Tips:</strong> Use reliable tips and expert strategies to make smarter casino bets. Understand game odds, payout patterns, and timing to maximize value, and take advantage of live casino games for better in-play opportunities.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CricketBettingTipsPage;