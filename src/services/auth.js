import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  
} from 'firebase/auth';

// Setup reCAPTCHA verifier and return it (re-use if exists)
// export function setupRecaptcha(containerId = 'recaptcha-container') {
//   if (typeof window === 'undefined') return null;
//   if (window.recaptchaVerifier) return window.recaptchaVerifier;

//   const verifier = new RecaptchaVerifier(
//     containerId,
//     {
//       size: 'invisible',
//     },
//     auth
//   );

//   verifier.render();
//   window.recaptchaVerifier = verifier;
//   return verifier;
// }

// Create a new user with email/password
export async function signupWithEmail({ name, email, password }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  return userCredential;
}

// Login with email/password
export async function loginWithEmail({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential;
}

// Sign out
export async function signOut() {
  return firebaseSignOut(auth);
}

// Send phone verification code (returns verificationId)
// export async function sendPhoneVerification(phoneNumber, verifier) {
//   // PhoneAuthProvider.verifyPhoneNumber returns a verificationId
//   const provider = new PhoneAuthProvider(auth);
//   const verificationId = await provider.verifyPhoneNumber(phoneNumber, verifier);
//   return verificationId;
// }

// Verify phone code and link to current user
// export async function verifyPhoneAndLink(verificationId, code) {
//   const credential = PhoneAuthProvider.credential(verificationId, code);
//   // Link credential to current logged-in user
//   const result = await linkWithCredential(auth.currentUser, credential);
//   return result; // contains user
// }

// export async function loginWithPhone(phoneNumber, verifier) {
//   const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
//   return confirmationResult; // confirmationResult.confirm(code) to complete sign in
// }
