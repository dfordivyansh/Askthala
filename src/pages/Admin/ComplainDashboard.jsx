import React, { useEffect, useState } from "react";
import AdminSidebar from "./Sidebar";
import { collection, onSnapshot, updateDoc ,doc} from "firebase/firestore";
import { db } from "../../config/firebase";

function ComplainDashboard({ setIsAdminLoggedIn }) {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
const [search, setSearch] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "complaints"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(data);
    });
    return () => unsubscribe();
  }, []);
  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "complaints", id), {
        status: newStatus,
      });
      alert("Status Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Updating of Status Failed");
    }
  };
  const filteredComplaints=complaints.filter((c)=>{
    if(filterStatus!=='all' && c.status!==filterStatus){
      return false;
    }
    if(search){
      const term =search.toLowerCase();
      return(
        c.userName?.toLowerCase().includes(term) ||
         c.appName?.toLowerCase().includes(term) ||
      c.complaintText?.toLowerCase().includes(term)
      )
    }
    return true;
  })

  return (
    <div className="flex font-sans bg-[#0a192f] min-h-screen">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />
     <div className="flex-1 p-4 sm:p-6 md:p-8 ml-0 md:ml-64 transition-all">

  {/* Header */}
  <h1 className="text-xl sm:text-2xl font-bold mb-4 text-white">
    Complaints Management
  </h1>

  {/* Filters */}
  <div className="flex flex-col sm:flex-row gap-3 mb-4">
    <select
    value={filterStatus}
    onChange={(e)=>setFilterStatus(e.target.value)}
     className="border p-2 rounded w-full sm:w-48 text-amber-50 bg-black">
      <option value={'all'}>Status Filter</option>
      <option value={'open'}>Open</option>
      <option value={'solved'}>Solved</option>
      <option value={'rejected'}>Rejected</option>
      <option value={'unsolved'}>Unsolved</option>
    </select>

    <input 
      type="text" 
      placeholder="Search by user, app, or text"
      value={search}
    onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded w-full sm:w-64 bg-amber-50"
    />
  </div>

  {/* Table Container */}
  <div className="overflow-x-auto bg-white rounded-lg shadow">

    <table className="min-w-[700px] w-full text-sm">

      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">User</th>
          <th className="p-3 text-left">App</th>
          <th className="p-3 text-left">Complaint</th>
          <th className="p-3 text-left">User Rating</th>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredComplaints.map((c) => (
          <tr key={c.id} className="border-b hover:bg-gray-50">

            <td className="p-3">{c.userName}</td>

            <td className="p-3 flex gap-2 items-center">
              <img
                src={c.appLogo}
                className="w-8 h-8 object-contain"
              />
              <span>{c.appName}</span>
            </td>

            <td className="p-3 max-w-[180px] truncate">
              {c.complaintText}
            </td>

            <td className="p-3">⭐ {c.userRating}</td>

            <td className="p-3 whitespace-nowrap">
              {c.createdAt?.toDate().toLocaleString()}
            </td>

            <td className="p-3">
              <span className={`px-2 py-1 rounded text-white text-xs
                ${c.status === "open" && "bg-yellow-500"}
                ${c.status === "solved" && "bg-green-500"}
                ${c.status === "rejected" && "bg-red-500"}
                ${c.status === "unsolved" && "bg-gray-600"}
              `}>
                {c.status}
              </span>
            </td>

            <td className="p-3">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => updateStatus(c.id, "solved")} className="bg-green-500 text-white px-2 py-1 rounded text-xs">Solved</button>
                <button onClick={() => updateStatus(c.id, "rejected")} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Reject</button>
                <button onClick={() => updateStatus(c.id, "unsolved")} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Unsolved</button>
              </div>
            </td>

          </tr>
        ))}
      </tbody>

    </table>

  </div>

</div>

    </div>
  );
}

export default ComplainDashboard;
