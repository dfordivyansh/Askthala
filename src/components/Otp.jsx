import React from "react";
import { X, Mail } from "lucide-react";

export default function OTP({ onClose, onGoBack, email, onVerified }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="flex flex-col md:flex-row rounded-[37px] overflow-hidden shadow-2xl border border-white bg-white w-full max-w-[900px]">
        
        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-center relative">
           <button onClick={onClose} className="md:hidden absolute top-4 right-4 text-white/80 hover:text-white transition-colors"><X /></button>
           <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Almost There</h2>
           <p className="text-blue-100 text-lg leading-relaxed">Verify your email to activate your account and start winning.</p>
        </div>
        
        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white text-gray-900 p-8 flex flex-col justify-center text-center relative">
           <button onClick={onClose} className="hidden md:block absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"><X /></button>
           
           <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
               <Mail size={40} />
             </div>
           </div>

           <h2 className="text-2xl font-bold mb-2 text-gray-900">Check Your Inbox</h2>
           <p className="text-gray-600 text-sm mb-8 leading-relaxed">
             We have sent a verification link to <strong className="text-gray-900">{email || "your email"}</strong>. <br/>
             Please click the link in your email to verify.
           </p>

           {/* Manual Trigger Button */}
           <button 
             onClick={onVerified} 
             className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
           >
             I Verified My Email
           </button>
           
           <div className="mt-6">
             <button onClick={onGoBack} className="text-blue-600 text-sm hover:text-blue-800 underline transition-colors font-medium">
               Back
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}