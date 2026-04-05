import React, { useState, useEffect } from 'react';
import { Smartphone, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const BestIplApps = () => {
  const [sites, setSites] = useState([]);
  
  useEffect(() => {
    try {
      const q = query(collection(db, 'betting-sites'), orderBy('rating', 'desc'), limit(20));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((s) => ({ id: s.id, ...s.data(), rating: Number(s.data().rating) || 0 }));
        setSites(docs);
      }, (err) => {
        console.error('Failed to fetch betting sites', err);
      });
      return () => unsubscribe();
    } catch (err) {
      console.error('Error while querying betting-sites: ', err);
    }
  }, []);

  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
             <ShieldCheck size={16} className="text-blue-600" />
             <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">100% Safe & Legal Apps</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Casino Apps</span> <br /> for Real Money Gaming
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Casino apps provide a great way to enjoy exciting games on your mobile device. <br /> We guide you towards the best apps for real money gaming.
          </p>
        </div>

        {/* --- Logo Grid --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {sites.map((app, index) => (
            <a 
              href={app.link}
              target="_blank" 
              rel="noopener noreferrer"
              key={`${app.name}-${index}`}
              className="group relative bg-white rounded-2xl p-4 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-center block cursor-pointer"
            >
              
              {/* App Icon Container */}
              <div className="relative w-20 h-20 bg-white rounded-2xl p-3 flex items-center justify-center shadow-sm border border-gray-100 mb-4 overflow-hidden">
                <img 
                  src={app.logoUrl} 
                  alt={`${app.name} Logo`} 
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-gray-900 font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                {app.name}
                <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
              </h3>
              
              {/* Fake Star Rating */}
              <div className="flex items-center gap-1">
                 <Star size={12} className="text-yellow-400 fill-yellow-400" />
                 <span className="text-xs text-gray-500 font-medium">4.{8 + (index % 2)}/5</span>
              </div>

            </a>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default BestIplApps;