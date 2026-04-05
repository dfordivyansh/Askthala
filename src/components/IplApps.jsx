import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck, ExternalLink, Zap } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const IplApps = () => {
  const [topApps, setTopApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Fetching from 'apps' collection as per original code
      const appsQuery = query(collection(db, 'apps'), orderBy('rating', 'desc'), limit(10));
      const unsubscribe = onSnapshot(
        appsQuery,
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTopApps(docs);
          setIsLoading(false);
        },
        (err) => {
          console.error('Failed to load top apps', err);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.error('Error fetching top apps', err);
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <ShieldCheck size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Verified Real Money Apps</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">IPL Betting</span> Apps
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The best IPL betting apps allow you to bet online on famous IPL matches. Choose your favorite teams, predict the Man of the Match, and win real cash instantly.
          </p>
        </div>

        {/* --- Logo Grid (2 Columns for Rectangular Logos) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {isLoading ? (
             Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse border border-gray-200"></div>
             ))
          ) : (
            topApps.map((app) => (
            <div 
              key={app.name}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex items-center justify-center cursor-pointer h-40 overflow-hidden"
            >
              
              {/* Background Gradient Reveal on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Rectangular Image Container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img 
                  src={app.logoUrl} 
                  alt={`${app.name} Logo`} 
                  className="max-w-[80%] max-h-[80%] object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Hover Icon Overlay */}
              <div className="absolute top-4 right-4 bg-blue-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                <ExternalLink size={20} />
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-500 group-hover:w-full"></div>

            </div>
          )))}
        </div>
        
        {/* Footer Note */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-gray-500 text-sm">
          <Zap size={14} className="text-yellow-500" />
          <span>Apps updated for IPL Season 2026</span>
        </div>

      </div>
    </section>
  );
};

export default IplApps;