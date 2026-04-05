import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit2, Trash2, Eye, Image as ImageIcon, Calendar, User, ArrowRight, Upload, X, 
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo, Code 
} from 'lucide-react';
import AdminSidebar from './Sidebar';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { uploadImageToCloudinary } from '../../utils/cloudinaryUpload';

const BlogManager = ({ setIsAdminLoggedIn }) => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // Ref for the contentEditable div
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    category: 'Betting Tips',
    date: '',
    imageUrl: '',
  });

  // Initial Sample Data
 
 useEffect(() => {
    const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      blogsQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setBlogs(docs);
        setIsLoading(false);
      },
      (error) => {
        console.error('Failed to load blogs:', error);
        setErrorMessage('Unable to load blog from Firebase. Please refresh.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Sync formData content to editor when editing starts
  useEffect(() => {
    if (showForm && editorRef.current) {
      editorRef.current.innerHTML = formData.content;
    }
  }, [showForm, editId,formData.content]); // Depend on showForm and editId to reset content properly

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if(!file) return
    setImageFile(file)
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const user = auth.currentUser;
    
    if (!user) {
      setErrorMessage('Your session has expired. Please log in again.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    try {
      console.info('Submitting blog payload', formData);
      const richContent = editorRef.current ? editorRef.current.innerHTML : formData.content;
      const publishDate =
        formData.date ||
        new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        imageUrl = uploadResult.url;
      }

      const payload = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        content: richContent,
        date: publishDate,
        category: formData.category || 'Betting Tips',
        imageUrl,
        status: 'active',
        user:user.uid
      };

      if (editId) {
        await updateDoc(doc(db, 'blogs', editId), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'blogs'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
    } catch (error) {
      console.error('Failed to save blog:', error);
      setErrorMessage('Unable to save blog. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', author: '', content: '', category: 'Betting Tips', date: '', imageUrl: '' });
    setImagePreview(null);
    setImageFile(null);
    setErrorMessage('');
    setShowForm(false);
    setEditId(null);
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title || '',
      author: blog.author || '',
      content: blog.content || '',
      category: blog.category || 'Betting Tips',
      date: blog.date || '',
      imageUrl: blog.imageUrl || '',
    });
    setImagePreview(blog.imageUrl || null);
    setImageFile(null);
    setEditId(blog.id);
    setShowForm(true);
    // Content sync happens in useEffect
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'blogs', id));
    } catch (error) {
      console.error('Failed to delete blog:', error);
      setErrorMessage('Unable to delete this article. Please try again.');
    }
  };


  const getCategoryColor = (category) => {
    // Safely handle undefined/null categories and normalize value
    const cat = (category || '').toLowerCase();
    if (cat.includes('betting')) return 'bg-blue-600';
    if (cat.includes('Casino')) return 'bg-blue-500';
    if (cat.includes('news')) return 'bg-slate-600';
    return 'bg-blue-600';
  };

  // --- Rich Text Editor Functions ---

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      // Update state immediately
      setFormData({ ...formData, content: editorRef.current.innerHTML });
    }
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  };

  const handleImageEmbed = () => {
    const url = prompt('Enter Image URL:');
    if (url) execCommand('insertImage', url);
  };

  // Toolbar Button Component
  const ToolbarBtn = ({ onClick, icon: Icon, title }) => (
    <button 
      type="button" 
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
      title={title}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-slate-700 mx-1 self-center opacity-50" />;

  return (
    <div className="flex font-sans bg-[#0a192f] min-h-screen">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />
      
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Management</h1>
              <p className="text-slate-400 mt-1">Create and manage news and articles</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'Add Blog'}
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-8 mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                {editId ? <Edit2 size={24} className="text-blue-400" /> : <Plus size={24} className="text-blue-400" />}
                {editId ? 'Edit Blog Post' : 'Add New Blog'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 font-medium text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                        placeholder="e.g. T20 World Cup Analysis"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="block text-slate-300 font-medium text-sm mb-2">Author</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                            placeholder="e.g. Alden Fletcher"
                        />
                        </div>
                        <div>
                        <label className="block text-slate-300 font-medium text-sm mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="Betting Tips">Betting Tips</option>
                            <option value="Casino">Casino</option>
                            <option value="News">News</option>
                        </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-300 font-medium text-sm mb-2">Publish Date</label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                            placeholder="e.g. November 4, 2026"
                        />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                        <label className="block text-slate-300 font-medium text-sm mb-2">Cover Image</label>
                        <div className="flex items-center gap-4">
                            <label className="flex-1 cursor-pointer bg-slate-800 border border-dashed border-slate-600 hover:border-blue-500 rounded-lg p-3 flex items-center justify-center gap-2 transition-colors group">
                                <Upload size={20} className="text-slate-400 group-hover:text-blue-400" />
                                <span className="text-slate-400 group-hover:text-blue-400">Choose File</span>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                            {imagePreview && (
                                <div className="w-16 h-12 bg-slate-800 rounded overflow-hidden shrink-0">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rich Text Editor Area */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="block text-slate-300 font-medium text-sm">Content & Details</label>
                      </div>
                      
                      {/* Visual Toolbar Container */}
                      <div className="bg-[#0f172a] border border-slate-700 rounded-t-lg border-b-0">
                         <div className="flex flex-wrap items-center p-2 gap-1">
                            <ToolbarBtn onClick={() => execCommand('bold')} icon={Bold} title="Bold" />
                            <ToolbarBtn onClick={() => execCommand('italic')} icon={Italic} title="Italic" />
                            <ToolbarBtn onClick={() => execCommand('underline')} icon={Underline} title="Underline" />
                            
                            <Divider />
                            
                            <ToolbarBtn onClick={() => execCommand('insertUnorderedList')} icon={List} title="Unordered List" />
                            <ToolbarBtn onClick={() => execCommand('insertOrderedList')} icon={ListOrdered} title="Ordered List" />
                            
                            <Divider />
                            
                            <ToolbarBtn onClick={handleImageEmbed} icon={ImageIcon} title="Insert Image" />
                            <ToolbarBtn onClick={handleLink} icon={LinkIcon} title="Insert Link" />

                            <Divider />

                            <ToolbarBtn onClick={() => execCommand('justifyLeft')} icon={AlignLeft} title="Align Left" />
                            <ToolbarBtn onClick={() => execCommand('justifyCenter')} icon={AlignCenter} title="Align Center" />
                            <ToolbarBtn onClick={() => execCommand('justifyRight')} icon={AlignRight} title="Align Right" />
                            <ToolbarBtn onClick={() => execCommand('justifyFull')} icon={AlignJustify} title="Justify" />

                            <Divider />

                            <ToolbarBtn onClick={() => execCommand('undo')} icon={Undo} title="Undo" />
                            <ToolbarBtn onClick={() => execCommand('redo')} icon={Redo} title="Redo" />
                         </div>
                      </div>

                      {/* Editable Content Area */}
                      <div 
                        ref={editorRef}
                        contentEditable
                        onInput={(e) => setFormData({ ...formData, content: e.currentTarget.innerHTML })}
                        className="w-full min-h-[200px] px-4 py-3 bg-slate-800 border border-slate-700 rounded-b-lg text-white focus:outline-none focus:border-blue-500 font-sans text-sm leading-relaxed overflow-y-auto prose prose-invert max-w-none"
                        style={{ outline: 'none' }}
                      />
                      <p className="text-xs text-slate-500 mt-1 text-right">Visual Editor enabled</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20 ${
                      isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-400 cursor-pointer'
                          }`}
                  >
                    {isSaving ? 'Saving...' : editId ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blog List - Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading && blogs.length === 0 && (
              <div className="col-span-full text-center py-12 bg-slate-900 rounded-xl border border-dashed border-slate-700">
                <p className="text-slate-500">No blog posts added yet.</p>
              </div>
            )}

            {!isLoading && blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="group relative bg-[#111c35] rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-lg flex flex-col h-full"
              >
                 {/* Edit/Delete Buttons (Top Right) - Appears on hover */}
                 <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                  <button 
                    onClick={() => handleEdit(blog)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg shadow-lg transition-transform hover:scale-110"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg shadow-lg transition-transform hover:scale-110"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Image Section */}
                <div className="relative h-52 bg-slate-800 overflow-hidden">
                  {blog.imageUrl ? (
                    <img 
                      src={blog.imageUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <ImageIcon size={40} />
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${getCategoryColor(blog.category)} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}>
                      {blog.category || 'Uncategorized'}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                    
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-500" />
                        <span>{blog.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                    <div className="flex items-center gap-1.5">
                        <User size={14} className="text-blue-500" />
                        <span>{blog.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg leading-tight mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Description - HTML Rendered */}
                  <div 
                    className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* Read Article Link */}
                  <div className="mt-auto">
                    <a href="#" className="inline-flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors group/link">
                        Read Article
                        <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
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

export default BlogManager;