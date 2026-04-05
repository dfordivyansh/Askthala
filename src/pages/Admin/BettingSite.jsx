import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  FileText,
  Star,
  Upload,
  X,
} from "lucide-react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUpload";
import AdminSidebar from "./Sidebar";

const BettingSitesManager = ({ setIsAdminLoggedIn }) => {
  const [sites, setSites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Expanded State to capture ALL dynamic review data
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    url: "",
    reviewUrl: "",
    rating: "", // CasinoRank (Yellow)
    playerRating: "", // Player Rating (Green)
    complaintResponse: "", // Response Time (Purple)
    awards: "", // e.g. "Best Casino 2022"
    bonusText: "",
    starRating: "",
    displayStars: "",
    rank: "",
    promoCode: "",
    pros: "",
    cons: "",
    // Dynamic Text Sections
    editorsView: "",
    generalInfo: "",
    paymentInfo: "",
    supportInfo: "",
    gamesInfo: "",
    responsibleInfo: "",
    finalVerdict: "",
    // Tab Data
    establishedDate: "",
    ownerName: "",
    licences: "",
    depositMethods: "",
    withdrawalMethods: "",
    withdrawalTime: "",
    currencies: "",
    softwareProviders: "",
    supportEmail: "",
    responsibleTools: "",

    depositLimit: "No",
    wagerLimit: "No",
    lossLimit: "No",
    sessionLimit: "No",
    selfExclusion: "No",
    coolOff: "No",
    realityCheck: "No",
    selfAssessment: "No",
    gamblingBlock: "No",
  });

  useEffect(() => {
    const q = query(
      collection(db, "betting-sites"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((s) => ({ id: s.id, ...s.data() }));
      setSites(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, logoUrl: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    let logoUrl = formData.logoUrl;
    if (imageFile) {
      try {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        logoUrl = uploadResult?.url || logoUrl;
      } catch (err) {
        console.error("Failed to upload image", err);
      }
    }

    const payload = {
      ...formData,
      logoUrl,
      rating: Number(formData.rating) || 0,
      playerRating: Number(formData.playerRating) || 0,
      starRating: Number(formData.starRating) || 0, // ✅ NEW
      displayStars: Number(formData.displayStars) || 0, // ✅ NEW
      rank: Number(formData.rank) || 999, // ✅ NEW
      status: "active",
      user: user ? user.uid : "admin",
    };

    setIsSaving(true);
    try {
      if (editId) {
        await updateDoc(doc(db, "betting-sites", editId), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, "betting-sites"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } catch (err) {
      console.error("Failed to save site", err);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      logoUrl: "",
      url: "",
      reviewUrl: "",
      rating: "",
      playerRating: "",
      complaintResponse: "",
      awards: "",
      bonusText: "",
      starRating: "",
      displayStars: "",
      rank: "",
      promoCode: "",
      pros: "",
      cons: "",
      editorsView: "",
      generalInfo: "",
      paymentInfo: "",
      supportInfo: "",
      gamesInfo: "",
      responsibleInfo: "",
      finalVerdict: "",
      establishedDate: "",
      ownerName: "",
      licences: "",
      depositMethods: "",
      withdrawalMethods: "",
      withdrawalTime: "",
      currencies: "",
      softwareProviders: "",
      supportEmail: "",
      responsibleTools: "",

      depositLimit: "No",
      wagerLimit: "No",
      lossLimit: "No",
      sessionLimit: "No",
      selfExclusion: "No",
      coolOff: "No",
      realityCheck: "No",
      selfAssessment: "No",
      gamblingBlock: "No",
    });
    setImagePreview(null);
    setImageFile(null);
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (site) => {
    setFormData({
      name: site.name || "",
      logoUrl: site.logoUrl || "",
      url: site.url || "",
      rating: site.rating || "",
      playerRating: site.playerRating || "",

      // ✅ RESPONSIBLE DEFAULT FIX
      depositLimit: site.depositLimit || "No",
      wagerLimit: site.wagerLimit || "No",
      lossLimit: site.lossLimit || "No",
      sessionLimit: site.sessionLimit || "No",
      selfExclusion: site.selfExclusion || "No",
      coolOff: site.coolOff || "No",
      realityCheck: site.realityCheck || "No",
      selfAssessment: site.selfAssessment || "No",
      gamblingBlock: site.gamblingBlock || "No",

      ...site,
    });

    setImagePreview(site.logoUrl || "");
    setEditId(site.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this site?")) return;
    await deleteDoc(doc(db, "betting-sites", id));
  };

  return (
    <div className="flex font-sans bg-[#0a192f] min-h-screen">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Betting Sites Manager
            </h1>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {showForm ? "Cancel" : "Add New Site"}
            </button>
          </div>

          {showForm && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-8 animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Basic Info */}
                <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm border-b border-slate-700 pb-2">
                  Basic Info & Ratings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Site Name"
                  />
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Site Link"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                      placeholder="CasinoRank (e.g. 9.8)"
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={formData.playerRating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          playerRating: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                      placeholder="Player Rating (e.g. 8.8)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formData.starRating}
                      onChange={(e) =>
                        setFormData({ ...formData, starRating: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                      placeholder="Star Rating (1-5)"
                    />

                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formData.displayStars}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          displayStars: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                      placeholder="Stars to Display (1-5)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={formData.complaintResponse}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          complaintResponse: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                      placeholder="Response Time (e.g. 1 day)"
                    />
                    <input
                      type="text"
                      value={formData.awards}
                      onChange={(e) =>
                        setFormData({ ...formData, awards: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                      placeholder="Awards (e.g. Best Casino 2022)"
                    />
                  </div>

                  <input
                    type="text"
                    value={formData.bonusText}
                    onChange={(e) =>
                      setFormData({ ...formData, bonusText: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Bonus Text"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-slate-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={formData.rank}
                    onChange={(e) =>
                      setFormData({ ...formData, rank: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Rank (1 = Top)"
                  />

                  <input
                    type="text"
                    value={formData.promoCode}
                    onChange={(e) =>
                      setFormData({ ...formData, promoCode: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Promo Code (or N/A)"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <textarea
                    value={formData.pros}
                    onChange={(e) =>
                      setFormData({ ...formData, pros: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Pros (comma separated)"
                    rows="2"
                  />
                  <textarea
                    value={formData.cons}
                    onChange={(e) =>
                      setFormData({ ...formData, cons: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Cons (comma separated)"
                    rows="2"
                  />
                </div>

                {/* 2. Tab Data Details */}
                <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm border-b border-slate-700 pb-2 mt-8">
                  Tab Data Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    value={formData.establishedDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        establishedDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Established (e.g. 2020)"
                  />
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Owner/Company Name"
                  />
                  <input
                    type="text"
                    value={formData.licences}
                    onChange={(e) =>
                      setFormData({ ...formData, licences: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Licences (e.g. Curacao)"
                  />

                  <input
                    type="text"
                    value={formData.withdrawalTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        withdrawalTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Withdrawal Time (e.g. 1-24 Hours)"
                  />
                  <input
                    type="text"
                    value={formData.supportEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, supportEmail: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Support Email"
                  />
                  <input
                    type="text"
                    value={formData.currencies}
                    onChange={(e) =>
                      setFormData({ ...formData, currencies: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Currencies (Comma separated)"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <textarea
                    value={formData.depositMethods}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        depositMethods: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Deposit Methods (Comma separated)"
                    rows="2"
                  />
                  <textarea
                    value={formData.withdrawalMethods}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        withdrawalMethods: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Withdrawal Methods (Comma separated)"
                    rows="2"
                  />
                  <textarea
                    value={formData.softwareProviders}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        softwareProviders: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Software Providers (Comma separated)"
                    rows="2"
                  />
                  <textarea
                    value={formData.responsibleTools}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        responsibleTools: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Responsible Tools (e.g. Deposit Limit Tool, Self-Exclusion Tool)"
                    rows="2"
                  />
                </div>

                <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm border-b border-slate-700 pb-2 mt-8">
                  Responsible Gambling Tools
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "depositLimit", label: "Deposit Limit Tool" },
                    { key: "wagerLimit", label: "Wager Limit Tool" },
                    { key: "lossLimit", label: "Loss Limit Tool" },
                    { key: "sessionLimit", label: "Time/Session Limit Tool" },
                    { key: "selfExclusion", label: "Self-Exclusion Tool" },
                    { key: "coolOff", label: "Cool Off/Time-Out Tool" },
                    { key: "realityCheck", label: "Reality Check Tool" },
                    { key: "selfAssessment", label: "Self-Assessment Test" },
                    { key: "gamblingBlock", label: "Withdrawal Lock" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex justify-between items-center bg-slate-800 px-4 py-3 rounded">
                      <span className="text-white">{item.label}</span>

                      <div className="flex gap-2">
                        {/* YES */}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, [item.key]: "Yes" })
                          }
                          className={`px-3 py-1 text-sm rounded-md font-semibold ${
                            formData[item.key] === "Yes"
                              ? "bg-green-600 text-white"
                              : "bg-slate-600 text-gray-300"
                          }`}>
                          Yes
                        </button>

                        {/* NO */}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, [item.key]: "No" })
                          }
                          className={`px-3 py-1 text-sm rounded-md font-semibold ${
                            formData[item.key] === "No"
                              ? "bg-red-600 text-white"
                              : "bg-slate-600 text-gray-300"
                          }`}>
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* 3. Detailed Descriptions */}
                <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm border-b border-slate-700 pb-2 mt-8">
                  Full Review Content
                </h3>
                <div className="space-y-4">
                  <textarea
                    value={formData.editorsView}
                    onChange={(e) =>
                      setFormData({ ...formData, editorsView: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Editor's View..."
                    rows="4"
                  />
                  <textarea
                    value={formData.generalInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, generalInfo: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="General Information..."
                    rows="4"
                  />
                  <textarea
                    value={formData.paymentInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentInfo: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Payment Information..."
                    rows="4"
                  />
                  <textarea
                    value={formData.supportInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, supportInfo: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Customer Support..."
                    rows="4"
                  />
                  <textarea
                    value={formData.gamesInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, gamesInfo: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Games Available..."
                    rows="4"
                  />
                  <textarea
                    value={formData.responsibleInfo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        responsibleInfo: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Responsible Gambling Info..."
                    rows="4"
                  />
                  <textarea
                    value={formData.finalVerdict}
                    onChange={(e) =>
                      setFormData({ ...formData, finalVerdict: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
                    placeholder="Final Verdict..."
                    rows="4"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded">
                  {isSaving
                    ? "Saving..."
                    : editId
                      ? "Update Review"
                      : "Publish Review"}
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {sites.map((site) => (
              <div
                key={site.id}
                className="bg-[#111c35] p-4 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-white font-bold">{site.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(site)}
                    className="bg-blue-600 text-white p-2 rounded">
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(site.id)}
                    className="bg-red-600 text-white p-2 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingSitesManager;
