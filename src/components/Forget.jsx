import React, { useState } from "react";
import { ChevronLeft, X, Mail, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Forget({ onClose, onLoginClick }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);
      
      // Call Firebase reset password function
      await resetPassword(email);
      
      setMessage("Check your inbox for password reset instructions.");
    } catch (err) {
      console.error("Reset Error:", err);
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Invalid email format.");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="flex flex-col md:flex-row rounded-[37px] overflow-hidden shadow-2xl bg-white w-full max-w-[1108px] max-h-[90vh] md:h-[625px]">

        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-start text-white p-6 md:p-8 text-start relative">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-white/80 hover:text-white block md:hidden"
          >
            <X size={20} />
          </button>

          <h2 className="font-inter font-bold uppercase text-xl md:text-[26px] leading-[30px] md:leading-[40px] tracking-normal mb-2">
            <span className="block md:hidden">Recover Account</span>
            <span className="hidden md:block">Don't Worry, <br /> We've Got You Covered.</span>
          </h2>

          <p className="font-inter font-medium text-sm md:text-[15px] leading-[20px] md:leading-[29.16px] text-blue-100 mb-4 md:mb-6 tracking-normal">
            Enter your registered email address and we'll send you a link to reset your password instantly.
          </p>

          <img
            src="/freebet-bonus.png"
            alt="Reset Password"
            className="hidden md:block object-contain w-full max-w-[577px] h-auto max-h-[390px] drop-shadow-xl"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white text-gray-900 relative overflow-y-auto flex flex-col items-center justify-center p-6 md:p-8 flex-1">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-3 md:top-6 right-6 text-gray-400 hover:text-gray-900 hidden md:block transition-colors"
          >
            <X size={24} />
          </button>

          <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <Mail size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Forgot Password?</h2>
                <p className="text-gray-500 text-sm mt-2">No worries, we'll send you reset instructions.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-lg mb-6 text-center">
                {message}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-6">
              <div className="relative w-full group">
                <label className="absolute -top-3 left-4 bg-white px-1 text-sm text-blue-600 font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); setMessage(""); }}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-center bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                    <>Sending <Loader size={18} className="animate-spin" /></>
                ) : (
                    "Reset Password"
                )}
              </button>
            </form>

            <div className="flex justify-center mt-8">
              <button
                onClick={onLoginClick}
                className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm gap-1"
              >
                <ChevronLeft size={16} />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}