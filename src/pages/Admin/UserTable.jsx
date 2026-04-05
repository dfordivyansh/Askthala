import React, { useState } from 'react';
import { Search, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminSidebar from './Sidebar';

// --- Mock Data (Extended to demonstrate pagination) ---
const MOCK_USERS = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', mobile: '+91 98765 43210', status: 'Active', joined: '2023-10-15' },
  { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', mobile: '+91 98989 12345', status: 'Active', joined: '2023-11-02' },
  { id: 3, name: 'Amit Singh', email: 'amit.cricket@test.com', mobile: '+91 91234 56789', status: 'Inactive', joined: '2023-12-10' },
  { id: 4, name: 'Sarah Jenkins', email: 'sarah.j@global.com', mobile: '+44 7700 900077', status: 'Banned', joined: '2024-01-05' },
  { id: 5, name: 'Vikram Malhotra', email: 'vikram.m@example.com', mobile: '+91 88888 99999', status: 'Active', joined: '2024-02-20' },
  { id: 6, name: 'Rahul Sharma', email: 'rahul.s@example.com', mobile: '+91 98765 43210', status: 'Active', joined: '2023-10-15' },
  { id: 7, name: 'Priya Patel', email: 'priya.p@example.com', mobile: '+91 98989 12345', status: 'Active', joined: '2023-11-02' },
  { id: 8, name: 'Amit Singh', email: 'amit.cricket@test.com', mobile: '+91 91234 56789', status: 'Inactive', joined: '2023-12-10' },
  { id: 9, name: 'Sarah Jenkins', email: 'sarah.j@global.com', mobile: '+44 7700 900077', status: 'Banned', joined: '2024-01-05' },
  { id: 10, name: 'Vikram Malhotra', email: 'vikram.m@example.com', mobile: '+91 88888 99999', status: 'Active', joined: '2024-02-20' },
];

const UserTableSection = ({ setIsAdminLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // 1. Filter Logic
  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm)
  );

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle Search (Reset to page 1)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle Page Change
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="flex min-h-screen bg-[#0a192f] font-sans">
      
      {/* Sidebar */}
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen ml-58">
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-[#112240] rounded-xl border border-[#233554] shadow-xl overflow-hidden">
            
            {/* Header & Search */}
            <div className="p-6 border-b border-[#233554] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Registered Users</h2>
                <p className="text-[#8892b0] text-sm mt-1">Manage user access and account details</p>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8892b0]" size={18} />
                <input 
                  type="text" 
                  placeholder="Search name, email, mobile..." 
                  value={searchTerm}
                  onChange={handleSearch}
                  className="bg-[#0a192f] border border-[#233554] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#00E5FF] w-full md:w-64 placeholder-[#8892b0]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0a192f] text-[#00E5FF] text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">User Info</th>
                    <th className="px-6 py-4 font-bold">Contact Info</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Joined</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#233554]">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#172a46] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#233554] flex items-center justify-center text-white font-bold mr-3 border border-[#00E5FF]/20 group-hover:border-[#00E5FF] transition-colors">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-xs text-[#8892b0]">ID: #{user.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-[#ccd6f6] text-sm">{user.email}</span>
                          <span className="text-[#8892b0] text-xs mt-1">{user.mobile}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          user.status === 'Active' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                          user.status === 'Inactive' ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                          "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-[#8892b0] text-sm">
                        {user.joined}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button className="text-[#8892b0] hover:text-[#00E5FF] transition-colors p-2 hover:bg-[#0a192f] rounded-full">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Empty State */}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-[#8892b0]">
                        No users found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-[#233554] flex items-center justify-between bg-[#112240]">
              <p className="text-sm text-[#8892b0]">
                Showing <span className="text-white font-medium">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)}</span> of <span className="text-white font-medium">{filteredUsers.length}</span> users
              </p>
              
              <div className="flex gap-2">
                <button 
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-xs rounded border border-[#233554] transition-colors flex items-center gap-1
                    ${currentPage === 1 
                      ? 'bg-[#0a192f]/50 text-[#8892b0]/50 cursor-not-allowed' 
                      : 'bg-[#0a192f] text-[#8892b0] hover:text-white hover:border-[#00E5FF]/50'}`}
                >
                  <ChevronLeft size={14} />
                  Prev
                </button>
                
                <button className="px-3 py-1 text-xs rounded bg-[#00E5FF] text-[#0a192f] font-bold shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                  {currentPage}
                </button>
                
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-3 py-1 text-xs rounded border border-[#233554] transition-colors flex items-center gap-1
                    ${currentPage === totalPages || totalPages === 0
                      ? 'bg-[#0a192f]/50 text-[#8892b0]/50 cursor-not-allowed' 
                      : 'bg-[#0a192f] text-[#8892b0] hover:text-white hover:border-[#00E5FF]/50'}`}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default UserTableSection;