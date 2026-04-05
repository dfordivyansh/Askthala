import React, { useState, useEffect } from "react";
import { Smartphone, ShieldCheck, ExternalLink, Zap, ArrowLeft } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import ComplaintModal from "../components/ComplaintModal";
import { useNavigate } from "react-router-dom";

const ComplainApply = () => {
  const [topApps, setTopApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const appsQuery = query(
        collection(db, "apps"),
        orderBy("rating", "desc")
      );
      const unsubscribe = onSnapshot(
        appsQuery,
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTopApps(docs);
          setIsLoading(false);
        },
        (err) => {
          console.error("Failed to load top apps", err);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.error("Error fetching top apps", err);
      setIsLoading(false);
    }
  }, []);

  const handleOnclick = (app) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="bg-white py-10 md:py-10 relative overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 opacity-60 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 opacity-60 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* --- Header Section --- */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
              <ShieldCheck size={16} className="text-blue-600" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                Verified Real Money Apps
              </span>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <button
                className="w-auto px-6 text-white bg-blue-600 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-blue-600/30"
                onClick={() => navigate('/complain')}
              >
                <ArrowLeft size={20} />
                Back to Complain Page
              </button>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  Complain for
                </span>{" "}
                Apps
              </h2>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The best IPL betting apps allow you to bet online on famous IPL
              matches. Choose your favorite teams, predict the Man of the Match,
              and win real cash instantly.
            </p>
          </div>

          {/* --- Logo Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {topApps.map((app) => (
              <div
                key={app.name}
                className="group relative bg-white rounded-2xl p-6 border border-gray-200 
                hover:border-blue-500/50 transition-all duration-300 
                hover:shadow-xl hover:-translate-y-2 cursor-pointer h-[260px] overflow-hidden flex flex-col"
              >
                {/* Background Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                ></div>

                {/* IMAGE SECTION */}
                <div className="relative z-10 flex justify-center items-start h-[160px]">
                  <img
                    src={app.logoUrl}
                    alt={`${app.name} Logo`}
                    className="max-w-full max-h-full object-contain filter drop-shadow-sm 
                    transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* BUTTON BOTTOM FIXED */}
                <div className="mt-auto relative z-10">
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg 
                      font-semibold hover:bg-blue-700 cursor-pointer transition-all duration-300 shadow-md"
                    onClick={() => handleOnclick(app)}
                  >
                    Raise Complaint
                  </button>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-500 group-hover:w-full"></div>
              </div>
            ))}
          </div>
          
          <ComplaintModal
            isOpen={isModalOpen}
            app={selectedApp}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </section>
    </>
  );
};

export default ComplainApply;