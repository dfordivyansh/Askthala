import React from 'react';
import { CloudRain, Activity, ArrowLeftRight, Trophy, User, Zap, BarChart3, BookOpen, TrendingUp } from 'lucide-react';

const CricketBettingGuide = () => {
  return (
    <section className="bg-white py-10 md:py-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen size={14} />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            A Friendly Start to Casino Gaming
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-blue-600 pl-6">
            You don’t need to be an expert to get started with online casino betting. All it takes is a basic understanding of how games work, a little analysis, and the ability to make informed choices. With the right approach, anyone can enjoy casino gaming with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Content Cards (Spans 7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Card 1: Strategy */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Expert-Level Casino Play, Explained Clearly
                </h3>
              </div>
              
              <p className="text-gray-500 mb-6 italic">
                Learn how to:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <CloudRain className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-600 text-base">
                    Learn how different casino games work, including payouts, odds, and gameplay flow.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Activity className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-600 text-base">
                    You can analyze teams and players form
                  </p>
                </div>
                <div className="flex gap-4">
                  <ArrowLeftRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-600 text-base">
                    Analyze games and betting patterns
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-blue-600 font-medium flex items-center gap-2">
                   We simplify betting logic so you can make informed bets.
                </p>
              </div>
            </div>

            {/* Card 2: Markets */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Popular Casino Betting Markets Explained
                </h3>
              </div>

              <p className="text-gray-500 mb-6 italic">
                Popular bets include:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <Trophy size={18} className="text-yellow-600" />
                  <span className="text-gray-700 font-medium">Match Winner</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <User size={18} className="text-blue-500" />
                  <span className="text-gray-700 font-medium">Top Batsman/Bowler</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <Zap size={18} className="text-orange-500" />
                  <span className="text-gray-700 font-medium">Most Sixes</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <BarChart3 size={18} className="text-green-600" />
                  <span className="text-gray-700 font-medium">Over/Under Totals</span>
                </div>
              </div>

              <p className="text-gray-600">
                Apps like <span className="text-gray-900 font-bold">Indibet</span> and <span className="text-gray-900 font-bold">Satbet</span> also offer odds on live and in-play markets.
              </p>
            </div>

          </div>

          {/* Right Column: Image (Spans 5 columns) */}
          <div className="lg:col-span-5 h-full min-h-[300px] lg:min-h-full relative group rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            
            <img 
              src="/casino.png" 
              alt="Cricket ball and laptop showing a match" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
            />
            
            {/* Floating Badge on Image */}
            <div className="absolute bottom-8 left-8 right-8 z-20 bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-xl shadow-lg">
              <p className="text-white font-semibold text-sm text-center">
                "Analyze, Create an Opinion, Then Bet."
              </p>
            </div>
          </div>

        </div>
      </div> 
    </section>
  );
};

export default CricketBettingGuide;