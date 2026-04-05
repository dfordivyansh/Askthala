import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  Star,
  ArrowRight,
  ExternalLink,
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
const CricketBookmakersManager = ({ setIsAdminLoggedIn }) => {
  const [bookmakers, setBookmakers] = useState([]);
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
  useEffect(() => {
    const blogsQuery = query(
      collection(db, "bookmakers"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(
      blogsQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setBookmakers(docs);
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load bookmakers", error);
        setErrorMessage(
          "Unable to load booksmaker from Firebase. Please refresh.",
        );
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // Initial Sample Data matching the image
  // const sampleData = [
  //   {
  //     id: 1,
  //     name: 'Stake',
  //     logo: '/app5.png',
  //     link: 'https://stake.com',
  //     rating: '4.9'
  //   },
  //   {
  //     id: 2,
  //     name: '96.com',
  //     logo: '/app2.png',
  //     link: 'https://96.com',
  //     rating: '4.8'
  //   },
  //   {
  //     id: 3,
  //     name: '1xbet',
  //     logo: '/app4.png',
  //     link: 'https://1xbet.com',
  //     rating: '4.7'
  //   },
  //   {
  //     id: 4,
  //     name: 'Indibet',
  //     logo: '/app1.png',
  //     link: 'https://indibet.com',
  //     rating: '4.7'
  //   }
  // ];

  // useEffect(() => {
  //   const saved = localStorage.getItem('cricketBookmakers');
  //   if (saved) {
  //     const parsedData = JSON.parse(saved);
  //     // If saved data exists but is empty, load sample data
  //     if (parsedData.length > 0) {
  //       setBookmakers(parsedData);
  //     } else {
  //       setBookmakers(sampleData);
  //     }
  //   } else {
  //     setBookmakers(sampleData);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('cricketBookmakers', JSON.stringify(bookmakers));
  // }, [bookmakers]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, logo: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setImageFile(file); // ✅ IMPORTANT
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
      console.info("submiting bookmarks payload", formData);
      let logoUrl = formData.logo;
      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        logoUrl = uploadResult.url;
      }
      const payload = {
        name: formData.name.trim(),
        logoUrl,
        rating: Number(formData.rating) || 0,
        link: formData.link,
        status: "active",
        user: user.uid,
      };
      if (editId) {
        await updateDoc(doc(db, "bookmakers", editId), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "bookmakers"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save bookmakers:", error);
      setErrorMessage("Unable to save bookmakers. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", logo: "", link: "", rating: "" }); // ✅ FIXED
    setImagePreview(null);
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (bookmaker) => {
    setFormData({
      name: bookmaker.name || "",
      logo: bookmaker.logoUrl || "",
      link: bookmaker.link || "",
      rating: bookmaker.rating || "",
    });

    setImagePreview(bookmaker.logoUrl || "");
    setEditId(bookmaker.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bookmaker?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "bookmakers", id)); // ✅ FIXED
      // Optimistically update local list while onSnapshot will sync as well
      setBookmakers((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to bookmaker:", err);
      setErrorMessage("Unable to bookmaker. Please try again.");
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
                Casino Bookmakers
              </h1>
              <p className="text-slate-400 mt-1">
                Manage Casino betting bookmakers
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20">
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? "Cancel" : "Add Bookmaker"}
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
                {editId ? "Edit Bookmaker" : "Add New Bookmaker"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Bookmaker Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                        placeholder="e.g. Stake"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Visit Link
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

                  {/* Details & Visuals */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Rating
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
                          placeholder="4.9"
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
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20">
                    {editId ? "Update Bookmaker" : "Add Bookmaker"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Bookmakers Grid - Matching the Image Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookmakers.length === 0 && (
              <div className="col-span-full text-center py-12 bg-slate-900 rounded-xl border border-dashed border-slate-700">
                <p className="text-slate-500">No bookmakers added yet.</p>
              </div>
            )}

            {bookmakers.map((bookmaker, index) => (
              <div
                key={bookmaker.id}
                className="group relative bg-[#111c35] rounded-2xl border border-slate-800 p-5 flex flex-col items-center text-center hover:border-blue-500/50 transition-all duration-300 shadow-lg">
                {/* Rank Badge (Top Left) */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-[#0b1221] rounded-full flex items-center justify-center text-white font-bold text-sm border border-slate-700">
                  {index + 1}
                </div>

                {/* Rating (Top Right) - Fades out on hover */}
                <div className="absolute top-4 right-4 flex items-center gap-1 group-hover:opacity-0 transition-opacity duration-200">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-bold text-sm">
                    {bookmaker.rating}
                  </span>
                </div>

                {/* Edit/Delete Buttons (Top Right) - Appears on hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <button
                    onClick={() => handleEdit(bookmaker)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg shadow-lg transition-transform hover:scale-110"
                    title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(bookmaker.id)}
                    className="bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-lg shadow-lg transition-transform hover:scale-110"
                    title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Logo Container */}
                <div className="mt-8 mb-4 w-full h-24 flex items-center justify-center">
                  {bookmaker.logoUrl ? (
                    <img
                      src={bookmaker.logoUrl}
                      alt={bookmaker.name}
                      className="max-w-[80%] max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-slate-600 font-bold text-xl">
                      {bookmaker.name}
                    </div>
                  )}
                </div>

                {/* Bookmaker Name */}
                <h3 className="text-xl font-bold text-white mb-6">
                  {bookmaker.name}
                </h3>

                {/* Visit Button */}
                <a
                  href={bookmaker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1e293b] hover:bg-blue-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors group-hover:shadow-lg group-hover:shadow-blue-900/20 mt-auto">
                  Visit Site
                  <ArrowRight size={16} className="opacity-70" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CricketBookmakersManager;
