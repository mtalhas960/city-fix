/**
 * Log API methods (admin only)
 */
const BASE_URL = import.meta.env.VITE_API_URL;

const logApi = {
  /**
   * Get system logs with filtering and pagination
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Logs with pagination
   */
  getLogs: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? 
      `${BASE_URL}/api/logs?${queryString}` : 
      `${BASE_URL}/api/logs`;
    
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
   * Get logs for a specific entity
   * @param {string} entityType - Entity type
   * @param {string} entityId - Entity ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Entity logs with pagination
   */
  getEntityLogs: async (entityType, entityId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? 
      `${BASE_URL}/api/logs/entity/${entityType}/${entityId}?${queryString}` : 
      `${BASE_URL}/api/logs/entity/${entityType}/${entityId}`;
    
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
   * Get logs by user
   * @param {string} userId - User ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - User logs with pagination
   */
  getUserLogs: async (userId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? 
      `${BASE_URL}/api/logs/user/${userId}?${queryString}` : 
      `${BASE_URL}/api/logs/user/${userId}`;
    
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
   * Get log statistics
   * @returns {Promise<Object>} - Log statistics
   */
  getLogStatistics: async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/logs/statistics`, {
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
  }
};

export default logApi;
