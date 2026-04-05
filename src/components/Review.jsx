import React, { useState, useEffect } from "react";
import {
  User,
  X,
  Star,
  MessageSquare,
  Send,
  Reply
} from "lucide-react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  increment
} from "firebase/firestore";
import { auth, db } from "../config/firebase"; 

// --- 1. Star Rating Component ---
const StarRating = ({ rating, size = 16, interactive = false, onRate = () => {} }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <Star
            size={size}
            className={`${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-gray-200 text-gray-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// --- 2. Single Comment Item (Recursive for Nested Replies) ---
const CommentItem = ({ comment, reviewId }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReply = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login to reply");
    if (!replyText.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "reviews", reviewId, "comments"), {
        text: replyText,
        userId: user.uid,
        userName: user.displayName || user.email?.split('@')[0] || "User",
        parentId: comment.id,
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "reviews", reviewId), {
        reviewsCount: increment(1)
      });

      setReplyText("");
      setIsReplying(false);
    } catch (err) {
      console.error("Error replying:", err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 mt-4 relative">
      <div className="absolute top-8 left-4 bottom-0 w-0.5 bg-gray-100 -z-10"></div>

      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xs border border-blue-200">
          {comment.userName ? comment.userName.charAt(0).toUpperCase() : "U"}
        </div>
        
        <div className="flex-1">
          <div className="bg-gray-50 p-3 rounded-2xl rounded-tl-none border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-900">{comment.userName}</span>
              <span className="text-[10px] text-gray-400">
                 {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString() : 'Just now'}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
          </div>

          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center gap-1 text-xs text-blue-600 font-semibold mt-1 ml-2 hover:underline"
          >
            <Reply size={12} /> Reply
          </button>

          {isReplying && (
            <form onSubmit={handleReply} className="mt-2 flex gap-2 items-center animate-in fade-in slide-in-from-top-1">
              <input 
                autoFocus
                type="text" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.userName}...`}
                className="flex-1 bg-white border border-gray-300 text-xs rounded-full px-3 py-2 outline-none focus:border-blue-500 shadow-sm"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 shadow-sm"
              >
                <Send size={12} />
              </button>
            </form>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} reviewId={reviewId} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- 3. Comments Section Container ---
const ReviewComments = ({ reviewId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This fetches comments specific to the *Review* (not the site, but the review itself)
    const commentsRef = collection(db, "reviews", reviewId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const rawData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(buildCommentTree(rawData));
    });
    return () => unsub();
  }, [reviewId]);

  const buildCommentTree = (flatComments) => {
    const map = {};
    const roots = [];
    flatComments.forEach(c => { map[c.id] = { ...c, replies: [] }; });
    flatComments.forEach(c => {
      if (c.parentId && map[c.parentId]) {
        map[c.parentId].replies.push(map[c.id]);
      } else {
        roots.push(map[c.id]);
      }
    });
    return roots;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login to comment");
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "reviews", reviewId, "comments"), {
        text: newComment,
        userId: user.uid,
        userName: user.displayName || user.email?.split('@')[0] || "User",
        parentId: null, 
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "reviews", reviewId), { reviewsCount: increment(1) });
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="mt-6 md:ml-14 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-2">
      <div className="p-5 bg-gray-50/50 max-h-[500px] overflow-y-auto custom-scrollbar space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm italic text-center py-6">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} reviewId={reviewId} />
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white flex gap-3 items-center">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <User size={18} />
        </div>
        <input 
          type="text" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..." 
          className="flex-1 bg-gray-50 text-sm rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 border border-transparent transition-all"
        />
        <button type="submit" disabled={loading} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 shadow-md">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

// --- 4. Individual Review Card ---
const ReviewItem = ({ review, onToggleComments, isCommentsOpen }) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 mb-4 hover:border-blue-200 transition-colors shadow-sm bg-white">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md text-lg font-bold">
            {review.name ? review.name.charAt(0).toUpperCase() : <User />}
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-gray-900 text-base">{review.name || "Anonymous"}</h4>
              <div className="flex items-center gap-3 mt-1">
                <StarRating rating={review.rating} size={14} />
                <span className="text-xs text-gray-400 font-medium px-2 py-0.5 bg-gray-100 rounded-full">
                  {review.date || "Recent"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm md:text-base mt-2">
            {review.text}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => onToggleComments && onToggleComments(review.id)}
              className={`flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-lg transition-colors
                ${isCommentsOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <MessageSquare size={16} />
              {isCommentsOpen ? 'Hide Comments' : `Comments (${review.reviewsCount || 0})`}
            </button>
          </div>

          {isCommentsOpen && <ReviewComments reviewId={review.id} />}
        </div>
      </div>
    </div>
  );
};

// --- 5. Modal to Write Review ---
const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Login required");
    if (!rating) return alert("Select a rating");
    
    setLoading(true);
    try {
      await onSubmit({
        userId: user.uid,
        name: user.displayName || user.email?.split('@')[0] || "Anonymous",
        rating,
        text: text.trim(),
        likes: 0,
        reviewsCount: 0,
        createdAt: serverTimestamp(),
      });
      setText("");
      setRating(0);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error submitting review");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Write a Review</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex flex-col items-center mb-8">
             <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Overall Rating</label>
             <StarRating rating={rating} size={40} interactive={true} onRate={setRating} />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Your Experience</label>
            <textarea
              required
              rows="4"
              className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none resize-none transition-all placeholder-gray-400"
              placeholder="Share your thoughts about this betting site..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all flex justify-center items-center gap-2">
            {loading ? "Posting..." : <>Post Review <Send size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- 6. Main Component Exported to Page ---
const Review1 = ({ siteId }) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCommentFor, setOpenCommentFor] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!siteId) return;

    // --- CRITICAL FIX ---
    // This query now filters by "siteId".
    // 1. If you see a "Missing Index" error in your console, click the link provided by Firebase to create it.
    // 2. Old reviews without a siteId will NOT show up here anymore (which is correct).
    const q = query(
        collection(db, "reviews"), 
        where("siteId", "==", siteId), 
        orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          date: d.createdAt?.toDate ? d.createdAt.toDate().toLocaleDateString() : 'Just now',
        };
      });
      setReviews(data);
    }, (error) => {
        console.error("Error fetching reviews:", error);
    });
    return () => unsub();
  }, [siteId]);

  const handleAddReview = async (reviewData) => {
     if (!siteId) return alert("Error: No site ID found.");
     
     // --- CRITICAL FIX ---
     // We save the review WITH the siteId so it can be filtered later.
     await addDoc(collection(db, "reviews"), {
         ...reviewData,
         siteId: siteId 
     });
  };

  return (
    <div className="bg-white min-h-screen py-10 -mt-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Player Reviews</h2>
            <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {reviews.length} verified ratings
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 mt-4 md:mt-0"
          >
             Write a Review 
          </button>
        </div>

        <div className="space-y-6">
          {reviews.length === 0 ? (
             <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
               <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
               <p className="text-gray-500 font-medium">No reviews yet for this site.</p>
               <p className="text-gray-400 text-sm">Be the first to share your experience!</p>
             </div>
          ) : (
             reviews.map((review) => (
               <ReviewItem
                 key={review.id}
                 review={review}
                 isCommentsOpen={openCommentFor === review.id}
                 onToggleComments={(id) => {
                   setOpenCommentFor((prev) => (prev === id ? null : id));
                 }}
               />
             ))
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </div>
  );
};

export default Review1;