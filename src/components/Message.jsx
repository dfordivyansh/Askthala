import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Minimize2,
  Smile,
  ChevronUp,
  SquarePen,
  MessageCircle,
  Loader
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

const Message = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls if chat window is open
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Access current user from Auth Context
  const { currentUser } = useAuth();

  // 1. Live Database Listener (Read Access for Everyone)
  useEffect(() => {
    const q = query(
      collection(db, "global_chat"), 
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // 2. Send Message (Write Access for Logged-in Users Only)
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault(); // Prevent page reload/double submit
    
    // Safety check
    if (!currentUser) {
        alert("Please login to send a message.");
        return;
    }
    if (!inputMessage.trim()) return;
    
    try {
      await addDoc(collection(db, "global_chat"), {
        text: inputMessage,
        uid: currentUser.uid, 
        name: currentUser.displayName || currentUser.email.split('@')[0] || "User",
        sender: "user", 
        createdAt: serverTimestamp()
      });
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // 3. Handle Enter Key Explicitly
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
    }
  };

  // --- CLOSED STATE (Minimized Bar) ---
  if (!isOpen) {
    return (
      <div 
        className="fixed bottom-0 right-4 w-72 bg-white rounded-t-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-gray-300 z-[9999] cursor-pointer hover:bg-gray-50 transition-all font-sans"
        onClick={() => setIsOpen(true)}
      >
        <div className="px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-800 text-sm">Live Chat</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-500">
            <SquarePen size={18} className="hover:text-gray-700" />
            <ChevronUp size={20} className="hover:text-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  // --- OPEN STATE (Live Chat Window) ---
  return (
    <div className="fixed bottom-0 right-4 w-[360px] h-[500px] bg-white rounded-t-xl shadow-2xl border border-gray-300 z-[9999] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">
      
      {/* 1. Header */}
      <div 
        className="px-4 py-3 bg-white border-b border-gray-200 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(false)} // Click header to minimize
      >
        <div className="flex items-center gap-2">
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-none">Messaging</h3>
            <span className="text-[10px] text-green-600 font-medium">Live Chat Active</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Minimize2 size={18} className="hover:text-gray-700" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
        </div>
      </div>

      {/* 2. Messages Area (Continuous Scroll) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f3f3f3] custom-scrollbar">
        {loading ? (
            <div className="flex justify-center items-center h-full text-gray-400">
                <Loader size={24} className="animate-spin" />
            </div>
        ) : (
            messages.map((msg) => {
            // Check if the message belongs to the currently logged-in user
            const isMe = currentUser && msg.uid === currentUser.uid;

            return (
                <div 
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                {/* Sender Name (Only for others) */}
                {!isMe && (
                    <span className="text-[10px] text-gray-500 ml-1 mb-0.5 font-semibold">
                    {msg.name}
                    </span>
                )}

                {/* Message Bubble */}
                <div 
                    className={`px-4 py-2 max-w-[85%] text-sm shadow-sm break-words relative
                    ${isMe 
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none'
                    }`}
                >
                    {msg.text}
                </div>
                
                {/* Time */}
                <span className="text-[9px] text-gray-400 mt-1 px-1">
                    {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
                </div>
            );
            })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. Footer Input Area */}
      <div className="p-3 bg-white border-t border-gray-200 shrink-0">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Added Key Handler
              // Logic: Disable if not logged in
              disabled={!currentUser}
              placeholder={currentUser ? "Write a message..." : "Please login to chat"}
              className={`w-full bg-gray-100 text-gray-900 placeholder-gray-500 border-none rounded-full py-2.5 pl-4 pr-10 focus:ring-1 focus:ring-gray-300 focus:bg-white transition-all outline-none text-sm
                ${!currentUser ? 'cursor-not-allowed opacity-70' : ''}
              `}
            />
            {/* Smiley Icon inside Input (Hidden if disabled) */}
            {currentUser && (
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Smile size={18} />
              </button>
            )}
          </div>
          
          <button 
            type="submit"
            // Logic: Disable if not logged in OR input is empty
            disabled={!currentUser || !inputMessage.trim()}
            className={`p-2.5 rounded-full flex-shrink-0 transition-all shadow-sm ${
              (currentUser && inputMessage.trim()) 
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} fill={(currentUser && inputMessage.trim()) ? "currentColor" : "none"} />
          </button>

        </form>
      </div>

    </div>
  );
};

export default Message;