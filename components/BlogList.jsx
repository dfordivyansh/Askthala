import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Filter, Layers } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// Live blogs fetched from Firestore
// Backup static fallback if Firestore is empty


// --- Single Blog Card Sub-Component ---
const BlogCard = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full">
      
      {/* Image Container with Zoom Effect */}
      <Link to={`/blog/${post.id}`} className="relative overflow-hidden h-52 block">
        <img
          src={post.imageUrl || '/placeholder.jpg'}
          alt={post.title || 'Blog image'}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => { e.target.onerror=null; e.target.src='/placeholder.jpg'; }}
        />
        {/* Category Badge */}
        <span className="absolute top-4 left-4 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {post.category}
        </span>
      </Link>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Meta Info */}
        <div className="flex items-center text-gray-500 text-xs mb-4 space-x-4">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1.5 text-blue-600" />
            <span>{post.date}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center">
            <User size={12} className="mr-1.5 text-blue-600" />
            <Link
              to={`/author/${post.authorSlug || post.author?.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-blue-600 transition-colors"
            >
              {post.author}
            </Link>
          </div>
        </div>

        {/* Title */}
          <Link to={`/blog/${post.id}`} className="block mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed opacity-90 mb-6 line-clamp-3 flex-grow">
          {post.description}
        </p>

        {/* Footer Action */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link 
            to={`/blog/${post.id}`}
            className="inline-flex items-center text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors group/btn"
          >
            Read Article 
            <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
        
      </div>
    </article>
  );
};

// --- Main Blog Listings Component ---
const BlogList = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        blogsQuery,
        (snapshot) => {
          const docs = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
          if (docs.length) setBlogs(docs);
          setIsLoading(false);
        },
        (err) => {
          console.error('Failed to load blogs:', err);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.error('Error fetching blog list:', err);
      setIsLoading(false);
    }
  }, []);

  const getFilteredBlogs = () => {
    if (activeTab === 'tips') return blogs.filter((post) => post.category === 'Betting Tips');
    if (activeTab === 'Casino') return blogs.filter((post) => post.category === 'Casino');
    return blogs;
  };

  const filteredBlogs = getFilteredBlogs();

  return (
    <section className="bg-white py-10 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100 opacity-60 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header & Filter Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
             <Layers className="text-blue-600" /> Recent Articles
          </h2>

          {/* Filter Tabs */}
          <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-200">
            {['all', 'tips', 'Casino'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                {tab === 'all' ? 'All Posts' : tab === 'tips' ? 'Betting Tips' : 'Casino News'}
              </button>
            ))}
          </div>
        </div>

        {/* --- Blog Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={`s-${i}`} className="animate-pulse group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="h-52 bg-gray-200 w-full" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              </div>
            ))
          ) : (
            filteredBlogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>
        
        {/* Empty State (Safety) */}
        {filteredBlogs.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-gray-50 text-gray-400 mb-4 border border-gray-200">
              <Filter size={32} />
            </div>
            <h3 className="text-xl text-gray-900 font-bold">No articles found</h3>
            <p className="text-gray-500">Try changing the category filter.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default BlogList;