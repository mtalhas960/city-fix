import React, { useState, useEffect } from 'react';

const FilterModal = ({ isOpen, onClose, onApply, currentFilters }) => {
  if (!isOpen) return null;
  const [filters, setFilters] = useState({
    category: currentFilters.category || 'all',
    status: currentFilters.status || 'all',
    priority: currentFilters.priority || 'all',
    time: currentFilters.time || 'all'
  });
  useEffect(() => {
    setFilters({
      category: currentFilters.category || 'all',
      status: currentFilters.status || 'all',
      priority: currentFilters.priority || 'all',
      time: currentFilters.time || 'all'
    });
  }, [currentFilters, isOpen]);

  const handleChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      category: 'all',
      status: 'all',
      priority: 'all',
      time: 'all'
    });
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-darkGray/50 z-50 flex items-center justify-center p-4" onClick={handleOutsideClick}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] pb-[20px]">
        <div className="h-[60px] p-4 border-b border-gray-200 flex justify-between items-center">
          <h4>Filter Issues</h4>
          <button onClick={onClose} className="text-darkGray hover:text-danger">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 h-[calc(80vh-200px)] md:h-[calc(80vh-140px)] overflow-y-auto">
          <div className="mb-6">
            <label className="text-sm font-medium text-darkGray block mb-2">Categories</label>
            <div className="grid sm:grid-cols-2 gap-2">
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="category-filter" 
                  className="form-radio h-4 w-4 text-primary" 
                  checked={filters.category === 'all'} 
                  onChange={() => handleChange('category', 'all')}
                />
                <span className="ml-2 text-sm text-darkGray">All Issues</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="category-filter" 
                  className="form-radio h-4 w-4 text-primary"
                  checked={filters.category === 'pothole'} 
                  onChange={() => handleChange('category', 'pothole')}
                />
                <span className="ml-2 text-sm text-darkGray">Pothole</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="category-filter" 
                  className="form-radio h-4 w-4 text-primary"
                  checked={filters.category === 'streetlight'} 
                  onChange={() => handleChange('category', 'streetlight')}
                />
                <span className="ml-2 text-sm text-darkGray">Broken Streetlight</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="category-filter" 
                  className="form-radio h-4 w-4 text-primary"
                  checked={filters.category === 'garbage'} 
                  onChange={() => handleChange('category', 'garbage')}
                />
                <span className="ml-2 text-sm text-darkGray">Garbage</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="category-filter" 
                  className="form-radio h-4 w-4 text-primary"
                  checked={filters.category === 'water'} 
                  onChange={() => handleChange('category', 'water')}
                />
                <span className="ml-2 text-sm text-darkGray">Water Leakage</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="category-filter" 
                  className="form-radio h-4 w-4 text-primary"
                  checked={filters.category === 'other'} 
                  onChange={() => handleChange('category', 'other')}
                />
                <span className="ml-2 text-sm text-darkGray">Other</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-darkGray block mb-2">Status</label>
            <div className="grid sm:grid-cols-2 gap-2">
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="status-filter" 
                  className="form-radio h-4 w-4 text-primary" 
                  checked={filters.status === 'all'} 
                  onChange={() => handleChange('status', 'all')}
                />
                <span className="ml-2 text-sm text-darkGray">All</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="status-filter" 
                  className="form-radio h-4 w-4 text-danger"
                  checked={filters.status === 'pending'} 
                  onChange={() => handleChange('status', 'pending')}
                />
                <span className="ml-2 text-sm text-darkGray">Pending</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="status-filter" 
                  className="form-radio h-4 w-4 text-warning"
                  checked={filters.status === 'in-progress'} 
                  onChange={() => handleChange('status', 'in-progress')}
                />
                <span className="ml-2 text-sm text-darkGray">In Progress</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="status-filter" 
                  className="form-radio h-4 w-4 text-success"
                  checked={filters.status === 'resolved'} 
                  onChange={() => handleChange('status', 'resolved')}
                />
                <span className="ml-2 text-sm text-darkGray">Completed</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-darkGray block mb-2">Priority</label>
            <div className="grid sm:grid-cols-2 gap-2">
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="priority-filter" 
                  className="form-radio h-4 w-4 text-primary" 
                  checked={filters.priority === 'all'} 
                  onChange={() => handleChange('priority', 'all')}
                />
                <span className="ml-2 text-sm text-darkGray">All</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="priority-filter" 
                  className="form-radio h-4 w-4 text-success"
                  checked={filters.priority === 'Low'} 
                  onChange={() => handleChange('priority', 'Low')}
                />
                <span className="ml-2 text-sm text-darkGray">Low</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="priority-filter" 
                  className="form-radio h-4 w-4 text-warning"
                  checked={filters.priority === 'Moderate'} 
                  onChange={() => handleChange('priority', 'Moderate')}
                />
                <span className="ml-2 text-sm text-darkGray">Moderate</span>
              </label>
              <label className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="priority-filter" 
                  className="form-radio h-4 w-4 text-danger"
                  checked={filters.priority === 'High'} 
                  onChange={() => handleChange('priority', 'High')}
                />
                <span className="ml-2 text-sm text-darkGray">High</span>
              </label>
            </div>
          </div>

          {/* Time filter */}
          <div>
            <label className="text-sm font-medium text-darkGray block mb-2">Time Period</label>
            <select 
              value={filters.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 text-sm py-2 px-3"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        
        <div className="h-[120px] md:h-[60px] flex flex-col md:flex-row gap-3 pt-3 px-4 border-t border-gray-100">
          <button 
            onClick={handleReset}
            className="flex-1 py-2 px-4 border border-gray-300 text-darkGray rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Reset
          </button>
          <button 
            onClick={handleApply}
            className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
