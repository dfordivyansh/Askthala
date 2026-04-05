import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Clock, ArrowRight, MessageSquare, Share2, Facebook, Twitter, Linkedin, Send, UserCircle } from 'lucide-react';

const BlogHero = ({ blog }) => {
    return (
        <section className="relative w-full h-[60vh] min-h-[600px] bg-white flex flex-col justify-end overflow-hidden">
            
            {/* Background Image */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${blog?.imageUrl || '/ban-vs-ire.webp'})` }}
            ></div>

            {/* Gradient Overlay (Fade to White) */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/90 via-transparent to-transparent"></div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-12 md:pb-20">
                
                {/* Category Badge */}
                <span className="inline-block px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                    Match Predictions
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight max-w-4xl">
                    {blog?.title || 'Blog Detail'}
                </h1>
                
                {/* Meta Data */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 opacity-90">
                    <div className="flex items-center gap-2">
                        <img src="/auth.jpg" alt="Author" className="w-8 h-8 rounded-full border border-blue-600" />
                        <span>By <span className="text-gray-900 font-bold">{blog?.author || 'Author'}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-600" />
                        <span>{blog?.date || ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-600" />
                        <span>{/* optional read time placeholder */}</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

const BlogSidebar = () => {
    const recentPosts = [
        { slug: 'india-a-vs-south-africa', title: 'India A vs South Africa A Betting Tips & Prediction' },
        { slug: 'bangladesh-openers', title: 'Bangladesh Openers Do Great Work on Day 2' },
        { slug: 'nz-vs-wi-tickets', title: 'New Zealand vs West Indies 5th T20I 2026 Tickets' },
        { slug: 'pak-vs-sa-tickets', title: 'Pakistan vs South Africa 3rd ODI 2026 Tickets' },
    ];

    return (
        <aside className="space-y-8 sticky top-24">
            
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">Search</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                        <Search size={20} />
                    </button>
                </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-3">
                    Recent Posts
                </h3>
                <ul className="space-y-4">
                    {recentPosts.map((post, index) => (
                        <li key={index} className="group">
                            <Link to="#" className="flex gap-4 items-start">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-colors flex-shrink-0"></div>
                                <span className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors leading-relaxed">
                                    {post.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Social Share (Optional Addition) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                 <h3 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-3">
                    Share this
                </h3>
                <div className="flex gap-4">
                    <button className="p-3 bg-gray-50 rounded-lg hover:bg-[#1877F2] hover:text-white text-gray-500 transition-all border border-gray-100 hover:border-transparent"><Facebook size={20} /></button>
                    <button className="p-3 bg-gray-50 rounded-lg hover:bg-[#1DA1F2] hover:text-white text-gray-500 transition-all border border-gray-100 hover:border-transparent"><Twitter size={20} /></button>
                    <button className="p-3 bg-gray-50 rounded-lg hover:bg-[#0A66C2] hover:text-white text-gray-500 transition-all border border-gray-100 hover:border-transparent"><Linkedin size={20} /></button>
                    <button className="p-3 bg-gray-50 rounded-lg hover:bg-green-600 hover:text-white text-gray-500 transition-all border border-gray-100 hover:border-transparent"><Share2 size={20} /></button>
                </div>
            </div>
        </aside>
    );
};

const AuthorBox = () => {
    return (
        <div className="mt-16 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative">
                <img
                    src="/auth.jpg"
                    alt="Alden Fletcher"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full border-2 border-white">
                    <User size={12} className="text-white" />
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Alden Fletcher</h3>
                <p className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-4">Casino Analyst</p>
                <p className="text-gray-600 leading-relaxed text-sm opacity-90">
                    Known for his strong understanding of game stats and player behavior, Aiden Fletcher is an expert in Casino predictions. He studied Sports Analytics at the University of Oxford and has spent over 6 years analyzing player performance.
                </p>
            </div>
        </div>
    );
};

const CommentForm = () => {
    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MessageSquare className="text-blue-600" /> Leave a Reply
            </h3>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                            <div className="relative">
                                <input type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" placeholder="John Doe" />
                                <UserCircle className="absolute left-3 top-3 text-gray-400" size={20} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                            <div className="relative">
                                <input type="email" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" placeholder="john@example.com" />
                                <span className="absolute left-3 top-3 text-gray-400 text-sm font-bold">@</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Comment *</label>
                        <textarea rows="5" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-600 transition-colors resize-none" placeholder="Share your thoughts on the match..."></textarea>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="save-info" className="w-4 h-4 accent-blue-600 bg-gray-50 border-gray-300 rounded" />
                        <label htmlFor="save-info" className="ml-3 text-sm text-gray-600">
                            Save my name and email for the next time I comment.
                        </label>
                    </div>

                    <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-600/20">
                        Post Comment <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

const BlogContent = ({ blog }) => {
    return (
        <article className="prose prose-lg max-w-none text-gray-600">
            
            <div className="lead text-xl text-gray-900 mb-8 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog?.content || blog?.description || '<p>No content available.</p>' }} />

            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600 mb-8 not-prose">
                <p className="text-gray-600 m-0">
                    <strong className="text-gray-900">Match Insight:</strong> The Dhaka ground is perfect for Bangladesh. The pitch is made with black clay. After two days, the pitch gets dry and aids spinners significantly.
                </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why This Team?</h2>
            <ul className="space-y-4 list-none pl-0">
                <li className="flex gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <span><strong>Home Advantage:</strong> Bangladesh plays at home. Home teams win more games.</span>
                </li>
                <li className="flex gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <span><strong>Spin Attack:</strong> Tajul Islam took 42 wickets in nine Test matches this year. Mehidy Hasan Miraz is another great spinner with 205 wickets.</span>
                </li>
                <li className="flex gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <span><strong>Batting Depth:</strong> Mushfiqur Rahim scored 12 centuries in Test Casino. They know how to bat in Asia very well.</span>
                </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What The Match Odds Say</h2>
            <p className="mb-6">
                Betting odds show what bookmakers think. Bangladesh odds are <span className="text-blue-600 font-bold">1.20 to 1.22</span>. Ireland odds are 4.80 to 5.00. A draw has odds of 17.00. The match odds favor Bangladesh heavily.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Dhaka Test 2026 Betting Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h4 className="text-blue-600 font-bold mb-2">Safe Bet</h4>
                    <p className="text-gray-900 font-bold text-xl mb-1">Bangladesh to Win</p>
                    <p className="text-sm text-gray-500">Odds: 1.22</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h4 className="text-blue-600 font-bold mb-2">High Value</h4>
                    <p className="text-gray-900 font-bold text-xl mb-1">Top Bowler: Taijul Islam</p>
                    <p className="text-sm text-gray-500">Spinners dominate Dhaka</p>
                </div>
            </div>

            <p className="mb-8">
                <strong>Expert Verdict:</strong> {blog?.excerpt || 'Read on for analysis.'}
            </p>
            
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
                 <h4 className="text-gray-900 font-bold mb-4">Ready to bet?</h4>
                 <ul className="space-y-3 list-none pl-0 m-0">
                    <li><Link to="#" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"><ArrowRight size={16} /> 96in login India</Link></li>
                    <li><Link to="#" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"><ArrowRight size={16} /> Indibet app apk</Link></li>
                 </ul>
            </div>

        </article>
    );
};

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const docRef = doc(db, 'blogs', id);
                const snap = await getDoc(docRef);
                if (snap.exists()) setBlog({ id: snap.id, ...snap.data() });
                else setBlog(null);
            } catch (err) {
                console.error('Failed to fetch blog detail', err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600">Loading...</div>
        );
    }

    if (!blog) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600">Blog not found.</div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-gray-600">
            
            {/* 1. Hero Section */}
            <BlogHero blog={blog} />

            {/* 2. Main Content & Sidebar */}
            <main className="max-w-7xl mx-auto py-16 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content Area (Left) */}
                    <div className="lg:col-span-8">
                        <BlogContent blog={blog} />
                        <AuthorBox />
                        <CommentForm />
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:col-span-4">
                        <BlogSidebar />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogDetailPage;