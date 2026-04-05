import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  Upload,
  X,
} from "lucide-react";
import AdminSidebar from "./Sidebar";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUpload";

const IPLBettingAppsManager = ({ setIsAdminLoggedIn }) => {
  const [apps, setApps] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    link: "",
    rating: "",
  });

  // Initial Sample Data based on the image style

  useEffect(() => {
    const blogsQuery = query(
      collection(db, "apps"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      blogsQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setApps(docs);
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load apps", error);
        setErrorMessage("Unable to load apps from Firebase. Please refresh.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, logo: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("Your Session has expired. Please log in again");
      setIsSaving(false);
      return;
    }
    setIsSaving(true);
    setErrorMessage("");
    try {
      console.info("submiting betting-site-blog payload", formData);
      let logoUrl = formData.logo;
      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        logoUrl = uploadResult.url;
      }
      const payload = {
        name: formData.name.trim(),
        logoUrl,
        rating: Number(formData.rating),
        link: formData.link,
        status: "active",
        user: user.uid,
      };
      if (editId) {
        await updateDoc(doc(db, "apps", editId), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "apps"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } 
    catch (error) {
      console.error('Failed to save Betting-site:', error);
      setErrorMessage('Unable to save betting-site. Please try again.');
    }
    finally {
      setIsSaving(false);
    }

  };

  const resetForm = () => {
    setFormData({ name: "", logoUrl: "", link: "", rating: "" });
    setImagePreview(null);
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (app) => {
    // Map the DB fields to the form fields
    setFormData({
      name: app.name || '',
      logo: app.logoUrl || app.logo || '',
      link: app.link || '',
      rating: app.rating || '',
    });
    setImagePreview(app.logoUrl || app.logo || null);
    setEditId(app.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this app?")) return;
    try {
      await deleteDoc(doc(db, 'apps', id));
      // Optimistically update local list while onSnapshot will sync as well
      setApps((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error('Failed to delete app:', err);
      setErrorMessage('Unable to delete app. Please try again.');
    }
  };

  return (
    <div className="flex font-sans bg-[#0a192f] min-h-screen">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                IPL Betting Apps
              </h1>
              <p className="text-slate-400 mt-1">
                Manage IPL betting applications
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? "Cancel" : "Add App"}
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-8 mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                {editId ? (
                  <Edit2 size={24} className="text-blue-400" />
                ) : (
                  <Plus size={24} className="text-blue-400" />
                )}
                {editId ? "Edit App Details" : "Add New App"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        App Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                        placeholder="e.g. Stake"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        App Link / URL
                      </label>
                      <div className="relative">
                        <ExternalLink
                          className="absolute left-3 top-3.5 text-slate-500"
                          size={18}
                        />
                        <input
                          type="url"
                          value={formData.link}
                          onChange={(e) =>
                            setFormData({ ...formData, link: e.target.value })
                          }
                          required
                          className="w-full pl-10 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Rating (1.0 - 5.0)
                      </label>
                      <div className="relative">
                        <Star
                          className="absolute left-3 top-3.5 text-slate-500"
                          size={18}
                        />
                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          value={formData.rating}
                          onChange={(e) =>
                            setFormData({ ...formData, rating: e.target.value })
                          }
                          required
                          className="w-full pl-10 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                          placeholder="4.8"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Logo Upload
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer bg-slate-800 border border-dashed border-slate-600 hover:border-blue-500 rounded-lg p-3 flex items-center justify-center gap-2 transition-colors group">
                          <Upload
                            size={20}
                            className="text-slate-400 group-hover:text-blue-400"
                          />
                          <span className="text-slate-400 group-hover:text-blue-400">
                            Choose File
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        {imagePreview && (
                          <div className="w-12 h-12 bg-white rounded p-1 shrink-0 flex items-center justify-center overflow-hidden">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-400 cursor-pointer'}`}
                  >
                    {isSaving ? 'Saving': editId ? "Update App" : "Add App"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Apps Grid - Matching the Image Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.length === 0 && (
              <div className="col-span-full text-center py-12 bg-slate-900 rounded-xl border border-dashed border-slate-700">
                <p className="text-slate-500">No apps added yet.</p>
              </div>
            )}

            {apps.map((app) => (
              <div
                key={app.id}
                className="group relative bg-[#111c35] rounded-3xl border border-slate-800 p-8 flex flex-col items-center text-center hover:border-blue-500/50 transition-all duration-300 shadow-lg"
              >
                {/* Edit/Delete Buttons (Top Right) - Appears on hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                  <button
                    onClick={() => handleEdit(app)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg shadow-lg transition-transform hover:scale-110"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg shadow-lg transition-transform hover:scale-110"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Logo Container - White Square */}
                <div className="w-32 h-32 bg-white rounded-3xl p-4 flex items-center justify-center mb-6 shadow-inner">
                  {app.logoUrl ? (
                    <img
                      src={app.logoUrl}
                      alt={app.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-300 text-xs">No Logo</span>
                  )}
                </div>

                {/* App Name with Link Icon */}
                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-2xl font-bold text-white mb-2 hover:text-blue-400 transition-colors"
                >
                  {app.name}
                  <ExternalLink size={20} className="text-slate-400" />
                </a>

                {/* Rating */}
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span>{app.rating}/5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPLBettingAppsManager;
