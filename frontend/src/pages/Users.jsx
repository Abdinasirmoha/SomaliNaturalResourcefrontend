import React, { useState, useEffect } from 'react';
import { UserPlus, Users as UsersIcon, LayoutGrid, ClipboardCheck, Search, Filter, Pencil, RotateCcw, UserMinus } from 'lucide-react';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDelete from '../components/ConfirmDelete';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ 
    fullName: '', 
    username: '', 
    email: '', 
    password: '', 
    role: 'Manager',
    isActive: true 
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      // Attach mock data to users for UI purposes
      const dataWithMocks = data.map(u => ({
        ...u,
        department: mockDepartment(u.role, u.userID),
        lastLogin: mockLastLogin(u.isActive, u.userID)
      }));
      setUsers(dataWithMocks);
      setFilteredData(dataWithMocks);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data generators
  const mockDepartment = (role, id) => {
    const deps = ["IT Infrastructure", "Water Management", "Land Oversight", "Mineral Extraction", "Data Analytics"];
    return deps[id % deps.length];
  };

  const mockLastLogin = (isActive, id) => {
    if (!isActive) return "14 Oct 2023";
    const times = ["2 hours ago", "Never", "5 mins", "1 day ago", "Just now"];
    return times[id % times.length];
  };

  // Client-side search
  useEffect(() => {
    const results = users.filter(item =>
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenModal = (user = null) => {
    setFormError('');
    if (user) {
      setCurrentUser(user);
      setFormData({ 
        fullName: user.fullName, 
        username: user.username, 
        email: user.email, 
        password: '', // Don't populate password on edit
        role: user.role,
        isActive: user.isActive 
      });
    } else {
      setCurrentUser(null);
      setFormData({ 
        fullName: '', 
        username: '', 
        email: '', 
        password: '', 
        role: 'Manager',
        isActive: true 
      });
    }
    setIsModalOpen(true);
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!isValidEmail(formData.email)) {
       setFormError('Please enter a valid email address.');
       return;
    }

    if (!currentUser && !formData.password) {
       setFormError('Password is required for new users.');
       return;
    }

    setIsSubmitting(true);

    try {
      const usernameExists = users.some(u => 
        u.username.toLowerCase() === formData.username.toLowerCase() && 
        (!currentUser || u.userID !== currentUser.userID)
      );
      
      const emailExists = users.some(u => 
        u.email.toLowerCase() === formData.email.toLowerCase() && 
        (!currentUser || u.userID !== currentUser.userID)
      );

      if (usernameExists) {
        setFormError('Username is already taken.');
        setIsSubmitting(false);
        return;
      }
      
      if (emailExists) {
        setFormError('Email is already registered.');
        setIsSubmitting(false);
        return;
      }

      if (currentUser) {
        const updateData = { ...formData, userID: currentUser.userID };
        if (updateData.password) {
          updateData.passwordHash = updateData.password;
        } else {
          // If password is not provided on edit, keep existing
          updateData.passwordHash = currentUser.passwordHash || currentUser.password; 
        }
        delete updateData.password;
        await updateUser(currentUser.userID, updateData);
      } else {
        const createData = { ...formData, passwordHash: formData.password };
        delete createData.password;
        await createUser(createData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      setFormError(error.response?.data?.message || 'Failed to save user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDelete = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteUser(currentUser.userID);
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete user. They might have generated reports.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (id) => {
    const colors = ['bg-[#bbf7d0] text-[#166534]', 'bg-[#bfdbfe] text-[#1e3a8a]', 'bg-[#e5e7eb] text-[#374151]', 'bg-[#fef08a] text-[#854d0e]'];
    return colors[id % colors.length];
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#003b5c] tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage administrative access and field operative credentials for the Somalia NRM System.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#004a70] hover:bg-[#003b5c] focus:outline-none transition-colors"
        >
          <UserPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add New User
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
              <UsersIcon className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-0.5">Total Users</p>
              <h3 className="text-4xl font-bold text-[#003b5c]">{users.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
              <LayoutGrid className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-0.5">Active Sessions</p>
              <h3 className="text-4xl font-bold text-[#0081a7]">42</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mr-4">
              <ClipboardCheck className="h-6 w-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-0.5">Pending Approvals</p>
              <h3 className="text-4xl font-bold text-[#927318]">15</h3>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-3xl overflow-hidden flex flex-col">
        {/* Table Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center bg-gray-50/30">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0c4a34] sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-full py-2 pl-4 pr-8 focus:ring-0 cursor-pointer shadow-sm appearance-none outline-none">
            <option>All Roles</option>
            <option>Administrator</option>
            <option>Field Auditor</option>
          </select>
          <select className="bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-full py-2 pl-4 pr-8 focus:ring-0 cursor-pointer shadow-sm appearance-none outline-none">
            <option>All Departments</option>
            <option>IT Infrastructure</option>
            <option>Water Management</option>
          </select>
          <button className="ml-auto inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-800 uppercase tracking-widest">User Details</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-800 uppercase tracking-widest">Role</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-800 uppercase tracking-widest">Department</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-800 uppercase tracking-widest">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-800 uppercase tracking-widest">Last Login</th>
                <th scope="col" className="px-6 py-4 text-right text-[11px] font-bold text-gray-800 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentData.length > 0 ? (
                currentData.map((user) => (
                  <tr key={user.userID} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${getAvatarColor(user.userID)}`}>
                           {getInitials(user.fullName)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{user.fullName}</div>
                          <div className="text-[11px] font-medium text-gray-500 mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-700 font-medium">{user.role === 'Admin' ? 'Administrator' : 'Manager'}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-600 font-medium max-w-[120px] leading-snug">{user.department}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                        user.isActive 
                           ? 'bg-green-100 text-green-700' 
                           : 'bg-gray-200 text-gray-600'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-medium max-w-[80px] whitespace-normal leading-snug">{user.lastLogin}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button 
                          onClick={() => handleOpenModal(user)}
                          className="text-gray-400 hover:text-gray-800 transition-colors"
                          title="Edit User"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-gray-800 transition-colors"
                          title="Reset Password / History"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleOpenDelete(user)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Disable User"
                        >
                          <UserMinus className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                     {loading ? 'Loading users...' : 'No users found.'}
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-end">
           <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
           />
        </div>
      </div>

      {/* Add/Edit Modal (Unchanged functionality) */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentUser ? 'Edit User' : 'Add New User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password {!currentUser && <span className="text-red-500">*</span>}</label>
              <input
                type="password"
                required={!currentUser}
                placeholder={currentUser ? "(Leave blank to keep)" : ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700">Role <span className="text-red-500">*</span></label>
               <select
                 required
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border bg-white"
                 value={formData.role}
                 onChange={(e) => setFormData({ ...formData, role: e.target.value })}
               >
                 <option value="Manager">Manager</option>
                 <option value="Admin">Admin</option>
               </select>
             </div>
             
             <div className="flex items-end mb-2">
               <div className="flex items-center h-5">
                 <input
                   id="isActive"
                   type="checkbox"
                   className="focus:ring-[#0c4a34] h-4 w-4 text-[#0c4a34] border-gray-300 rounded"
                   checked={formData.isActive}
                   onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                 />
                 <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 font-medium">
                   Active Account
                 </label>
               </div>
             </div>
          </div>
          
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full justify-center rounded-md bg-[#004a70] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#003b5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c4a34] sm:col-start-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
               type="button"
               className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
               onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={currentUser?.fullName}
        isDeleting={isSubmitting}
      />
    </div>
  );
};

export default Users;
