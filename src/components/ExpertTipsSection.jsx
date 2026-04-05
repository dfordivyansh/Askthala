import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// fetch tips from Firestore

const ExpertTipsSection = () => {
  const [tipsData, setTipsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const tipsQuery = query(collection(db, 'betting-tips'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        tipsQuery,
        (snapshot) => {
          const docs = snapshot.docs.map((ds) => ({ id: ds.id, ...ds.data() }));
          if (docs.length > 0) console.info('Loaded betting tips count', docs.length);
          setTipsData(docs);
          setIsLoading(false);
        },
        (err) => {
          console.error('Failed to load betting tips:', err);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.error('Error fetching tips:', err);
      setIsLoading(false);
    }
  }, []);
  
  return (
    <section className="bg-white py-10 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
               <TrendingUp size={20} />
               <span className="font-bold tracking-wider text-sm uppercase">Hot Predictions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Today's Expert Casino Betting Tips
            </h2>
          </div>
          
          <button 
            className="hidden md:inline-flex group items-center text-gray-600 font-semibold text-base transition-colors hover:text-blue-600"
          >
            View All Tips
            <span className="ml-2 bg-gray-100 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
               <ArrowRight size={18} />
            </span>
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isLoading && tipsData.length === 0 && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No tips available at the moment.</p>
            </div>
          )}
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <article key={`skeleton-${i}`} className="animate-pulse group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="relative h-56 bg-gray-200" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2 mt-4"></div>
                </div>
              </article>
            ))
          ) : (
            tipsData.map((tip, idx) => (
            <article 
              key={tip.id || `tip-${idx}`} 
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              
              {/* Image Container */}
                <div className="relative h-full overflow-hidden">
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#172a46] to-transparent opacity-60 z-10" /> */}
                <img 
                  src={tip.imageUrl || tip.image || '/placeholder.jpg'} 
                  alt={tip.title || 'Betting tip image'} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
                />
                {/* Category Badge */}
                <span className="absolute top-4 left-4 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {(tip.category || 'Casino').toUpperCase()}
                </span>
              </div>
              
              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow relative">
                
                {/* Meta Data */}
                <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1.5 text-blue-500" />
                    <span>{tip.date || (tip.createdAt && tip.createdAt.toDate ? tip.createdAt.toDate().toLocaleDateString() : '')}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <span>Prediction</span>
                </div>

                {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {tip.title || 'Untitled Tip'}
                </h3>
                
                {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed opacity-90 mb-6 line-clamp-3 flex-grow">
                  {tip.description || ''}
                </p>
                
                {/* Footer Action */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between group/btn cursor-pointer">
                  <span className="text-gray-900 font-bold text-sm group-hover/btn:text-blue-600 transition-colors">
                    <a
                      href={tip.link || '#'}
                      className="inline-flex items-center gap-2"
                      target={tip.link ? '_blank' : undefined}
                      rel={tip.link ? 'noopener noreferrer' : undefined}
                      aria-label={tip.title ? `Read analysis: ${tip.title}` : 'Read analysis'}
                    >Read Analysis</a>
                  </span>
                  <ArrowRight size={18} className="text-blue-600 transform -translate-x-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                </div>

              </div>
            </article>
          )))}
        </div>

        {/* Mobile View More Button */}
        <div className="mt-10 text-center md:hidden">
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 transition-colors">
                Read More
                <ArrowRight size={20} className="ml-2" />
            </button>
        </div>

      </div>
    </section>
  );
};

export default ExpertTipsSection;
