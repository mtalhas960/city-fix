import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine, RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import reports from '../../data/reports';

const Reports = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [allReports, setAllReports] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  
  useEffect(() => {
    const storedIssues = localStorage.getItem('issues');
    const combinedReports = reports.concat(JSON.parse(storedIssues || '[]'));
    setAllReports(combinedReports);
  }, []);
  
  // Filter reports based on search term
  const filteredReports = allReports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort reports based on selected option
  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      case 'oldest':
        return new Date(a.submittedAt) - new Date(b.submittedAt);
      case 'priority-high':
        const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Moderate': 2, 'Low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'priority-low':
        const priorityOrderAsc = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Moderate': 2, 'Low': 1 };
        return priorityOrderAsc[a.priority] - priorityOrderAsc[b.priority];
      case 'status':
        const statusOrder = { 'pending': 1, 'in_progress': 2, 'in-progress': 2, 'resolved': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return new Date(b.submittedAt) - new Date(a.submittedAt);
    }
  });
  
  // Calculate pagination
  const indexOfLastReport = currentPage * rowsPerPage;
  const indexOfFirstReport = indexOfLastReport - rowsPerPage;
  const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(sortedReports.length / rowsPerPage);
  
  // Navigate to report detail page
  const handleViewReport = (reportId) => {
    navigate(`/admin-panel/reports/${reportId}`);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Helper function to truncate address
  const truncateAddress = (address) => {
    if (!address) return 'Address not available';
    if (address.length <= 20) return address;
    return address.substring(0, 20) + '...';
  };
  
  // Helper function to get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-danger/10 text-danger';
      case 'in-progress':
        return 'bg-warning/10 text-warning';
      case 'resolved':
        return 'bg-success/10 text-success';
      default:
        return 'bg-primary/10 text-primary';
    }
  };
  
  // Helper function to get category class and format name
  const getCategoryClass = (category) => {
    switch (category.toLowerCase()) {
      case 'pothole':
        return { class: 'bg-danger/10 text-danger', label: 'Road Damage' };
      case 'streetlight':
        return { class: 'bg-primary/10 text-primary', label: 'Street Lighting' };
      case 'garbage':
        return { class: 'bg-yellow-100 text-yellow-800', label: 'Waste Collection' };
      case 'water':
        return { class: 'bg-blue-100 text-blue-600', label: 'Water Issues' };
      case 'graffiti':
        return { class: 'bg-purple-100 text-purple-600', label: 'Graffiti' };
      case 'sidewalk':
        return { class: 'bg-orange-100 text-orange-600', label: 'Sidewalks' };
      default:
        return { class: 'bg-gray-100 text-gray-600', label: 'Other' };
    }
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
          currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-darkGray/70 hover:bg-lightGray cursor-pointer'
        }`}
      >
        <span className="sr-only">Previous</span>
        <RiArrowLeftSLine className="h-5 w-5" />
      </button>
    );
    
    // Page numbers
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(renderPageButton(i));
      }
    } else {
      items.push(renderPageButton(1));
      if (currentPage > 3) {
        items.push(
          <span key="ellipsis1" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-darkGray/70">
            ...
          </span>
        );
      }
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        items.push(renderPageButton(i));
      }
      if (currentPage < totalPages - 2) {
        items.push(
          <span key="ellipsis2" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-darkGray/70">
            ...
          </span>
        );
      }
      items.push(renderPageButton(totalPages));
    }
    items.push(
      <button
        key="next"
        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
          currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-darkGray/70 hover:bg-lightGray cursor-pointer'
        }`}
      >
        <span className="sr-only">Next</span>
        <RiArrowRightSLine className="h-5 w-5" />
      </button>
    );
    
    return items;
  };
  
  const renderPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => paginate(pageNumber)}
      aria-current={currentPage === pageNumber ? 'page' : undefined}
      className={`${
        currentPage === pageNumber
          ? 'z-10 bg-primary border-primary text-white'
          : 'bg-white border-gray-300 text-darkGray/70 hover:bg-lightGray'
      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
    >
      {pageNumber}
    </button>
  );

  return (
    <div>
      <div className="mb-6">
        <h4>Manage Reports</h4>
        <p className="text-darkGray/70">View, filter and manage all urban issues reported by citizens.</p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64 md:w-80">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        
        {/* Sort By Dropdown */}
        <div className="flex items-center w-full sm:w-max">
          <label htmlFor="sort-select" className="mr-2 text-sm font-medium text-darkGray/70 text-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white border border-gray-300 text-darkGray rounded-lg focus:ring-primary focus:border-primary py-2 px-4 text-sm w-full"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority-high">Priority (High-Low)</option>
            <option value="priority-low">Priority (Low-High)</option>
            <option value="status">Status</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
      
      {/* Reports Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-lightGray">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Issue Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentReports.length > 0 ? (
                currentReports.map((report) => {
                  const categoryInfo = getCategoryClass(report.category);
                  return (
                    <tr key={report.id} className="hover:bg-lightGray/30 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-darkGray/70">
                        {report.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <span 
                          className="cursor-pointer hover:text-primary"
                          onClick={() => handleViewReport(report.id)}
                        >
                          {report.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${categoryInfo.class}`}>
                          {categoryInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-darkGray/70">
                        {formatDate(report.submittedAt)}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm text-primary hover:underline cursor-pointer" 
                        title={`${report.location.latitude}, ${report.location.longitude}`}
                      >
                        {truncateAddress(report.location.address)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(report.status)}`}>
                          {report.status === 'pending' 
                            ? 'Pending' 
                            : report.status === 'in_progress' || report.status === 'in-progress'
                              ? 'In Progress'
                              : 'Resolved'
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          report.priority === 'High' || report.priority === 'Critical'
                            ? 'bg-red-50 text-red-700'
                            : report.priority === 'Medium' || report.priority === 'Moderate'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-green-50 text-green-700'
                        }`}>
                          {report.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className="flex justify-center">
                          <button 
                            className="text-primary hover:text-primary/80" 
                            title="View Details"
                            onClick={() => handleViewReport(report.id)}
                          >
                            <RiEyeLine className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No reports found. Try adjusting your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-gray-200">
          <div className="flex items-center">
            <span className="text-sm text-darkGray/70 mr-2">Show rows:</span>
            <select 
              className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing rows per page
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-darkGray/70 ml-4">
              Showing {indexOfFirstReport + 1}-{Math.min(indexOfLastReport, filteredReports.length)} of {filteredReports.length} reports
            </span>
          </div>
          <div className="flex justify-between">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {renderPaginationItems()}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;