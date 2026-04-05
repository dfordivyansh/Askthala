// src/pages/Admin/Notifications.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Megaphone
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

const NotificationsManager = ({ setIsAdminLoggedIn }) => {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' // options: info, success, warning, error, critical
  });

  // Fetch Notifications
  useEffect(() => {
    const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    try {
      await addDoc(collection(db, "notifications"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setFormData({ title: '', message: '', type: 'info' });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding notification: ", error);
      alert("Failed to add notification");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    try {
      await deleteDoc(doc(db, "notifications", id));
    } catch (error) {
      console.error("Error deleting notification: ", error);
    }
  };

  // Helper to get icon based on type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-orange-500" size={20} />;
      case 'error': 
      case 'critical': return <AlertTriangle className="text-red-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
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
                <Bell className="text-blue-500" /> Notifications
              </h1>
              <p className="text-slate-400 mt-1">Manage global announcements and alerts</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'New Notification'}
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 mb-8 animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none"
                      placeholder="e.g. System Update"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none"
                    >
                      <option value="info">Info (Blue)</option>
                      <option value="success">Success (Green)</option>
                      <option value="warning">Warning (Orange)</option>
                      <option value="error">Error (Red)</option>
                      <option value="critical">Critical (Red Alert)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-2">Message</label>
                  <textarea 
                    required
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter notification content..."
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSaving ? 'Posting...' : 'Push Notification'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List */}
          <div className="space-y-4">
            {notifications.map((note) => (
              <div key={note.id} className="bg-[#112240] border border-slate-800 rounded-xl p-5 flex items-start justify-between group hover:border-blue-500/30 transition-all">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-slate-800 rounded-lg h-fit">
                    {getTypeIcon(note.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-bold text-lg">{note.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider
                        ${note.type === 'info' && 'bg-blue-500/20 text-blue-400'}
                        ${note.type === 'success' && 'bg-green-500/20 text-green-400'}
                        ${note.type === 'warning' && 'bg-orange-500/20 text-orange-400'}
                        ${(note.type === 'error' || note.type === 'critical') && 'bg-red-500/20 text-red-400'}
                      `}>
                        {note.type}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-2">{note.message}</p>
                    <span className="text-xs text-slate-600">
                      {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleString() : 'Just now'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(note.id)}
                  className="text-slate-500 hover:text-red-500 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            
            {notifications.length === 0 && (
              <div className="text-center py-12 bg-slate-900 rounded-xl border border-dashed border-slate-800">
                <Megaphone className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500">No active notifications</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotificationsManager;