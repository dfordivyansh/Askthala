import React from 'react';
import { Trophy, Clock, Plus, Minus } from 'lucide-react';

const ReviewHero = ({ site }) => {
    const name = site?.name || "Betting Site";
    const logo = site?.logoUrl || "/default-logo.png";
    
    // Dynamic Stats
    const casinoRank = site?.rating || "0.0";
    const playerRating = site?.playerRating || "N/A";
    const responseTime = site?.complaintResponse || "N/A";
    const awards = site?.awards || null;

    const parseList = (input) => {
        if (!input) return [];
        if (Array.isArray(input)) return input;
        return input.split(',').map(i => i.trim()).filter(i => i);
    };

    const pros = parseList(site?.pros);
    const cons = parseList(site?.cons);

    return (
        <div className="mt-15 bg-white text-gray-900 p-4 md:p-10 flex justify-center font-sans pt-28">
            <div className="max-w-6xl w-full">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-8">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-xl bg-white p-2 flex items-center justify-center overflow-hidden">
                            <img src={logo} alt={name} className="max-w-full max-h-full object-contain" />
                        </div>
                    </div>

                    {/* Title and Stats */}
                    <div className="flex-grow w-full">
                        <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900">{name} Review</h1>

                        <div className="flex flex-wrap gap-6 md:gap-10">
                            
                            {/* 1. CasinoRank (Yellow) */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center text-lg shadow-md">
                                    {casinoRank}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-gray-900 underline decoration-dotted decoration-gray-400 cursor-pointer">CasinoRank</span>
                                    <span className="text-gray-500 text-xs">Trusted</span>
                                </div>
                            </div>

                            {/* 2. Player Rating (Green) */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#84cc16] text-white font-bold flex items-center justify-center text-lg shadow-md">
                                    {playerRating}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900 text-sm">Player rating</span>
                                    {/* Link placeholder for scrolling to reviews */}
                                    <span className="text-gray-500 text-xs underline cursor-pointer hover:text-blue-600">User reviews</span>
                                </div>
                            </div>

                            {/* 3. Complaint Response (Purple) */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#6366f1] text-white font-bold flex items-center justify-center text-lg shadow-md">
                                    <Clock size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900 text-sm">Complaint response</span>
                                    <span className="text-gray-500 text-xs underline decoration-dotted decoration-gray-400">{responseTime}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Badges / Certificates */}
                <div className="border-t border-gray-200 py-4 mb-6 flex flex-wrap gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold">A</div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">AskGamblers Certificate of Trust</span>
                    </div>
                    
                    {/* Dynamic Awards Badge */}
                    {awards && (
                        <div className="flex items-center gap-2">
                            <Trophy size={18} className="text-yellow-500" />
                            <span className="text-sm md:text-base text-gray-700 font-medium">{awards}</span>
                        </div>
                    )}
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">What we like</h3>
                        <ul className="space-y-4">
                            {pros.length > 0 ? pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-0.5 text-gray-500 border border-gray-300 rounded-full p-0.5"><Plus size={12} className="text-green-600"/></div>
                                    <span className="text-gray-600 text-sm">{pro}</span>
                                </li>
                            )) : <li className="text-gray-400 text-sm">No pros listed</li>}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">What we don't like</h3>
                        <ul className="space-y-4">
                            {cons.length > 0 ? cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-0.5 text-gray-500 border border-gray-300 rounded-full p-0.5"><Minus size={12} className="text-red-600"/></div>
                                    <span className="text-gray-600 text-sm">{con}</span>
                                </li>
                            )) : <li className="text-gray-400 text-sm">No cons listed</li>}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewHero;