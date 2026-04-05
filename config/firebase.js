import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyD_mcnwvBGFx6t7o5EenqinuyxnmEPwrjU",
  authDomain: "betting-app-ce5df.firebaseapp.com",
  projectId: "betting-app-ce5df",
  storageBucket: "betting-app-ce5df.firebasestorage.app",
  messagingSenderId: "1067344919626",
  appId: "1:1067344919626:web:117568f46ccd7a239c3ab3",
  measurementId: "G-B54JGJK1XK"
};




const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;

