import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Star, Award } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const RecommendedBookmakers = () => {
  const [bookmakers, setBookmakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        try {
          // Query top bookmakers by rating. We still sort client-side as a fallback in case rating
          // is stored as string in some documents.
          const appsQuery = query(collection(db, 'bookmakers'), orderBy('rating', 'desc'), limit(12));
          const unsubscribe = onSnapshot(
            appsQuery,
            (snapshot) => {
              const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
              // Defensive casting: ensure rating is a number for correct client ordering
              const normalized = docs.map((d) => ({ ...d, rating: Number(d.rating) || 0 }));
              normalized.sort((a, b) => b.rating - a.rating);
              setBookmakers(normalized.slice(0, 4));
              setIsLoading(false);
            },
            (err) => {
              console.error('Failed to load top bookmaker', err);
              setIsLoading(false);
            }
          );
          return () => unsubscribe();
        } catch (err) {
          console.error('Error fetching top bookmaker', err);
          setIsLoading(false);
        }
      }, []);
      
  return (
    <section className="bg-white py-10 md:py-10 relative overflow-hidden">
      
      {/* Background decorative element */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <ShieldCheck size={16} className="text-blue-600" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">100% Verified & Safe</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Most Recommended <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Casino Bookmakers</span>
          </h2>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Here is the list of some new Casino betting sites picked on the basis of trust, offers, and user experience:
            </p>
            <p className="text-sm text-gray-500 opacity-90">
              These apps also offer best Casino betting tips Telegram channel access and support Casino formats legally. You can enjoy betting on sports and online casino and have fun.
            </p>
          </div>
        </div>

        {/* Bookmakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse group relative bg-white rounded-2xl p-6 flex flex-col items-center justify-between border border-gray-200 shadow-sm"
              >
                <div className="absolute top-4 left-4 bg-gray-200 w-8 h-8 rounded-full" />
                <div className="absolute top-4 right-4 w-14 h-6 rounded-full bg-gray-200" />
                <div className="w-full h-32 flex items-center justify-center mb-6 bg-gray-100 rounded-xl p-4" />
                <div className="w-full text-center">
                  <div className="h-6 w-3/4 bg-gray-200 mx-auto rounded mb-3" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
                </div>
              </div>
            ))
          ) : (
            bookmakers.length === 0 ? (
              <div className="col-span-4 text-center text-gray-500 py-8">No bookmakers found.</div>
            ) : (
              bookmakers.map((bookmaker, index) => (
            <div 
              key={bookmaker.id || bookmaker.name}
              className="group relative bg-white rounded-2xl p-6 flex flex-col items-center justify-between border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              
              {/* Ranking Badge */}
              <div className="absolute top-4 left-4 bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 font-bold text-sm group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {index + 1}
              </div>

              {/* Rating Badge (Top Right) */}
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-gray-900 text-xs font-bold">{bookmaker.rating}</span>
              </div>

              {/* Logo Area */}
              <div className="w-full h-32 flex items-center justify-center mb-6 bg-gray-50 rounded-xl p-4 group-hover:bg-white group-hover:shadow-inner transition-all border border-transparent group-hover:border-gray-100">
                <img
                  src={bookmaker.logoUrl || bookmaker.logo || '/default-logo.png'}
                  alt={`${bookmaker.name} Logo`}
                  className="max-w-full max-h-full object-contain drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300" 
                />
              </div>

              {/* Name & Action */}
              <div className="w-full text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {bookmaker.name}
                </h3>
                
                {bookmaker.link ? (
                  <a
                    href={bookmaker.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex py-2.5 rounded-lg bg-gray-100 text-gray-900 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    Visit Site <ArrowRight size={16} />
                  </a>
                ) : (
                  <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-400 font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2">
                    No Link
                  </button>
                )}
              </div>

            </div>
            ))
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-16 text-center">
          <button 
            className="inline-flex items-center cursor-pointer px-10 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg rounded-full 
                       hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/20"
          >
            <Award size={22} className="mr-3" />
            SEE ALL BOOKMAKERS
          </button>
        </div>

      </div>
    </section>
  );
};

export default RecommendedBookmakers;