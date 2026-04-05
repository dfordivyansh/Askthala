import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Megaphone, 
  X, 
  Calendar
} from 'lucide-react';
import AdminSidebar from './Sidebar';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const AnnouncementsManager = ({ setIsAdminLoggedIn }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  });

  // Fetch Announcements
  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAnnouncements(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    try {
      await addDoc(collection(db, "announcements"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setFormData({ title: '', message: '' });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding announcement: ", error);
      alert("Failed to add announcement");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await deleteDoc(doc(db, "announcements", id));
    } catch (error) {
      console.error("Error deleting announcement: ", error);
    }
  };

  return (
    <div className="flex font-sans bg-[#0a192f] min-h-screen">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />
      
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Megaphone className="text-orange-500" /> Announcements
              </h1>
              <p className="text-slate-400 mt-1">Manage updates for the Hero section modal</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-orange-900/20"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'New Announcement'}
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 mb-8 animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-2">Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 outline-none"
                    placeholder="e.g. Welcome Bonus Update"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-2">Message</label>
                  <textarea 
                    required
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 outline-none resize-none"
                    placeholder="Enter announcement details..."
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSaving ? 'Publishing...' : 'Publish Announcement'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List */}
          <div className="space-y-4">
            {announcements.map((item) => (
              <div key={item.id} className="bg-[#112240] border border-slate-800 rounded-xl p-5 flex items-start justify-between group hover:border-orange-500/30 transition-all">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-orange-500/10 text-orange-500 rounded-lg h-fit">
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-2">{item.message}</p>
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <Calendar size={12} />
                      {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'Just now'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-500 hover:text-red-500 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            
            {announcements.length === 0 && (
              <div className="text-center py-12 bg-slate-900 rounded-xl border border-dashed border-slate-800">
                <Megaphone className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500">No active announcements</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnnouncementsManager;