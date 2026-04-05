import React, { useEffect, useState } from 'react';
import { Star, ExternalLink, FileText, ShieldCheck, CheckCircle2, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={14}
          className={`mr-0.5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-xs font-bold text-gray-700">{rating}.0</span>
    </div>
  );
};

const TopBettingSites = () => {
  const [sites, setSites] = useState([]);
  
  useEffect(() => {
    try {
      const q = query(collection(db, 'betting-sites'), orderBy('rating', 'desc'), limit(20));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((s) => ({ id: s.id, ...s.data(), rating: Number(s.data().rating) || 0 }));
        setSites(docs);
      }, (err) => console.error('Failed to fetch betting sites', err));
      return () => unsubscribe();
    } catch (err) {
      console.error('Error while querying betting-sites: ', err);
    }
  }, []);

  return (
    <section className="bg-white py-10 md:py-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-2 font-bold tracking-widest uppercase text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
             <Trophy size={16} />
             <span>Official Rankings</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top Online  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Casino  Sites</span>  Worldwide 2026 
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our rankings are based on competitive odds, bonuses, and overall reliability.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {sites.map((site, index) => (
            <div key={site.id} className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="absolute top-0 left-0 bg-blue-600 text-white font-black text-xl px-4 py-2 rounded-tl-2xl rounded-br-2xl z-10 shadow-md">
                #{index + 1}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 flex flex-col sm:flex-row items-center gap-6 pl-0 sm:pl-8 pt-8 sm:pt-0">
                  <div className="w-20 h-20 bg-white border border-gray-100 rounded-2xl p-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <img src={site.logoUrl || site.logo || '/default-logo.png'} alt={`${site.name} Logo`} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                      {site.name} <CheckCircle2 size={18} className="text-blue-600" />
                    </h3>
                    <div className="mt-2 flex justify-center sm:justify-start">
                      <StarRating rating={Number(site.rating) || 0} />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 text-center border-t border-b border-gray-100 lg:border-none py-4 lg:py-0 bg-gray-50 lg:bg-transparent rounded-xl lg:rounded-none">
                  <div className="inline-flex items-center gap-1 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck size={12} /> Exclusive Welcome Bonus
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900">{site.bonusText}</h4>
                  <p className="text-[10px] text-gray-400 mt-2">18+ • T&Cs apply • Play Responsibly</p>
                </div>

                <div className="lg:col-span-3 flex flex-col gap-3">
                  <a href={site.url || '#'} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 cursor-pointer px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
                    VISIT SITE <ExternalLink size={16} strokeWidth={3} />
                  </a>
                  {/* UPDATE: Link to dynamic review page */}
                  <Link 
                    to={`/review/${site.id}`} 
                    className="w-full flex items-center justify-center gap-2 cursor-pointer px-6 py-3 bg-white border border-gray-200 text-gray-600 font-bold text-sm rounded-lg hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    <FileText size={16} /> READ REVIEW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Button (unchanged) */}
        <div className="mt-12 text-center">
           <button className="text-gray-500 hover:text-blue-600 underline decoration-dotted underline-offset-4 transition-colors font-medium">
             Show All 50+ Betting Sites
           </button>
        </div>
      </div>
    </section>
  );
};

export default TopBettingSites;