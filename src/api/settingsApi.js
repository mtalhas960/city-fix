/**
 * Settings API methods
 */
const BASE_URL = import.meta.env.VITE_API_URL;

const settingsApi = {
  /**
   * Get all application settings (admin only)
   * @returns {Promise<Object>} - All settings
   */
  getAllSettings: async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Get public application settings
   * @returns {Promise<Object>} - Public settings
   */
  getPublicSettings: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/settings/public`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Get issue categories (admin only)
   * @returns {Promise<Object>} - Categories list
   */
  getIssueCategories: async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/categories/issues`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Add issue category (admin only)
   * @param {string} newCategory - New category name
   * @returns {Promise<Object>} - Updated categories list
   */
  addIssueCategory: async (newCategory) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/categories/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newCategory })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Delete issue category (admin only)
   * @param {string} category - Category to delete
   * @returns {Promise<Object>} - Updated categories list
   */
  deleteIssueCategory: async (category) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/categories/issues`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ category })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Update image settings (admin only)
   * @param {Object} imageSettings - Image settings to update
   * @returns {Promise<Object>} - Updated settings
   */
  updateImageSettings: async (imageSettings) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/images/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(imageSettings)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Update minimum description length (admin only)
   * @param {number} minLength - Minimum description length
   * @returns {Promise<Object>} - Updated setting
   */
  updateMinDescriptionLength: async (minLength) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/description/minimum`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ minLength })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Update location auto-detection setting (admin only)
   * @param {boolean} enabled - Enable/disable auto-detection
   * @returns {Promise<Object>} - Updated setting
   */
  updateLocationAutoDetect: async (enabled) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/location/autoDetect`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ enabled })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Get admin roles and permissions (admin only)
   * @returns {Promise<Object>} - Roles and permissions
   */
  getAdminRoles: async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/admin/roles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Add admin role (admin only)
   * @param {string} role - Role name
   * @param {Array<string>} permissions - List of permissions
   * @returns {Promise<Object>} - Updated roles
   */
  addAdminRole: async (role, permissions) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/admin/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role, permissions })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Delete admin role (admin only)
   * @param {string} role - Role to delete
   * @returns {Promise<Object>} - Updated roles
   */
  deleteAdminRole: async (role) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/settings/admin/roles`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
};

export default settingsApi;
