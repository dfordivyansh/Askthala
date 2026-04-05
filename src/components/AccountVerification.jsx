import React from 'react';
import { ShieldCheck, FileText, UserCheck, Upload, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

const AccountVerification = () => {
  return (
    <section className="bg-white py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-100 opacity-60 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-green-100 opacity-60 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <UserCheck size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">KYC Process</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Casino Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Verification</span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed opacity-90">
           Casino account verification, commonly known as <b>KYC (Know Your Customer)</b>, is a standard security process used by online casinos. It helps protect players, enables smooth withdrawals, and ensures fair and responsible gameplay.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* --- Left Column: Requirements (Spans 5) --- */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                  <FileText size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Required Documents</h3>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-600">
                  <h4 className="text-gray-900 font-bold mb-2">Identity Verification</h4>
                  <p className="text-sm text-gray-600">
                    Players are required to submit valid identification to confirm their identity. Commonly accepted documents include:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-500">
                    <li>• Government-issued ID (Passport or National ID)</li>
                    <li>• Driving License</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-green-500">
                  <h4 className="text-gray-900 font-bold mb-2">Address / Payment Proof</h4>
                  <p className="text-sm text-gray-600">
                    Some casinos may request additional documents to confirm account ownership, such as:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-500">
                    <li>• Utility bill or bank statement</li>
                    <li>• Payment method verification (card or wallet screenshot)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Column: Steps (Spans 7) --- */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl">
               <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                 <ShieldCheck className="text-blue-600" /> Verification Steps
               </h3>

               <div className="space-y-8 relative">
                 {/* Vertical Line */}
                 <div className="absolute top-4 left-6 w-0.5 h-[85%] bg-gray-200 -z-10"></div>

                 {/* Step 1 */}
                 <div className="flex gap-6">
                   <div className="w-12 h-12 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold shadow-sm">1</div>
                   <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-1">Log In to Your Casino Account</h4>
                     <p className="text-gray-600 text-sm">
                      Access your account dashboard and open the <strong className="text-gray-900">Profile</strong> or <strong className="text-gray-900">Verification</strong> section. 
                     </p>
                   </div>
                 </div>

                 {/* Step 2 */}
                 <div className="flex gap-6">
                   <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 text-gray-500 font-bold shadow-sm">2</div>
                   <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-1">Submit Personal Details</h4>
                     <p className="text-gray-600 text-sm">
                       Enter accurate information such as your full name, date of birth, country, and contact details. These must match your documents.
                     </p>
                   </div>
                 </div>

                 {/* Step 3 */}
                 <div className="flex gap-6">
                   <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 text-gray-500 font-bold shadow-sm">3</div>
                   <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-1">Upload Documents</h4>
                     <p className="text-gray-600 text-sm">
                       Upload clear images of the required documents. Make sure all details are visible and readable.
                     </p>
                   </div>
                 </div>

                 <div className="flex gap-6">
                   <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 text-gray-500 font-bold shadow-sm">3</div>
                   <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-1">Review & Approval</h4>
                     <p className="text-gray-600 text-sm">
                       After submission, the casino reviews your documents. Verification is usually completed within <b>24–48 hours.</b>
                     </p>
                   </div>
                 </div>

                 {/* Step 4 */}
                 <div className="flex gap-6">
                   <div className="w-12 h-12 bg-green-50 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0 text-green-600 font-bold shadow-sm">
                     <CheckCircle2 size={20} />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-1"> Account Activated</h4>
                     <p className="text-gray-600 text-sm">
                       Once approved, withdrawals and full account features are unlocked.
                     </p>
                   </div>
                 </div>

               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AccountVerification;