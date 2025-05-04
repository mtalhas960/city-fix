import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RiEditLine, RiDeleteBin6Line, RiShieldCheckLine } from '@remixicon/react';

const RolesPermissionsSettings = () => {
  // Mock roles data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      color: 'primary',
      permissions: ['all'],
      members: 1,
      isSystem: true,
    },
    {
      id: 2,
      name: 'Moderator',
      color: 'warning',
      permissions: ['view_reports', 'edit_reports', 'manage_categories'],
      members: 2,
      isSystem: false,
    },
    {
      id: 3,
      name: 'Support',
      color: 'success',
      permissions: ['view_reports', 'add_comments'],
      members: 1,
      isSystem: false,
    },
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    permissions: ['view_reports'],
  });
  const [assignRole, setAssignRole] = useState({
    adminId: '',
    roleId: '',
  });

  const handleRoleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole(prev => ({ ...prev, [name]: value }));
  };
  const handlePermissionChange = (permission) => {
    setNewRole(prev => {
      if (prev.permissions.includes(permission)) {
        return {
          ...prev,
          permissions: prev.permissions.filter(p => p !== permission),
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permission],
        };
      }
    });
  };

  const handleAssignInputChange = (e) => {
    const { name, value } = e.target;
    setAssignRole(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateRole = (e) => {
    e.preventDefault();
    if (!newRole.name.trim()) {
      toast.error('Please enter a role name');
      return;
    }
    if (newRole.permissions.length === 0) {
      toast.error('Please select at least one permission');
      return;
    }
    const newId = roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1;
    setRoles([...roles, {
      id: newId,
      name: newRole.name,
      color: 'primary',
      permissions: [...newRole.permissions],
      members: 0,
      isSystem: false,
    }]);
    toast.success(`Role "${newRole.name}" created successfully! (Server logic will be set for this task when backend will be created)`);
    setNewRole({
      name: '',
      permissions: ['view_reports'],
    });
  };

  const handleAssignRole = (e) => {
    e.preventDefault();
    if (!assignRole.adminId || !assignRole.roleId) {
      toast.error('Please select both an admin and a role');
      return;
    }
    const roleInfo = roles.find(r => r.id === parseInt(assignRole.roleId));
    toast.success(`Role assigned successfully! (Server logic will be set for this task when backend will be created)`);
    setAssignRole({
      adminId: '',
      roleId: '',
    });
  };

  const handleDeleteRole = (id, name, isSystem) => {
    if (isSystem) {
      toast.error('System roles cannot be deleted');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the "${name}" role?`)) {
      setRoles(roles.filter(role => role.id !== id));
      toast.info(`Role "${name}" deleted successfully! (Server logic will be set for this task when backend will be created)`);
    }
  };

  const renderPermissionBadges = (permissions) => {
    if (permissions.includes('all')) {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
          All Permissions
        </span>
      );
    }
    
    return permissions.map((permission, index) => {
      const formattedPermission = permission
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
      return (
        <span 
          key={index}
          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
        >
          {formattedPermission}
        </span>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h4>Admin Roles</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-lightGray">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-lightGray/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`h-8 w-8 rounded-full bg-${role.color}/10 flex items-center justify-center text-${role.color}`}>
                          <RiShieldCheckLine className="h-4 w-4" />
                        </span>
                        <span className="ml-3 font-medium">{role.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-darkGray/70">
                        <div className="flex flex-wrap gap-2">
                          {renderPermissionBadges(role.permissions)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darkGray/70">
                      {role.members}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm pe-10">
                      <button 
                        className={`text-danger ${role.isSystem ? 'opacity-50 cursor-not-allowed' : 'hover:text-danger/80'}`}
                        title={role.isSystem ? "System roles cannot be deleted" : "Delete Role"}
                        onClick={() => handleDeleteRole(role.id, role.name, role.isSystem)}
                      >
                        <RiDeleteBin6Line className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden mt-6">
          <div className="px-6 py-4 border-b">
            <h5>Assign Role to Admin</h5>
          </div>
          <div className="p-6">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleAssignRole}>
              <div>
                <label htmlFor="adminId" className="block text-sm font-medium text-darkGray/70 mb-2">
                  Select Admin
                </label>
                <select 
                  id="adminId" 
                  name="adminId"
                  value={assignRole.adminId}
                  onChange={handleAssignInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>Choose an admin</option>
                  <option value="1">John Doe</option>
                  <option value="2">Alex Smith</option>
                  <option value="3">Sarah Johnson</option>
                  <option value="4">David Park</option>
                </select>
              </div>

              <div>
                <label htmlFor="roleId" className="block text-sm font-medium text-darkGray/70 mb-2">
                  Assign Role
                </label>
                <select 
                  id="roleId" 
                  name="roleId"
                  value={assignRole.roleId}
                  onChange={handleAssignInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>Choose a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Assign Role
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow p-6">
          <h5 className="mb-4">Create New Role</h5>
          <form onSubmit={handleCreateRole}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-darkGray/70 mb-2">
                Role Name
              </label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={newRole.name}
                onChange={handleRoleInputChange}
                placeholder="Enter role name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-darkGray/70 mb-3">Permissions</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="perm-view-reports" 
                    checked={newRole.permissions.includes('view_reports')}
                    onChange={() => handlePermissionChange('view_reports')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="perm-view-reports" className="ml-2 text-sm text-darkGray">
                    View Reports
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="perm-edit-reports" 
                    checked={newRole.permissions.includes('edit_reports')}
                    onChange={() => handlePermissionChange('edit_reports')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="perm-edit-reports" className="ml-2 text-sm text-darkGray">
                    Edit Reports
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="perm-delete-reports" 
                    checked={newRole.permissions.includes('delete_reports')}
                    onChange={() => handlePermissionChange('delete_reports')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="perm-delete-reports" className="ml-2 text-sm text-darkGray">
                    Delete Reports
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="perm-manage-categories" 
                    checked={newRole.permissions.includes('manage_categories')}
                    onChange={() => handlePermissionChange('manage_categories')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="perm-manage-categories" className="ml-2 text-sm text-darkGray">
                    Manage Categories
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="perm-admin-users" 
                    checked={newRole.permissions.includes('admin_users')}
                    onChange={() => handlePermissionChange('admin_users')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="perm-admin-users" className="ml-2 text-sm text-darkGray">
                    Add/Remove Admins
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="perm-manage-settings" 
                    checked={newRole.permissions.includes('manage_settings')}
                    onChange={() => handlePermissionChange('manage_settings')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="perm-manage-settings" className="ml-2 text-sm text-darkGray">
                    Manage Settings
                  </label>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Save Role
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionsSettings;
