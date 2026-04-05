import React from 'react';
import { Home, ChevronRight, Search, BookOpen, TrendingUp } from 'lucide-react';

const BlogHero = () => {
  return (
    <section className="relative w-full min-h-[600px] bg-white flex flex-col justify-center overflow-hidden pt-20">
      
      {/* Background Image with Advanced Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ 
            backgroundImage: "url('/blog.png')",
            backgroundPosition: 'center 30%', 
          }}
        ></div>
        {/* Gradient Overlay: Fade from white (bottom/left) to transparent (top/right) for readability */}
        
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100 opacity-60 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-10 md:py-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8 opacity-90">
          <a href="/" className="flex items-center hover:text-blue-600 transition-colors duration-200">
            <Home size={16} className="mr-2" /> 
            Home
          </a>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
            Blogs
          </span>
        </div>

        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-sm">
             <BookOpen size={14} />
             <span>Knowledge Hub</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Latest News & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Expert Insights
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl opacity-90">
            Your ultimate source for Casino betting tips, match predictions, app reviews, and industry updates for the 2026 season.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mb-8 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search articles, guides, or tips..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-lg transition-all"
            />
          </div>

          {/* Trending Tags */}
          <div className="flex flex-wrap gap-3 items-center">
             <span className="text-sm text-gray-500 mr-2 font-medium">Trending:</span>
             {['IPL 2026', 'Betting Apps', 'Match Predictions', 'Legal News'].map((tag) => (
               <button key={tag} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm cursor-pointer">
                 <TrendingUp size={12} /> {tag}
               </button>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogHero;