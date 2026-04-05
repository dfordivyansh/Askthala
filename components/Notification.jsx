import React, { useState, useEffect } from 'react';
import { X, Info, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const Notification = () => {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listen for the LATEST notification from the 'notifications' collection
    const q = query(
      collection(db, "notifications"), 
      orderBy("createdAt", "desc"), 
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const latestDoc = snapshot.docs[0];
        const data = latestDoc.data();
        
        // 1. USE LOCAL STORAGE: Persists across browser sessions/restarts
        const seenId = localStorage.getItem('last_seen_notification');
        
        // Only show if the ID is different from the last one seen
        if (seenId !== latestDoc.id) {
            setNotification({
                id: latestDoc.id,
                ...data
            });
            setIsVisible(true);
            
            // Auto-hide after 10 seconds (unless it's critical)
            if (data.type !== 'critical') {
                const timer = setTimeout(() => {
                    setIsVisible(false);
                    // 2. CRITICAL FIX: Mark as seen when it auto-hides so it doesn't return on refresh
                    localStorage.setItem('last_seen_notification', latestDoc.id); 
                }, 10000);
                return () => clearTimeout(timer);
            }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 3. Mark as seen when user manually closes it
    if (notification?.id) {
        localStorage.setItem('last_seen_notification', notification.id);
    }
  };

  if (!isVisible || !notification) return null;

  // Determine styles based on notification type
  const getTypeStyles = (type) => {
    switch (type) {
      case 'error':
      case 'critical':
        return {
          bg: 'bg-white',
          border: 'border-red-100',
          shadow: 'shadow-red-500/10',
          iconBg: 'bg-red-50',
          iconColor: 'text-red-600',
          icon: <AlertTriangle size={24} />
        };
      case 'success':
        return {
          bg: 'bg-white',
          border: 'border-green-100',
          shadow: 'shadow-green-500/10',
          iconBg: 'bg-green-50',
          iconColor: 'text-green-600',
          icon: <CheckCircle size={24} />
        };
      case 'warning':
        return {
          bg: 'bg-white',
          border: 'border-orange-100',
          shadow: 'shadow-orange-500/10',
          iconBg: 'bg-orange-50',
          iconColor: 'text-orange-600',
          icon: <Bell size={24} />
        };
      default: // info
        return {
          bg: 'bg-white',
          border: 'border-blue-100',
          shadow: 'shadow-blue-500/10',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600',
          icon: <Info size={24} />
        };
    }
  };

  const styles = getTypeStyles(notification.type || 'info');

  return (
    <div className="fixed top-24 right-4 z-[9999] w-full max-w-sm animate-in slide-in-from-right-full fade-in duration-500">
      <div className={`${styles.bg} border ${styles.border} rounded-2xl p-5 shadow-2xl flex gap-4 relative overflow-hidden`}>
        
        {/* Decorative Side Bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${styles.iconBg.replace('bg-', 'bg-').replace('50', '500')}`}></div>

        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <X size={16} />
        </button>

        <div className={`flex-shrink-0 w-12 h-12 ${styles.iconBg} ${styles.iconColor} rounded-full flex items-center justify-center`}>
          {styles.icon}
        </div>

        <div className="flex-1 pt-0.5">
          <h4 className="font-bold text-gray-900 text-lg mb-1 leading-tight">
            {notification.title || "New Notification"}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {notification.message || notification.text}
          </p>
          <span className="text-[10px] text-gray-400 mt-2 block font-medium uppercase tracking-wide">
            {notification.createdAt?.toDate ? notification.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just Now'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Notification;