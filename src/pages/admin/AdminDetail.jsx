import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  RiSaveLine,
  RiDeleteBin6Line,
  RiLockLine,
  RiMailLine,
  RiPhoneLine,
  RiCalendarLine,
  RiTimeLine,
  RiFileList3Line
} from '@remixicon/react';
import admins from '../../data/admins';

const AdminDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find admin with matching ID
  const adminData = admins.find(admin => admin.id === id);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    status: '',
    permissions: []
  });
  
  // Initialize form with admin data
  useEffect(() => {
    if (!adminData) {
      toast.error('Administrator not found');
      setTimeout(() => {
        navigate('/admin-panel/admins');
      }, 2000);
      return;
    }
    
    setFormData({
      name: adminData.name || '',
      email: adminData.email || '',
      phone: adminData.phone || '',
      role: adminData.role || '',
      department: adminData.department || '',
      status: adminData.status || 'active',
      permissions: adminData.permissions || []
    });
  }, [adminData, navigate]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle permission checkbox changes
  const handlePermissionChange = (permission) => {
    setFormData(prev => {
      const updatedPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      
      return {
        ...prev,
        permissions: updatedPermissions
      };
    });
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle admin update
  const handleUpdateAdmin = () => {
    toast.success('Administrator updated successfully! (Server logic will be set for this task when backend will be created)');
  };
  
  // Handle admin deletion
  const handleDeleteAdmin = () => {
    if (window.confirm('Are you sure you want to delete this administrator?')) {
      toast.info('Administrator deleted successfully! (Server logic will be set for this task when backend will be created)');
      
      setTimeout(() => {
        navigate('/admin-panel/admins');
      }, 2000);
    }
  };
  
  // Handle password reset
  const handleResetPassword = () => {
    toast.success('Password reset link sent! (Server logic will be set for this task when backend will be created)');
  };
  
  // If admin data is not found, show loading or error
  if (!adminData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-darkGray/70">Loading administrator details...</p>
      </div>
    );
  }
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-2xl shadow-md max-w-6xl w-full mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 border-b">
          <h4>Administrator Details – {adminData.name}</h4>
        </div>

        <div className="p-6">
          {/* Admin ID and Join Date */}
          <div className="flex flex-wrap items-center justify-between mb-6 text-sm text-darkGray/70">
            <div className="flex items-center">
              <span className="font-medium">Admin ID:</span>
              <span className="ml-2">{adminData.id}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
              <div className="flex items-center">
                <RiCalendarLine className="h-4 w-4 mr-1" />
                <span>Joined: {formatDate(adminData.joinedAt)}</span>
              </div>
              <div className="flex items-center">
                <RiTimeLine className="h-4 w-4 mr-1" />
                <span>Last Active: {formatDate(adminData.lastActive)}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Photo Section */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center p-6 bg-lightGray/30 rounded-lg">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                  <img
                    src={adminData.avatar}
                    alt={adminData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h5 className="text-lg font-medium text-darkGray mb-1">{adminData.name}</h5>
                <p className="text-sm text-darkGray/70 mb-4">{adminData.role}</p>
                
                <div className="flex items-center mb-2">
                  <RiFileList3Line className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm">{adminData.assignedReports} Reports Assigned</span>
                </div>
                
                <button
                  onClick={handleResetPassword}
                  className="mt-4 px-4 py-2 bg-gray-100 text-darkGray rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                >
                  <RiLockLine className="mr-2 h-5 w-5" />
                  Reset Password
                </button>
              </div>
            </div>
            
            {/* Admin Information */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-darkGray/70 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-darkGray/70 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiMailLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-darkGray/70 mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiPhoneLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-darkGray/70 mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Field Officer">Field Officer</option>
                    <option value="Support Staff">Support Staff</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-darkGray/70 mb-2">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="IT Department">IT Department</option>
                    <option value="Public Works">Public Works</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Waste Management">Waste Management</option>
                    <option value="Parks & Recreation">Parks & Recreation</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-darkGray/70 mb-2">Status</label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-darkGray">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === 'inactive'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-danger focus:ring-danger"
                    />
                    <span className="ml-2 text-sm text-darkGray">Inactive</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-darkGray/70 mb-2">Permissions</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <label className="inline-flex items-center bg-lightGray/20 p-2 rounded-md cursor-pointer hover:bg-lightGray/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes('create')}
                      onChange={() => handlePermissionChange('create')}
                      className="form-checkbox h-4 w-4 text-primary focus:ring-primary rounded"
                    />
                    <span className="ml-2 text-sm text-darkGray">Create</span>
                  </label>
                  <label className="inline-flex items-center bg-lightGray/20 p-2 rounded-md cursor-pointer hover:bg-lightGray/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes('read')}
                      onChange={() => handlePermissionChange('read')}
                      className="form-checkbox h-4 w-4 text-primary focus:ring-primary rounded"
                    />
                    <span className="ml-2 text-sm text-darkGray">Read</span>
                  </label>
                  <label className="inline-flex items-center bg-lightGray/20 p-2 rounded-md cursor-pointer hover:bg-lightGray/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes('update')}
                      onChange={() => handlePermissionChange('update')}
                      className="form-checkbox h-4 w-4 text-primary focus:ring-primary rounded"
                    />
                    <span className="ml-2 text-sm text-darkGray">Update</span>
                  </label>
                  <label className="inline-flex items-center bg-lightGray/20 p-2 rounded-md cursor-pointer hover:bg-lightGray/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes('delete')}
                      onChange={() => handlePermissionChange('delete')}
                      className="form-checkbox h-4 w-4 text-primary focus:ring-primary rounded"
                    />
                    <span className="ml-2 text-sm text-darkGray">Delete</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with buttons */}
        <div className="px-6 py-4 bg-lightGray/50 border-t flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={handleDeleteAdmin}
            className="px-4 py-2 bg-danger text-white text-sm font-medium rounded-lg hover:bg-danger/90 transition-colors"
          >
            <RiDeleteBin6Line className="h-5 w-5 inline mr-1" />
            Delete Administrator
          </button>
          <button
            onClick={handleUpdateAdmin}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RiSaveLine className="h-5 w-5 inline mr-1" />
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDetail;