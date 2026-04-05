import React, { useEffect, useState } from 'react';
import { subscribeToUserComplaints } from '../services/dbService';
import { useAuth } from '../context/AuthContext';
import { data } from 'react-router-dom';


const MyComplaint=()=>{
    const {currentUser}=useAuth();
    const [complaints,setComplaints]=useState([]);
    const [loading,setLoading]=useState(true);

    // status color logic
    const getStatusColor =(status)=>{
        switch(status){
          case 'solved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'unsolved': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
        }
    
    }
    useEffect(()=>{
        if(!currentUser) return;

        const unsubscribe =subscribeToUserComplaints(currentUser.uid,(data)=>{
            setComplaints(data);
            setLoading(false);
        })
        return ()=>unsubscribe();
    },[currentUser])
    if (loading) return <div>Loading your tickets...</div>;
    return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Complaints</h1>
      
      <div className="grid gap-4">
        {complaints.map(ticket => (
          <div key={ticket.id} className="border p-4 rounded shadow-sm bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{ticket.appName}</h3>
                <p className="text-gray-600 mt-1">{ticket.text}</p>
                <span className="text-xs text-gray-400 mt-2 block">
                  Rating: {ticket.appRating}
                </span>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
          </div>
        ))}
        
        {complaints.length === 0 && <p>No complaints raised yet.</p>}
      </div>
    </div>
  );
}
export default MyComplaint;