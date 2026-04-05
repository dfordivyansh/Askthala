import React from 'react';
import { Trophy, MousePointerClick, DollarSign, CheckCircle, HelpCircle } from 'lucide-react';

const guideData = [
  {
    step: '01',
    icon: <Trophy size={32} />,
    title: 'Choose a Casino Game',
    description: 'Start by selecting a casino game you’re comfortable with, such as slots, table games, or live casino options. Beginners should choose games with simple rules to understand gameplay before exploring advanced features.'
  },
  {
    step: '02',
    icon: <MousePointerClick size={32} />,
    title: 'Select Your Game Option',
    description: 'After choosing a game, decide how you want to play. Many casino games offer different modes, bet levels, or table limits. New players should begin with standard options that are easy to follow and manage.'
  },
  {
    step: '03',
    icon: <DollarSign size={32} />,
    title: 'Decide Your Bet Amount',
    description: 'Set your stake before playing. Start with a small amount and always play within your budget. Responsible play ensures a balanced experience while helping you enjoy the game without pressure.'
  },
  {
    step: '04',
    icon: <CheckCircle size={32} />,
    title: 'Start Playing',
    description: 'Once your game and stake are set, you’re ready to play. Review your selection and begin the game. Enjoy the experience and play at your own pace for a smooth and enjoyable session.'
  },
];

const BettingGuide = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 opacity-60 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <HelpCircle size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Beginner's Tutorial</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Casino Guide – 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
               How to Play?
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Learn how to get started with online casino games in 4 simple steps. If you’re new, don’t worry—this guide walks you through the basics clearly and confidently.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guideData.map((step, index) => (
            <div 
              key={step.step}
              className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col md:flex-row gap-6 items-start"
            >
              
              {/* Step Number Background Watermark */}
              <div className="absolute top-4 right-6 text-6xl font-black text-gray-900 opacity-[0.03] select-none pointer-events-none">
                {step.step}
              </div>

              {/* Icon Box */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 group-hover:scale-110 group-hover:border-blue-200 transition-all duration-300">
                  {step.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 pt-2">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-base">
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

export default BettingGuide;