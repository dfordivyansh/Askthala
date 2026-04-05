import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Timer,
  XCircle,
  Ban,
  MessageCircle,
  User,
} from "lucide-react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import CommentPopup from "./ComponentPopup";

const LatestCompliant = () => {
  const [activeTab, setActiveTab] = useState("Opened");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentCounts, setCommentCounts] = useState({});

  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const statusMap = {
    Solved: "solved",
    Opened: "open",
    "Not Solved": "unsolved",
    Rejected: "rejected",
  };

  const filteredComplaints = complaints.filter((c) => {
    const selectedStatus = statusMap[activeTab]; // UI → DB mapping
    const dbStatus = String(c.status || "").toLowerCase();
    return dbStatus === selectedStatus;
  });

  useEffect(() => {
    if (!filteredComplaints.length) return;

    const unsubs = [];

    filteredComplaints.forEach((c) => {
      const q = collection(db, "complaints", c.id, "comments");
      const unsub = onSnapshot(q, (snapshot) => {
        setCommentCounts((prev) => ({
          ...prev,
          [c.id]: snapshot.size,
        }));
      });
      unsubs.push(unsub);
    });

    // cleanup
    return () => unsubs.forEach((u) => u());
  }, [filteredComplaints]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="flex-1 p-6 md:p-12 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">All Complaints</h2>
            
            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
                {["Opened", "Solved", "Not Solved", "Rejected"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-200 text-sm
                    ${
                        activeTab === tab
                        ? "bg-blue-600 text-white shadow-md transform scale-105" // Active State
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900" // Inactive State
                    }`}
                >
                    {tab}
                </button>
                ))}
            </div>
        </div>

        {filteredComplaints.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                <p className="text-gray-500">No complaints found in this category.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComplaints.map((c) => (
                <div 
                    key={c.id} 
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group"
                >
                {/* Card Header: App Info */}
                <div className="p-5 flex items-start gap-4 border-b border-gray-50 bg-gray-50/50">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shadow-sm flex-shrink-0">
                        <img
                        src={c.appLogo || "/default-app-icon.png"}
                        alt={c.appName}
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/48?text=App"; }}
                        />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 truncate text-base">{c.appName || "Unknown App"}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <span className="font-medium text-gray-700">By:</span> {c.userName || "Anonymous"}
                        </div>
                    </div>
                </div>

                {/* Card Body: Complaint Text */}
                <div className="p-5 flex-grow">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                        {c.complaintText}
                    </p>
                </div>

                {/* Card Footer: Status & Actions */}
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    
                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5">
                        {c.status === "open" && <Timer size={14} className="text-yellow-600" />}
                        {c.status === "solved" && <CheckCircle2 size={14} className="text-green-600" />}
                        {c.status === "unsolved" && <XCircle size={14} className="text-orange-600" />}
                        {c.status === "rejected" && <Ban size={14} className="text-red-600" />}
                        
                        <span className={`text-xs font-bold uppercase tracking-wide
                            ${c.status === "open" && "text-yellow-700"}
                            ${c.status === "solved" && "text-green-700"}
                            ${c.status === "unsolved" && "text-orange-700"}
                            ${c.status === "rejected" && "text-red-700"}
                        `}>
                            {c.status}
                        </span>
                    </div>

                    {/* Comments Action */}
                    {(c.status === "open" || commentCounts[c.id] > 0) && (
                        <button
                            onClick={() => setActiveCommentId(activeCommentId === c.id ? null : c.id)}
                            className={`flex items-center gap-1.5 text-xs font-bold transition-colors px-2 py-1 rounded-md
                                ${activeCommentId === c.id 
                                    ? "bg-blue-100 text-blue-700" 
                                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                }`}
                        >
                            <MessageCircle size={16} />
                            <span>{commentCounts[c.id] || 0}</span>
                        </button>
                    )}
                </div>

                {/* Date stamp (Optional small text at very bottom or top right) */}
                <div className="px-5 pb-2 text-[10px] text-gray-400 text-right">
                    {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString() : 'Just now'}
                </div>

                {activeCommentId === c.id && (
                    <CommentPopup
                    complaint={c}
                    onClose={() => setActiveCommentId(null)}
                    />
                )}
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default LatestCompliant;