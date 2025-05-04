import React, { useState } from 'react';
import CategoriesSettings from '../../components/admin/CategoriesSettings';
import ReportRulesSettings from '../../components/admin/ReportRulesSettings';
import RolesPermissionsSettings from '../../components/admin/RolesPermissionsSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('categories');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="mb-6">
        <h4>Settings</h4>
        <p className="text-darkGray/70">Manage application settings, categories, roles, and permissions.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl shadow mb-6">
        <div>
          <nav className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => handleTabChange('categories')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'categories'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-darkGray/70 hover:text-darkGray'
              }`}
            >
              Issue Categories
            </button>
            <button
              onClick={() => handleTabChange('rules')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'rules'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-darkGray/70 hover:text-darkGray'
              }`}
            >
              Report Rules
            </button>
            <button
              onClick={() => handleTabChange('roles')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'roles'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-darkGray/70 hover:text-darkGray'
              }`}
            >
              Admin Roles & Permissions
            </button>
          </nav>
        </div>
      </div>

      {/* Settings Content */}
      <div id="settings-content">
        {activeTab === 'categories' && <CategoriesSettings />}
        {activeTab === 'rules' && <ReportRulesSettings />}
        {activeTab === 'roles' && <RolesPermissionsSettings />}
      </div>
    </div>
  );
};

export default Settings;