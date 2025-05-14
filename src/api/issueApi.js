/**
 * Issue API methods
 */
const BASE_URL = import.meta.env.VITE_API_URL;

const issueApi = {
  /**
   * Get all issues with filtering and pagination
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Issues response with pagination
   */
  getIssues: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? 
      `${BASE_URL}/api/issues?${queryString}` : 
      `${BASE_URL}/api/issues`;
    
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Create a new issue report
   * @param {Object} issueData - Issue data
   * @returns {Promise<Object>} - Created issue data
   */
  createIssue: async (issueData) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(issueData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Get user's own reported issues
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - User's issues with pagination
   */
  getMyIssues: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? 
      `${BASE_URL}/api/issues/my-issues?${queryString}` : 
      `${BASE_URL}/api/issues/my-issues`;
    
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
   * Get issue statistics and analytics
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Issue statistics
   */
  getStatistics: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? 
      `${BASE_URL}/api/issues/statistics?${queryString}` : 
      `${BASE_URL}/api/issues/statistics`;
    
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Get issue by ID
   * @param {string} issueId - Issue ID
   * @returns {Promise<Object>} - Issue details
   */
  getIssueById: async (issueId) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(`${BASE_URL}/api/issues/${issueId}`, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Update issue (admin only)
   * @param {string} issueId - Issue ID
   * @param {Object} issueData - Issue data to update
   * @returns {Promise<Object>} - Updated issue data
   */
  updateIssue: async (issueId, issueData) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/issues/${issueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(issueData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  /**
   * Delete issue (admin only)
   * @param {string} issueId - Issue ID
   * @returns {Promise<Object>} - Response message
   */
  deleteIssue: async (issueId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/issues/${issueId}`, {
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
  },

  /**
   * Upvote an issue
   * @param {string} issueId - Issue ID
   * @returns {Promise<Object>} - Response with updated upvote count
   */
  upvoteIssue: async (issueId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/api/issues/${issueId}/upvote`, {
        method: 'POST',
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

export default issueApi;
