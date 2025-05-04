import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  RiSaveLine,
  RiArrowLeftLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
  RiLockLine
} from '@remixicon/react';

const AdminAdd = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Support Staff',
    department: 'Public Works',
    status: 'active',
    permissions: ['read']
  });
  
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
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('New administrator added successfully! (Server logic will be set for this task when backend will be created)');
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/admin-panel/admins');
      }, 2000);
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-2xl shadow-md max-w-4xl w-full mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 border-b">
          <h4 className="text-xl font-medium text-darkGray">Add New Administrator</h4>
          <button 
            onClick={() => navigate('/admin-panel/admins')}
            className="text-darkGray/70 hover:text-primary flex items-center"
          >
            <RiArrowLeftLine className="mr-1 h-5 w-5" />
            Back to Administrators
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div>
              <h5 className="text-lg font-medium text-darkGray mb-4">Basic Information</h5>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-darkGray/70 mb-2">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiUserLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter full name"
                      className="w-full pl-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-darkGray/70 mb-2">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiMailLine className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email address"
                        className="w-full pl-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-darkGray/70 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiPhoneLine className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full pl-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Password Section */}
            <div>
              <h5 className="text-lg font-medium text-darkGray mb-4">Set Password</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-darkGray/70 mb-2">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create password"
                      className="w-full pl-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-darkGray/70 mb-2">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm password"
                      className="w-full pl-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Role & Department Section */}
            <div>
              <h5 className="text-lg font-medium text-darkGray mb-4">Role & Access</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            </div>
            
            {/* Permissions Section */}
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
          
          {/* Form Submission */}
          <div className="mt-8 pt-6 border-t flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin-panel/admins')}
              className="px-4 py-2 border border-gray-300 text-darkGray rounded-lg hover:bg-lightGray mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <RiSaveLine className="h-5 w-5 mr-1" />
              {isLoading ? 'Adding...' : 'Add Administrator'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAdd;
