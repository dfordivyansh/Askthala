import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/firebase';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Password from "./components/Password";
import OTP from "./components/Otp";
import Forget from "./components/Forget";
import Message from './components/Message';
import Notification from './components/Notification';
import BlogDetailPage from './components/BlogDetailPage';

// Pages
import Home from './pages/Home';
import Sites from './pages/Sites';
import BettingApp from './pages/BettingApp';
import Tips from './pages/Tips';
import Blog from './pages/Blog';
import Review from './pages/Review';
import Complain from './pages/Complain';
import Dashboard from './pages/Dashboard';
import ComplainApply from './pages/ComplainApply';

// Admin Pages & Components
import AdminLogin from './pages/Admin/Login';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import AdminDashboard from './pages/Admin/Dashboard'; 
import BettingSitesManager from './pages/Admin/BettingSite';
import BettingTipsManager from './pages/Admin/BettingTips';
import CricketBookmakersManager from './pages/Admin/Bookmark';
import IPLBettingAppsManager from './pages/Admin/Betting';
import BlogManager from './pages/Admin/Blog';
import UserTableSection from './pages/Admin/UserTable';
import ComplainDashboard from './pages/Admin/ComplainDashboard';
import NotificationsManager from './pages/Admin/Notifications';
import AnnouncementsManager from './pages/Admin/Announcements'; // NEW IMPORT

const AppContent = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
  const location = useLocation();
  const [user, setUser] = useState(null); 
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Modal States
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // If user logs in...
      if (currentUser) {
        setShowLogin(false);
        
        // Only close the Signup modal if the email is verified.
        // If it's NOT verified, it means the user just signed up 
        // and we need to keep the modal open to show the OTP screen.
        if (currentUser.emailVerified) {
            setShowSignup(false);
        }
        
        // Close other modals irrelevant to verification
        setShowForgotPassword(false);
        setShowOTP(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleLoginClick = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <>
      <ScrollToTop /> 
      
      {/* Show Navbar only on non-admin routes */}
      {!isAdminRoute && (
        <Navbar 
          onLoginClick={handleLoginClick}
          user={user} 
          onLogout={handleLogout}
        />
      )}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/apps" element={<BettingApp />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        {/* Updated Route for Dynamic Review Pages */}
        <Route path="/review/:id" element={<Review />} />
        <Route path="/complain" element={<Complain />} />
        <Route path='/register-complain' element={<ComplainApply/>}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        
        <Route 
          path="/admin/betting-sites" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <BettingSitesManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/betting-tips" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <BettingTipsManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/cricket-bookmakers" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <CricketBookmakersManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/ipl-betting-apps" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <IPLBettingAppsManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/blog" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <BlogManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/user" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <UserTableSection setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/complaint" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <ComplainDashboard setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/notifications" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <NotificationsManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
        {/* NEW: Announcements Route */}
        <Route 
          path="/admin/announcements" 
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <AnnouncementsManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
      </Routes>

      {/* --- Modals --- */}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSignupClick={handleSignupClick}
          onForgotPassword={() => {
            setShowLogin(false);
            setShowForgotPassword(true);
          }}
        />
      )}

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onLoginClick={handleLoginClick}
          onContinue={() => {
            setShowSignup(false);
            setShowPassword(true);
          }}
        />
      )}

      {showPassword && (
        <Password
          onClose={() => setShowPassword(false)}
          onGoBack={() => {
            setShowPassword(false);
            setShowSignup(true);
          }}
          onContinue={() => {
            setShowPassword(false);
            setShowOTP(true);
          }}
        />
      )}

      {showOTP && (
        <OTP
          onClose={() => setShowOTP(false)}
          onGoBack={() => {
            setShowOTP(false);
            setShowForgotPassword(true);
          }}
          onContinue={() => {
            setShowOTP(false);
          }}
        />
      )}

      {showForgotPassword && (
        <Forget
          onClose={() => setShowForgotPassword(false)}
          onLoginClick={() => {
            setShowForgotPassword(false);
            setShowLogin(true);
          }}
          onContinue={() => {
            setShowForgotPassword(false);
            setShowOTP(true);
          }}
        />
      )}
      
      {/* Global Elements only for non-admin */}
      {!isAdminRoute && <Message />}
      {!isAdminRoute && <Notification />}
      {!isAdminRoute && <Footer />}
    </>
  )
}

const App = () => {
  // Check for admin token on initial load
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  return (
    <Router>
      <AppContent isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />
    </Router>
  )
}

export default App;