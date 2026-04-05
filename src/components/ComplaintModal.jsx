import React, { useState,useEffect } from "react";
import { createComplaint } from "../services/dbService";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";
import {useNavigate} from 'react-router-dom' 
const ComplaintModal = ({ isOpen, onClose, app }) => {
  const [complaintText, setComplaintText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate=useNavigate();
  useEffect(() => {
  if (isOpen) {
    setComplaintText("");
    setRating(0);
  }
}, [isOpen, app]);
  if (!isOpen || !app) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!complaintText.trim()) {
      setError("Please write your complaint");
    }
    if (!rating) {
    setError("Please select a rating");
    return;
  }
    setLoading(true);
    try {
      await createComplaint({
        userId: currentUser.uid,
        userName: currentUser.displayname || currentUser.email,
        appId: app.id,
        appLogo:app.logoUrl,
        appRating: app.rating,
        userRating:rating,
        status:"open",
        complaintText: complaintText,
      });
      alert("complaint Registered");
      setComplaintText("");
      setRating(0);
      onClose();
      navigate('/complain')

    } catch (error) {
      alert("failed to submit");
    }
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 z-50  flex items-center backdrop-blur-sm  justify-center">
      <div className="bg-[#0f172a] w-[380px] rounded-xl p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-400 text-lg"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex gap-4 items-center mb-4">
          <img
            src={app.logoUrl}
            alt={app.name}
            className="w-14 h-14 object-contain rounded-md"
          />
          <div>
            <h2 className="text-white text-lg font-bold">{app.name}</h2>
            <p className="text-yellow-400">⭐ {app.rating}</p>
          </div>
        </div>

        {/* App Description */}
        <p className="text-gray-300 text-sm mb-3">{app.description}</p>
        {/* Rating */}
        <div>
          <p className="text-gray-300 text-sm mb-1">Your Rating</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition ${
                  rating >= star ? "text-yellow-400" : "text-gray-600"
                } hover:scale-110`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        {/* Complaint Input */}
        <textarea
          placeholder="Write your complaint here..."
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          className="w-full h-24 bg-[#020617] border border-gray-600 text-white rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />

        {/* Submit Button */}
        <button
          className="mt-4 w-full bg-[#00AEEF] text-black py-2 rounded-lg font-semibold hover:bg-white transition"
          disabled={loading}
        //   onClick={() => {
        //     console.log("Complaint Submitted:", complaintText,rating);
        //     onClose(); // Close popup after submit (later we will add Firebase)
        //   }}
        onClick={handleSubmit}
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </div>
    </div>
  );
};
export default ComplaintModal;
