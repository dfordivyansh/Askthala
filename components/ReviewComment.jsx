import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import React from "react";

export default function ReviewComments({ reviewId }) {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "reviews", reviewId, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(data);
    });

    return () => unsub();
  }, [reviewId]);

  // Submit main comment
  const postComment = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Login to comment");
    if (!newComment.trim()) return;

    const res = await addDoc(
      collection(db, "reviews", reviewId, "comments"),
      {
        text: newComment,
        userId: user.uid,
        userName: user.displayName || user.email,
        parentId: null,
        createdAt: serverTimestamp()
      }
    );

    setNewComment("");
    // Increment the parent review's comments count
    try {
      await updateDoc(doc(db, 'reviews', reviewId), { reviewsCount: increment(1) });
    } catch (err) {
      console.error('Failed to increment review comments count', err);
    }
  };

  // Build nested tree
  const buildTree = () => {
    const map = {};
    const roots = [];

    comments.forEach(c => map[c.id] = { ...c, replies: [] });

    comments.forEach(c => {
      if (c.parentId) {
        map[c.parentId]?.replies.push(map[c.id]);
      } else {
        roots.push(map[c.id]);
      }
    });

    return roots;
  };

  const tree = buildTree();

  return (
    <div className="mt-4 border-t pt-4">

      {/* ADD COMMENT */}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="w-full border p-2 rounded"
      />
      <button
        onClick={postComment}
        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
      >
        Comment
      </button>

      {/* COMMENTS TREE */}
      <div className="mt-4 space-y-2">
        {tree.map(c => (
          <Comment key={c.id} data={c} reviewId={reviewId} />
        ))}
      </div>

    </div>
  );
}

function Comment({ data, reviewId }) {

  const [replyText, setReplyText] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);

  const sendReply = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Login to comment");
    if (!replyText.trim()) return;

    const res = await addDoc(
      collection(db, "reviews", reviewId, "comments"),
      {
        text: replyText,
        userId: user.uid,
        userName: user.displayName || user.email,
        parentId: data.id,
        createdAt: serverTimestamp()
      }
    );

    setReplyText("");
    setReplyOpen(false);
    // Increment the parent review's comment count when adding a reply
    try {
      await updateDoc(doc(db, 'reviews', reviewId), { reviewsCount: increment(1) });
    } catch (err) {
      console.error('Failed to increment review comments count', err);
    }
  };

  return (
    <div className="ml-4">

      <div className="bg-gray-100 p-2 rounded">
        <b>{data.userName}</b>
        <p>{data.text}</p>

        <button
          className="text-xs text-blue-600 mt-1"
          onClick={() => setReplyOpen(!replyOpen)}
        >
          Reply
        </button>
      </div>

      {/* REPLY INPUT */}
      {replyOpen && (
        <div className="ml-4 mt-2">
          <textarea
            className="w-full border p-1 rounded"
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Reply..."
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 mt-1 rounded text-xs"
            onClick={sendReply}
          >
            Send
          </button>
        </div>
      )}

      {/* CHILD COMMENTS */}
      {data.replies.map(r => (
        <Comment key={r.id} data={r} reviewId={reviewId} />
      ))}

    </div>
  );
}
