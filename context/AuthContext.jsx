import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../config/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Signup Workflow
  const signup = async (email, password, name) => {
    try {
      // DEBUG ALERT 1
      alert(`Starting signup for: ${email}`);
      
      // A. Create Authentication User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // DEBUG ALERT 2
      alert(`User Created! UID: ${user.uid}`);

      // B. Set Display Name
      await updateProfile(user, { displayName: name });

      // C. Send Verification Email
      await sendEmailVerification(user);
      
      // DEBUG ALERT 3
      alert("Email verification sent.");

      // D. Save User Data to Firestore
      // DEBUG ALERT 4
      alert("Saving to database...");
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: "user", 
        status: "Active", 
        joined: new Date().toLocaleDateString() 
      });
      
      // DEBUG ALERT 5
      alert("Saved to database! Success!");

      return userCredential;
    } catch (error) {
      // DEBUG ALERT ERROR
      alert(`ERROR: ${error.message}`);
      console.error("Signup Error Details:", error);
      throw error; 
    }
  };

  /**
   * Attempt to sign a user in. If the account exists but email is not verified,
   * this function will send a verification email, sign the user out and throw
   * an error with code 'auth/email-not-verified'. This centralizes the logic
   * so callers don't have to repeat checks.
   */
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      // Send verification email and sign the user back out so they can't be treated as logged-in.
      try {
        await sendEmailVerification(user);
      } catch (err) {
        console.warn("Failed to send verification email during login check:", err);
      }
      // ensure we don't leave a signed-in session
      await signOut(auth);
      const e = new Error("Email is not verified. A verification email was sent.");
      e.code = "auth/email-not-verified";
      throw e;
    }
    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Helper to resend a verification email for a given credentials pair.
  // Signs in temporarily to send verification, then signs out again.
  const resendVerification = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      return true;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    resendVerification,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};