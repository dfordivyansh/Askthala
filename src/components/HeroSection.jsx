import React, { useState, useEffect } from "react";
import {
  Globe,
  Smartphone,
  Megaphone,
  Scale,
  TrendingUp,
  X,
  Bell,
  Calendar,
  Gift,
} from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const HeroSection = () => {
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  // Dummy data for fallback
  const DUMMY_ANNOUNCEMENTS = [
    {
      id: "dummy1",
      title: "Welcome Bonus Update",
      message:
        "New users can now claim a 100% deposit bonus up to ₹10,000! Check the promotions page.",
      createdAt: { toDate: () => new Date() },
    },
  ];

  const [announcements, setAnnouncements] = useState(DUMMY_ANNOUNCEMENTS);
  const [loading, setLoading] = useState(false);

  // Fetch announcements from 'announcements' collection (NOT notifications)
  useEffect(() => {
    if (showAnnouncements) {
      setLoading(true);
      const q = query(
        collection(db, "announcements"),
        orderBy("createdAt", "desc"),
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAnnouncements(data);
        } else {
          setAnnouncements(DUMMY_ANNOUNCEMENTS);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [showAnnouncements]);

  return (
    <>
      <div className="relative pt-24 pb-10 md:pt-32 md:py-20 w-full bg-white text-slate-800 overflow-hidden flex flex-col items-center justify-center font-sans">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight text-[#0a192f]">
            Think Smart. <span className="text-blue-600">Win More.</span>
          </h1>

          <p className="text-slate-600 text-base md:text-xl max-w-sm md:max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium">
            Your go-to platform for trusted betting reviews, winning
            predictions, live odds analysis, and real player support.
          </p>

          <div className="inline-block w-full max-w-[340px] md:max-w-4xl lg:w-auto bg-white rounded-xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-[1px] bg-slate-200">
              <NavItem
                icon={Gift}
                label="No deposit bonus"
                link="#"
                color="text-red-500"
                bgColor="bg-red-500"
              />
              <NavItem
                icon={Scale}
                label="Complaints"
                link="/complain"
                color="text-red-600"
                bgColor="bg-red-500"
              />

              <NavItem
                icon={Globe}
                label="Betting Sites"
                link="/sites"
                color="text-yellow-600"
                bgColor="bg-yellow-500"
              />
              <NavItem
                icon={Smartphone}
                label="Betting Apps"
                link="/apps"
                color="text-pink-600"
                bgColor="bg-pink-500"
              />
              <NavItem
                icon={TrendingUp}
                label="Betting Tips"
                link="/tips"
                color="text-cyan-600"
                bgColor="bg-cyan-500"
              />
              <NavItem
                icon={Megaphone}
                label="Announcements"
                onClick={() => setShowAnnouncements(true)}
                color="text-orange-600"
                bgColor="bg-orange-500"
              />

              <div className="hidden md:block lg:hidden bg-white p-6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Announcements Modal --- */}
      {showAnnouncements && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Megaphone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Announcements
                  </h3>
                  <p className="text-xs text-gray-500">
                    Latest updates from the admin
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAnnouncements(false)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-0 overflow-y-auto custom-scrollbar bg-white">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading updates...
                </div>
              ) : announcements.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                    <Bell size={32} />
                  </div>
                  <p className="text-gray-500 font-medium">
                    No announcements yet.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {announcements.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 hover:bg-blue-50/50 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.title || "Update"}
                        </h4>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                          <Calendar size={10} />
                          {item.createdAt?.toDate
                            ? item.createdAt.toDate().toLocaleDateString()
                            : "Recent"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.message || item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavItem = ({ icon: Icon, label, link, onClick, color, bgColor }) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`group relative flex flex-col items-center justify-center p-4 md:p-6 h-32 md:h-auto w-full lg:w-40 cursor-pointer transition-all duration-300 hover:bg-blue-50/50 bg-white border-none outline-none`}>
        <div
          className={`mb-3 transition-transform duration-300 transform group-hover:-translate-y-2 group-hover:scale-110 ${color}`}>
          <Icon
            size={28}
            strokeWidth={1.5}
            className="md:w-8 md:h-8 drop-shadow-sm"
          />
        </div>
        <span className="text-xs md:text-sm font-bold text-slate-500 group-hover:text-[#0a192f] transition-colors duration-200">
          {label}
        </span>
        <div
          className={`absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-x-0 group-hover:scale-x-100 origin-center ${bgColor}`}></div>
      </button>
    );
  }
  return (
    <a
      href={link}
      className={`group relative flex flex-col items-center justify-center p-4 md:p-6 h-32 md:h-auto w-full lg:w-40 cursor-pointer transition-all duration-300 hover:bg-blue-50/50 bg-white`}>
      <div
        className={`mb-3 transition-transform duration-300 transform group-hover:-translate-y-2 group-hover:scale-110 ${color}`}>
        <Icon
          size={28}
          strokeWidth={1.5}
          className="md:w-8 md:h-8 drop-shadow-sm"
        />
      </div>
      <span className="text-xs md:text-sm font-bold text-slate-500 group-hover:text-[#0a192f] transition-colors duration-200">
        {label}
      </span>
      <div
        className={`absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-x-0 group-hover:scale-x-100 origin-center ${bgColor}`}></div>
    </a>
  );
};

export default HeroSection;
