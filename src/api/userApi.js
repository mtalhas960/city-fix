const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * User API methods
 */
const userApi = {
  /**
   * Get all users with pagination and filtering (admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Users response with pagination
   */
  getUsers: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? 
      `${BASE_URL}/api/users?${queryString}` : 
      `${BASE_URL}/api/users`;
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(url, {
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
   * Get authenticated user profile
   * @returns {Promise<Object>} - User profile data
   */
  getProfile: async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/users/profile`, {
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
   * Update authenticated user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<Object>} - Updated user profile
   */
  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Get user by ID (admin only)
   * @param {string} userId - User ID
   * @returns {Promise<Object>} - User data
   */
  getUserById: async (userId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
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
   * Update user role (admin only)
   * @param {string} userId - User ID
   * @param {Object} roleData - Role data to update
   * @returns {Promise<Object>} - Updated user data
   */
  updateUserRole: async (userId, roleData) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(roleData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Update user active status (admin only)
   * @param {string} userId - User ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<Object>} - Updated user data
   */
  updateUserStatus: async (userId, isActive) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Delete user (admin only)
   * @param {string} userId - User ID
   * @returns {Promise<Object>} - Response message
   */
  deleteUser: async (userId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: 'DELETE',
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
  }
};

export default userApi;