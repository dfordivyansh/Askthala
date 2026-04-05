import React, { useEffect, useState } from 'react';
import { Trophy, Crown } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const Top10Apps = () => {
  const [topApps, setTopApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
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
      
      {/* Background Glow */}
      

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Top Text (Centered) --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 mb-6 shadow-sm">
             <Crown size={16} className="text-yellow-600" />
             <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">Elite Rankings</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Top 10 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Online Casino Apps</span> <br className="hidden md:block" /> Worldwide for 2026
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our curated list of the most trusted, feature-rich, and user-friendly online casino apps available globally. These platforms are selected for their smooth performance, secure systems, and engaging casino gaming experience.
          </p>
        </div>

        {/* --- Grid Container for the logos --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-8 justify-items-center">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={`s-${i}`} className="group flex flex-col items-center justify-center lg:col-start-1">
                <div className="relative mb-6">
                  <div className="bg-gray-100 rounded-full w-32 h-32 animate-pulse" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            ))
          ) : (
            topApps.map((app, index) => {
            // Logic to center the last two items in the 3rd row on lg screens (4-4-2 layout)
            const isLastRowFirstItem = (index === 8); 
            let colStartClass = '';
            if (isLastRowFirstItem) {
              colStartClass = 'lg:col-start-2'; 
            }

            return (
              <div
                key={app.id || app.name}
                className={`group flex flex-col items-center justify-center ${colStartClass}`}
              >
                {/* Circular Logo Container */}
                <div className="relative mb-6 transition-transform duration-300 transform group-hover:-translate-y-2">
                  
                  {/* Rank Badge */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white font-black flex items-center justify-center rounded-full border-2 border-white z-20 shadow-md">
                    {index + 1}
                  </div>

                  {/* Glowing Halo Effect behind circle */}
                  <div className="absolute inset-0 bg-blue-200 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 transform scale-110"></div>

                  {/* Logo Circle */}
                  <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-100 group-hover:border-blue-500 transition-colors duration-300 overflow-hidden p-4">
                    <img
                      src={app.imageUrl || app.logoUrl}
                      alt={`${app.name} Logo`}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* App Name */}
                <h3 className="text-gray-900 text-xl font-bold tracking-wide group-hover:text-blue-600 transition-colors duration-300">
                    {app.name}
                </h3>
                <div className="w-8 h-1 bg-gray-200 rounded-full mt-2 group-hover:bg-blue-600 group-hover:w-16 transition-all duration-300"></div>
              </div>
            );
          }))}
        </div>

      </div>
    </section>
  );
};

export default Top10Apps;