import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { auth, db } from "../../src/config/firebase"; 
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import OTP from "./Otp"; 

export default function Signup({ onClose, onLoginClick }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState(""); // Added state for Mobile
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    // State to toggle between Signup form and OTP (verification) screen
    const [showVerificationScreen, setShowVerificationScreen] = useState(false);
    
    const checkIntervalRef = useRef(null);

    const validateEmail = (value) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(value).toLowerCase());
    };

    const handleSignup = async () => {
        setError("");
        
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedMobile = mobile.trim();

        if (!trimmedName) { setError("Please enter your full name."); return; }
        if (trimmedName.length < 2) { setError("Name must be at least 2 characters long."); return; }
        if (!trimmedEmail) { setError("Please enter your email address."); return; }
        if (!validateEmail(trimmedEmail)) { setError("Invalid email format."); return; }
        if (!password) { setError("Please enter a password."); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters long."); return; }
        if (password !== confirmPassword) { setError("Passwords do not match."); return; }

        setLoading(true);
        try {
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
            const user = userCredential.user;

            // 2. Update Profile Name
            await updateProfile(user, { displayName: trimmedName });

            // 3. SAVE TO DATABASE (Firestore)
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: trimmedName,
                email: trimmedEmail,
                mobile: trimmedMobile || "N/A", // Save mobile number here
                role: "user",
                status: "Active",
                joined: new Date().toISOString().split('T')[0] // YYYY-MM-DD
            });

            // 4. Send Verification Email
            await sendEmailVerification(user);
            
            // 5. Switch to OTP/Verification Screen
            setShowVerificationScreen(true);

            // 6. Start Polling for Verification (Checks every 2.5s)
            checkIntervalRef.current = setInterval(async () => {
                try {
                    const u = auth.currentUser;
                    if (!u) return;
                    
                    // Critical: Reload user to get latest 'emailVerified' status from server
                    await u.reload(); 
                    
                    if (u.emailVerified) {
                        handleVerificationSuccess();
                    }
                } catch (err) {
                    console.error("Verification poll error:", err);
                }
            }, 2500); 

        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError("Email is already in use. Please login.");
            } else {
                setError(err.message || "Failed to sign up.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationSuccess = async () => {
        if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        
        // Sign out to force a fresh login with the verified token
        await signOut(auth); 
        
        alert("Email verified successfully! Please log in.");
        
        onClose();       // Close Signup/OTP Modal
        onLoginClick();  // Switch to Login Modal
    };

    // Clean up polling interval on unmount
    useEffect(() => {
        return () => {
            if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        };
    }, []);

    // Manual check triggered by "I Verified My Email" button
    const manualCheck = async () => {
        try {
            const u = auth.currentUser;
            if (!u) return;
            await u.reload();
            if (u.emailVerified) {
                handleVerificationSuccess();
            } else {
                alert("Email not verified yet. Please check your inbox or spam folder.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // --- RENDER: Verification Screen ---
    if (showVerificationScreen) {
        return (
            <OTP 
                email={email} 
                onClose={onClose} 
                onGoBack={() => {
                    // Stop polling if they go back to fix email
                    if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
                    setShowVerificationScreen(false);
                }}
                onVerified={manualCheck}
            />
        );
    }

    // --- RENDER: Signup Form ---
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className="flex flex-col md:flex-row rounded-[37px] overflow-hidden shadow-2xl border border-white bg-white w-full max-w-[1108px] max-h-[90vh] md:h-[625px]">
                
                {/* Left Side (Visuals) */}
                <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-start text-white p-6 md:p-8 text-start relative">
                    <button onClick={onClose} className="absolute cursor-pointer top-4 right-4 text-white/80 hover:text-white transition-colors block md:hidden"><X size={20} /></button>
                    <h2 className="font-inter font-bold uppercase text-xl md:text-[26px] leading-[30px] md:leading-[40px] tracking-normal mb-2">
                        <span className="block md:hidden">Predict, Bet, and Win</span>
                        <span className="hidden md:block">Maximize Your Winnings <br /> With Expert Casino Insights.</span>
                    </h2>
                    <p className="font-inter font-medium text-sm md:text-[15px] leading-[20px] md:leading-[29.16px] text-blue-100 mb-4 md:mb-6 tracking-normal">
                        Discover top-rated betting apps, exclusive odds, and daily match predictions to stay ahead of the game.
                    </p>
                    <img src="/login.png" alt="Signup Visual" className="hidden md:block object-contain w-full max-w-[577px] h-auto max-h-[390px] drop-shadow-xl" />
                </div>

                {/* Right Side (Form) */}
                <div className="w-full md:w-1/2 bg-white text-gray-900 p-6 md:p-8 relative overflow-y-auto flex-1 flex flex-col justify-center">
                    <button onClick={onClose} className="absolute cursor-pointer top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors hidden md:block"><X size={24} /></button>

                    <div className="mt-8 md:mt-24 mb-4 md:mb-6">
                        <p className="text-gray-500 text-sm mb-2">Let's get started</p>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Create an Account</h2>
                    </div>

                    <div className="space-y-5">
                        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-2 text-center shadow-sm">{error}</div>}
                        
                        <div className="relative w-full group">
                            <label className="absolute -top-3 left-4 bg-white px-1 text-sm text-blue-600 font-medium">Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Enter your name" 
                                className="w-full px-4 py-3 text-center bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" 
                            />
                        </div>
                        
                        <div className="relative w-full group">
                            <label className="absolute -top-3 left-4 bg-white px-1 text-sm text-blue-600 font-medium">Email address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Enter your email" 
                                className="w-full px-4 py-3 text-center bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" 
                            />
                        </div>

                        {/* NEW: Mobile Number Field */}
                        <div className="relative w-full group">
                            <label className="absolute -top-3 left-4 bg-white px-1 text-sm text-blue-600 font-medium">Mobile Number</label>
                            <input 
                                type="tel" 
                                value={mobile} 
                                onChange={(e) => setMobile(e.target.value)} 
                                placeholder="Enter mobile number" 
                                className="w-full px-4 py-3 text-center bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" 
                            />
                        </div>

                        <div className="relative w-full group">
                            <label className="absolute -top-3 left-4 bg-white px-1 text-sm text-blue-600 font-medium">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Enter password" 
                                className="w-full px-4 py-3 text-center bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" 
                            />
                        </div>
                        
                        <div className="relative w-full group">
                            <label className="absolute -top-3 left-4 bg-white px-1 text-sm text-blue-600 font-medium">Confirm Password</label>
                            <input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                placeholder="Confirm password" 
                                className="w-full px-4 py-3 text-center bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" 
                            />
                        </div>
                        
                        <button 
                            onClick={handleSignup} 
                            disabled={loading} 
                            className="w-full py-3 bg-blue-600 text-white cursor-pointer font-bold rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? "Registering..." : "Sign Up"}
                        </button>
                    </div>
                    
                    <div className="text-center mt-6 md:mt-8">
                        <span className="text-gray-500">Already have an account? </span>
                        <button 
                            onClick={() => { onClose(); onLoginClick(); }} 
                            className="text-blue-600 font-bold cursor-pointer hover:text-blue-800 hover:underline transition-colors"
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}