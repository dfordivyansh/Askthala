import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  ExternalLink,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center justify-center bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={14}
          className={`mx-[1px] ${index < rating ? "text-yellow-400" : "text-slate-200"}`}
          fill={index < rating ? "currentColor" : "none"}
          strokeWidth={index < rating ? 0 : 2}
        />
      ))}
    </div>
  );
};

const BestBettingSites = () => {
  const [sites, setSites] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "betting-sites"),
        orderBy("rating", "desc"),
        limit(4),
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = snapshot.docs.map((s) => ({
            id: s.id,
            ...s.data(),
            rating: Number(s.data().rating) || 0,
          }));
          setSites(docs);
        },
        (err) => {
          console.error(
            "Failed to fetch betting-sites for BestBettingSites",
            err,
          );
        },
      );
      return () => unsubscribe();
    } catch (err) {
      console.error("Error querying betting-sites", err);
    }
  }, []);

  const handleCopy = async (code, id) => {
    if (!code || code === "NA") return;

    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <section className="bg-white py-10 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">
            Best Online Casino Sites Worldwide in 2026
          </h2>
          <p className="text-lg text-slate-600">
            Discover trusted online casino platforms from around the world. We
            help players choose safe, fair, and entertaining casinos with secure
            payments and high-quality games.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sites.map((site) => (
            <div
              key={site.id}
              className="group relative bg-white rounded-2xl border border-[#0a192f] flex flex-col overflow-hidden hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              {/* Header */}
              <div className="p-6 pb-4 flex flex-col items-center border-b border-[#0a192f] bg-gradient-to-b from-slate-50 to-white">
                <div className="h-12 mb-3 flex items-center justify-center">
                  <img
                    src={site.logoUrl || site.logo || "/default-logo.png"}
                    alt={`${site.bonusTitle} Logo`}
                    className="max-h-full w-auto object-contain drop-shadow-sm"
                  />
                </div>
                <StarRating rating={site.rating} />
              </div>

              {/* Body */}
              <div className="p-5 flex-grow flex flex-col items-center text-center">
                <div className="mb-3 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                  <ShieldCheck size={12} className="mr-1" /> Exclusive Welcome
                  Bonus
                </div>

                <h3 className="text-[#0a192f] font-bold text-[1.05rem] leading-relaxed mb-5">
                  {site.bonusText}
                </h3>

                {/* 🔥 UPDATED PROMO CODE BOX */}
                <div className="w-full mt-auto bg-slate-50 rounded-lg p-3 border border-dashed border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-2 transition-all group-hover:border-blue-300">
                  {/* LEFT TEXT */}
                  <span className="text-slate-500 text-xs font-medium uppercase transition-all duration-300 group-hover:text-blue-600">
                    {copiedId === site.id ? "Copied!" : "Promo Code"}
                  </span>

                  {/* RIGHT BUTTON */}
                  <button
                    onClick={() => handleCopy(site.promoCode, site.id)}
                    disabled={site.promoCode === "NA"}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-sm font-bold transition-all duration-300 
                    ${
                      site.promoCode === "NA"
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-50 active:scale-95"
                    }`}>
                    {copiedId === site.id ? (
                      <>
                        <Check size={16} className="text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        {site.promoCode || "N/A"}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 pt-0">
                <div className="grid grid-cols-2 gap-3">
                  <Link to={`/review/${site.id}`} className="w-full">
                    <button className="flex items-center justify-center w-full px-4 py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-200 hover:text-[#0a192f] transition-colors duration-200">
                      <FileText size={16} className="mr-2" /> REVIEW
                    </button>
                  </Link>

                  <a
                    href={site.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full">
                    <button className="flex items-center justify-center w-full px-4 py-3 bg-[#2563EA] text-white font-bold text-sm rounded-lg transition-colors duration-200 shadow-md shadow-blue-200 hover:bg-[#1d4ed8]">
                      VISIT <ExternalLink size={16} className="ml-2" />
                    </button>
                  </a>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Advertising link. 18+.{" "}
                    <a
                      href="#"
                      className="text-slate-500 underline hover:text-blue-600">
                      Terms & Conditions
                    </a>{" "}
                    apply.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/sites">
            <button className="inline-flex cursor-pointer items-center px-10 py-4 bg-[#2563EA] text-white font-bold text-lg rounded-full hover:bg-[#1d4ed8] transition-all duration-300 shadow-lg shadow-blue-200 transform hover:-translate-y-1">
              SEE MORE SITES
              <ArrowRight size={22} className="ml-3" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestBettingSites;
