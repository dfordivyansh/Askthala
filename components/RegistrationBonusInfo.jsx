import React from 'react';
import { UserPlus, Gift, MousePointerClick, Settings, CreditCard, FileText, CheckCircle, ArrowRight } from 'lucide-react';

const RegistrationBonusInfo = () => {
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 opacity-60 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100 opacity-60 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Section 1: Registration Guide --- */}
        <div className="mb-20">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-blue-600 mb-4 font-bold tracking-widest uppercase text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <UserPlus size={16} />
              <span>Getting Started</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How to Register on an <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Online Casino Platform
              </span>
            </h2>
            <p className="text-lg text-gray-600 opacity-90">
              Joining a top betting site is simple. Follow this 3-step process to create your account and start playing securely.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
              <div className="absolute top-6 right-6 text-gray-200 font-black text-5xl opacity-40 group-hover:opacity-100 group-hover:text-blue-100 transition-all">01</div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 mb-6 group-hover:scale-110 transition-transform">
                <MousePointerClick size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit the Casino Website</h3>
              <p className="text-gray-600 leading-relaxed">
               Go to the official website of the online casino you want to join. Look for the <span className="text-gray-900 font-semibold">“Sign Up”, “Register”,</span> or <span className="text-gray-900 font-semibold">“Create Account”</span> button usually at the top of the page.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
              <div className="absolute top-6 right-6 text-gray-200 font-black text-5xl opacity-40 group-hover:opacity-100 group-hover:text-blue-100 transition-all">02</div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 mb-6 group-hover:scale-110 transition-transform">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fill in Your Details</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your basic information such as email address, username, and password. Make sure the details are accurate and choose a strong password for account security.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
              <div className="absolute top-6 right-6 text-gray-200 font-black text-5xl opacity-40 group-hover:opacity-100 group-hover:text-blue-100 transition-all">03</div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 mb-6 group-hover:scale-110 transition-transform">
                <Settings size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verify Your Account</h3>
              <p className="text-gray-600 leading-relaxed">
                Some casinos may ask you to verify your email or phone number. This step helps keep accounts secure and ensures smooth access later.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
              <div className="absolute top-6 right-6 text-gray-200 font-black text-5xl opacity-40 group-hover:opacity-100 group-hover:text-blue-100 transition-all">04</div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 mb-6 group-hover:scale-110 transition-transform">
                <Settings size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Set Preferences</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose settings like currency, language, or game preferences. If you have a <b>welcome bonus code</b>, you can apply it at this stage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
              <div className="absolute top-6 right-6 text-gray-200 font-black text-5xl opacity-40 group-hover:opacity-100 group-hover:text-blue-100 transition-all">05</div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 mb-6 group-hover:scale-110 transition-transform">
                <Settings size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Registration</h3>
              <p className="text-gray-600 leading-relaxed">
                Agree to the terms and conditions, submit the form, and your account will be created. You can now log in and explore the platform.
              </p>
            </div>

          </div>
        </div>

        {/* --- Section 2: Bonus Guide (Featured Card) --- */}
        <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-200  overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <Gift size={300} className="text-blue-600" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <Gift size={18} className="text-blue-600" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Maximizing Rewards</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to Claim Your <br /> Casino Bonuses?
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Claiming casino bonuses is simple and follows a clear process. Leading online casino platforms offer welcome bonuses, deposit matches, and free spins to help players get more value when they start playing.
              </p>

              <button className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors group">
                View Top Casino Bonus Offers <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
               <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <CheckCircle className="text-blue-600" size={24} />
                 Claiming Checklist
               </h3>
               
               <ul className="space-y-4">
                 <li className="flex items-start gap-4">
                   <div className="mt-1 p-1 bg-white rounded-full text-blue-600 shadow-sm">
                     <ArrowRight size={14} />
                   </div>
                   <p className="text-gray-600 text-sm leading-relaxed">
                     <strong className="text-gray-900 block text-base mb-1">Register & Verify</strong>
                     Create your casino account and complete email or phone verification to activate bonus eligibility.
                   </p>
                 </li>
                 
                 <li className="flex items-start gap-4">
                   <div className="mt-1 p-1 bg-white rounded-full text-blue-600 shadow-sm">
                     <CreditCard size={14} />
                   </div>
                   <p className="text-gray-600 text-sm leading-relaxed">
                     <strong className="text-gray-900 block text-base mb-1">Make Your First Deposit</strong>
                     Place a qualifying deposit to unlock the bonus. Most casino offers are triggered after meeting a minimum deposit requirement.
                   </p>
                 </li>

                 <li className="flex items-start gap-4">
                   <div className="mt-1 p-1 bg-white rounded-full text-blue-600 shadow-sm">
                     <FileText size={14} />
                   </div>
                   <p className="text-gray-600 text-sm leading-relaxed">
                     <strong className="text-gray-900 block text-base mb-1">Review Bonus Terms</strong>
                     Always check wagering requirements and bonus conditions to understand how bonus funds can be used and withdrawn.
                   </p>
                 </li>
               </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default RegistrationBonusInfo;