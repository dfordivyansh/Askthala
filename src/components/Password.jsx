import React, { useState } from "react";
import { ChevronLeft, X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Password({ onClose, onGoBack, onContinue, signupData }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth(); 

  const handleContinue = async () => {
    // 1. Password Validation
    if (!password || !confirmPassword) { 
        setError("Password fields cannot be empty."); 
        return; 
    }
    if (password !== confirmPassword) { 
        setError("Passwords do not match."); 
        return; 
    }
    if (password.length < 6) { 
        setError("Password must be at least 6 characters long."); 
        return; 
    }

    try {
        setError("");
        setLoading(true);
        
        // 2. Data Integrity Check (Backup Validation)
        // This ensures we don't send bad data to Firebase
        if (!signupData || !signupData.email || !signupData.email.includes('@')) {
            throw new Error("Invalid email data received. Please go back and correct it.");
        }

        console.log("Creating account for:", signupData.email);

        // 3. Trigger Signup
        await signup(signupData.email, password, signupData.name);
        
        // Success
        onContinue(); 
    } catch (err) {
        console.error("Signup Failed:", err);
        
        // Handle specific Firebase errors cleanly
        if (err.code === 'auth/email-already-in-use') {
            setError("This email is already registered. Please log in instead.");
        } else if (err.code === 'auth/weak-password') {
            setError("Password is too weak. Choose a stronger one.");
        } else if (err.code === 'auth/invalid-email') {
            setError("The email address is invalid.");
        } else {
            setError(err.message || "Failed to create account. Please try again.");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="flex flex-col md:flex-row rounded-[37px] overflow-hidden shadow-2xl border border-white bg-white w-full max-w-[1108px] h-auto md:h-[625px]">
        
        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-center relative">
           <button onClick={onClose} className="md:hidden absolute top-4 right-4 text-white/80 hover:text-white transition-colors"><X /></button>
           <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Secure Setup</h2>
           <p className="text-blue-100 mb-6 text-lg leading-relaxed">Set a strong password to protect your winnings and keep your account safe.</p>
           <img src="/freebet-bonus.png" className="hidden md:block object-contain max-h-[300px] drop-shadow-lg" alt="Bonus" />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white text-gray-900 p-8 flex flex-col justify-center relative">
           <button onClick={onClose} className="hidden md:block absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"><X /></button>
           <h2 className="text-2xl font-bold mb-6 text-gray-900">Set Password</h2>
           
           {error && (
               <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-6 text-center shadow-sm">
                   {error}
               </div>
           )}

           <div className="space-y-6">
             <div className="relative group">
                <label className="absolute -top-3 left-4 bg-white px-1 text-sm text-blue-600 font-medium">Password</label>
                <input 
                    type={showPass ? "text" : "password"} 
                    placeholder="Enter password" 
                    value={password} 
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if(error) setError("");
                    }} 
                    className="w-full bg-white border border-gray-300 rounded-full px-4 py-3 text-gray-900 text-center focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder-gray-400 pr-12" 
                />
                <button 
                  onClick={() => setShowPass(!showPass)} 
                  className="absolute right-4 top-3 text-gray-400 hover:text-blue-600 transition-colors"
                  type="button"
                >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
             </div>

             <div className="relative group">
                <label className="absolute -top-3 left-4 bg-white px-1 text-sm text-blue-600 font-medium">Confirm Password</label>
                <input 
                    type={showPass ? "text" : "password"} 
                    placeholder="Confirm password" 
                    value={confirmPassword} 
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if(error) setError("");
                    }} 
                    className="w-full bg-white border border-gray-300 rounded-full px-4 py-3 text-gray-900 text-center focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder-gray-400" 
                />
             </div>

             <button 
                onClick={handleContinue} 
                disabled={loading} 
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
             >
                {loading ? "Creating Account..." : "Create Account"}
             </button>

             <div className="flex justify-center mt-4">
               <button 
                 onClick={onGoBack} 
                 disabled={loading} 
                 className="flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
               >
                 <ChevronLeft size={16} className="mr-1" /> Back
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}