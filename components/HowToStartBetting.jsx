import React from 'react';
import { CheckCircle2, Search, UserPlus, Smartphone, Download, ShieldCheck, PlayCircle } from 'lucide-react';

const HowToStartBetting = () => {

  // Helper for the styled list items
  const StepItem = ({ children }) => (
    <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-white hover:shadow-md transition-all duration-300 group">
      <div className="mt-1 flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
        <CheckCircle2 size={20} />
      </div>
      <span className="text-gray-600 text-base leading-relaxed group-hover:text-gray-900 transition-colors">
        {children}
      </span>
    </li>
  );

  return (
    <section className="bg-white py-10 relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-100 opacity-60 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header --- */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-4 font-bold tracking-widest uppercase text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <PlayCircle size={16} />
            <span>Quick Start Guide</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How to Start Betting on a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Casino Betting App
            </span>
          </h2>

          <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 shadow-sm">
            <p className="text-lg text-gray-600 leading-relaxed">
              Getting started on a casino betting app is simple when you follow the right steps. This guide walks you through the process so you can play safely, confidently, and without confusion.
            </p>
          </div>
        </div>

        {/* --- Main Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Card 1: Find & Download */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Search size={120} className="text-blue-600" />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                <Download size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Find & Download</h3>
            </div>

            <ul className="space-y-4 relative z-10">
              <StepItem>
                Choose a reliable casino betting app that offers games like <strong className="text-gray-900">Slots, Aviator, Blackjack, Roulette</strong>, and live casino tables.
              </StepItem>
              <StepItem>
                Always download the app from the <strong className="text-gray-900">official website or app store</strong> to avoid fake or unsafe versions.
              </StepItem>
              <StepItem>
                Make sure the app supports <strong className="text-gray-900">Android or iOS</strong> and clearly shows deposit limits.
              </StepItem>
            </ul>
          </div>

          {/* Card 2: Register */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <UserPlus size={120} className="text-blue-600" />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Register & Secure</h3>
            </div>

            <ul className="space-y-4 relative z-10">
              <StepItem>
                Sign up on the app by filling in basic personal details.
              </StepItem>
              <StepItem>
                Create a strong password to protect your account and funds.
              </StepItem>
              <StepItem>
                Some platforms may ask for identity verification to keep gameplay secure.
              </StepItem>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <UserPlus size={120} className="text-blue-600" />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Join & Explore</h3>
            </div>

            <ul className="space-y-4 relative z-10">
              <StepItem>
                Log in and confirm your email or mobile number using the verification link or OTP.
              </StepItem>
              <StepItem>
                Explore different casino games, bonus sections, promotions, and account settings.
              </StepItem>
              <StepItem>
                Understanding the app layout helps you make better gaming decisions.
              </StepItem>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <UserPlus size={120} className="text-blue-600" />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Choose Game & Stake</h3>
            </div>

            <ul className="space-y-4 relative z-10">
              <StepItem>
                Select your preferred casino game such as <strong className="text-gray-900">Aviator, Slots, or Blackjack.</strong>
              </StepItem>
              <StepItem>
                Decide your bet amount carefully, keeping minimum and maximum limits in mind.
              </StepItem>
              <StepItem>
                Always review game rules and payout details before playing.
              </StepItem>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <UserPlus size={120} className="text-blue-600" />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Play & Manage Bets</h3>
            </div>

            <ul className="space-y-4 relative z-10">
              <StepItem>
                Place your bet and enjoy real-time gameplay.
              </StepItem>
              <StepItem>
                Track your winnings, bonuses, and betting history from the dashboard.
              </StepItem>
              <StepItem>
                Follow responsible gaming practices and play within your budget.
              </StepItem>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowToStartBetting;