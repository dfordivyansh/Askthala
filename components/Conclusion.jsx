import React from 'react';
import { Sparkles, Lightbulb, ArrowRight, Flag } from 'lucide-react';

const Conclusion = () => {
  return (
    <section className="bg-white py-10 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header --- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
            <Flag size={16} className="text-blue-600" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Final Thoughts</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Conclusion & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Key Takeaways</span>
          </h2>
        </div>

        {/* --- Content Card --- */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200  relative overflow-hidden group">

          {/* Gradient Border Effect (Top) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

            {/* Point 1 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 shadow-sm border border-yellow-100">
                <Lightbulb size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Clear & Simple Guidance</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Our casino betting guidance breaks down game rules, payouts, and strategies in a simple way. We go beyond basic casino tips—our aim is to help you clearly understand how different casino games work, so you can play smarter and with more confidence.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Insight-Driven Play</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Every casino tip we share is backed by careful analysis and a genuine passion for gaming. Our goal is not just better bets, but a more enjoyable and informed casino experience where each session feels purposeful and controlled.
                </p>
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="mt-12 text-center pt-8 border-t border-gray-100">
            <button className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors group text-lg">
              Ready to start playing smarter? <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Conclusion;