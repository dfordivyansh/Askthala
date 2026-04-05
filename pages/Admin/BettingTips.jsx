import React, { useState, useEffect,useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  ExternalLink,
  Upload,
  X,
  AlignLeft,
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

const BettingTipsManager = ({ setIsAdminLoggedIn }) => {
  const [tips, setTips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Casino",
    date: "",
    imageUrl: "",
    link: "",
  });

  // Initial Sample Data
  // const sampleData = [
  //   {
  //     id: 1,
  //     title: 'Bangladesh vs Ireland 2nd Test Prediction & Betting Tips',
  //     category: 'CRICKET',
  //     date: '14 Nov',
  //     image: '/ban-vs-ire.webp',
  //     description: 'Bangladesh will play Ireland in a big Test cricket match from November 19 to 23...',
  //     link: '#'
  //   },
  //   {
  //     id: 2,
  //     title: 'India A vs South Africa A Betting Tips & Prediction',
  //     category: 'CRICKET',
  //     date: '13 Nov',
  //     image: '/ind-vs-sa.jpg',
  //     description: 'The Proteas team is visiting India for a full-fledged tour, in which they are going...',
  //     link: '#'
  //   },
  //   {
  //     id: 3,
  //     title: 'Bangladesh Openers Do Great Work on Day 2',
  //     category: 'CRICKET',
  //     date: '12 Nov',
  //     image: '/ban-vs-ire.webp',
  //     description: 'The WTC (World Test Championship) is going on, and the game between Bangladesh and Ireland...',
  //     link: '#'
  //   }
  // ];
  useEffect(() => {
    const blogsQuery = query(
      collection(db, "betting-tips"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      blogsQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setTips(docs);
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load betting-site:", error);
        setErrorMessage(
          "Unable to load betting-site from Firebase. Please refresh."
        );
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const saved = localStorage.getItem('bettingTips');
  //   if (saved) {
  //     const parsedData = JSON.parse(saved);
  //     if (parsedData.length > 0) {
  //       setTips(parsedData);
  //     } else {
  //       setTips(sampleData);
  //     }
  //   } else {
  //     setTips(sampleData);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('bettingTips', JSON.stringify(tips));
  // }, [tips]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
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
    }
    setIsSaving(true);
    setErrorMessage("");
    try {
      console.info("submiting betting-site-blog payload", formData);
      const richContent = editorRef.current
        ? editorRef.current.innerHTML
        : formData.description;
      const publishDate =
        formData.date ||
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        imageUrl = uploadResult.url;
      }
      const payload = {
        title: formData.title.trim(),
        description: richContent,
        date: publishDate,
        category: formData.category || "Casino",
        imageUrl,
        link: formData.link,
        status: "active",
        user: user.uid,
      };
      if (editId) {
        await updateDoc(doc(db, "betting-tips", editId), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "betting-tips"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save Betting-site:', error);
      setErrorMessage('Unable to save betting-site. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Casino",
      date: "",
      imageUrl: "",
      description: "",
      link: "",
    });
    setImagePreview(null);
    setShowForm(false);
    setEditId(null);
    setImageFile(null);
    setErrorMessage('');
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  const handleEdit = (tip) => {
    setFormData({
      title: tip.title||'',
      category:tip.category || "Casino",
      date: tip.date||"",
      imageUrl: tip.imageUrl|| "",
      description: tip.description||"",
      link: tip.link||"",
    });
    setImagePreview(tip.imageUrl || null);
    setImageFile(null)
    setEditId(tip.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async(id) => {
    if (!window.confirm("Are you sure you want to delete this tip?")) {
      return ;
    }
     try {
          await deleteDoc(doc(db, 'betting-tips', id));
        } catch (error) {
          console.error('Failed to delete betting-site:', error);
          setErrorMessage('Unable to delete this site. Please try again.');
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
                Betting Tips & Predictions
              </h1>
              <p className="text-slate-400 mt-1">
                Manage match predictions and analysis
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
              {showForm ? "Cancel" : "Add Tip"}
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
                {editId ? "Edit Tip" : "Add New Tip"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                        placeholder="e.g. India vs Australia Match Prediction"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Casino">Casino</option>
                        <option value="FOOTBALL">FOOTBALL</option>
                        <option value="TENNIS">TENNIS</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Date Display
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                        placeholder="e.g. 14 Nov"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Read Analysis Link
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
                          className="w-full pl-10 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Cover Image
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
                          <div className="w-16 h-12 bg-slate-800 rounded overflow-hidden shrink-0">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">
                        Short Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows="2"
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                        placeholder="Brief excerpt..."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`not-first:w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20
                      ${
                      isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-400 cursor-pointer'
                          }`}
                  >
                    {isSaving ? 'Saving...' :editId ? "Update Tip" : "Publish Tip"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.length === 0 && (
              <div className="col-span-full text-center py-12 bg-slate-900 rounded-xl border border-dashed border-slate-700">
                <p className="text-slate-500">No betting tips found.</p>
              </div>
            )}

            {tips.map((tip) => (
              <div
                key={tip.id}
                className="group relative bg-[#111c35] rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-lg flex flex-col h-full"
              >
                {/* Edit/Delete Buttons (Top Right) - Appears on hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                  <button
                    onClick={() => handleEdit(tip)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg shadow-lg transition-transform hover:scale-110"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(tip.id)}
                    className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg shadow-lg transition-transform hover:scale-110"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Image Section */}
                <div className="relative h-48 bg-slate-800 overflow-hidden">
                  {tip.imageUrl ? (
                    <img
                      src={tip.imageUrl}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Upload size={40} opacity={0.5} />
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {tip.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta Row */}
                  <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
                    <div className="flex items-center gap-1.5 text-blue-400">
                      <Calendar size={14} />
                      <span>{tip.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                    <span>Prediction</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg leading-tight mb-3 line-clamp-2">
                    {tip.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {tip.description}
                  </p>

                  {/* Footer Link */}
                  <div className="mt-auto">
                    <a
                      href={tip.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white text-sm font-bold hover:text-blue-400 transition-colors"
                    >
                      Read Analysis
                      <span className="hidden group-hover:inline-block transition-all">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingTipsManager;
