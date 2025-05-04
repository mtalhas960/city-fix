import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine, RiAddLine, RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import admins from '../../data/admins';

const Admins = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter admins based on search term
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const indexOfLastAdmin = currentPage * rowsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - rowsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / rowsPerPage);
  
  // Navigate to admin detail page
  const handleViewAdmin = (adminId) => {
    navigate(`/admin-panel/admins/${adminId}`);
  };

  // Navigate to add new admin page
  const handleAddAdmin = () => {
    navigate('/admin-panel/admins/add');
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
  
  // Helper function to get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'inactive':
        return 'bg-danger/10 text-danger';
      default:
        return 'bg-warning/10 text-warning';
    }
  };
  
  // Helper function to get role class
  const getRoleClass = (role) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-purple-100 text-purple-700';
      case 'Manager':
        return 'bg-blue-100 text-blue-700';
      case 'Field Officer':
        return 'bg-green-100 text-green-700';
      case 'Support Staff':
        return 'bg-yellow-100 text-yellow-700';
      case 'Supervisor':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
        <h4>Manage Administrators</h4>
        <p className="text-darkGray/70">View and manage user accounts with administrative access to the system.</p>
      </div>
      
      {/* Search Bar and Add Button */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64 md:w-80">
          <input
            type="text"
            placeholder="Search administrators..."
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
        
        <button 
          onClick={handleAddAdmin}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <RiAddLine className="mr-2 h-5 w-5" />
          Add New Admin
        </button>
      </div>
      
      {/* Admins Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-lightGray">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentAdmins.length > 0 ? (
                currentAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-lightGray/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={admin.avatar} alt={admin.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-darkGray">{admin.name}</div>
                          <div className="text-xs text-darkGray/60">{admin.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-darkGray">{admin.email}</div>
                      <div className="text-xs text-darkGray/60">{admin.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleClass(admin.role)}`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darkGray">
                      {admin.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darkGray/70">
                      {formatDate(admin.joinedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(admin.status)}`}>
                        {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className="flex justify-center">
                        <button 
                          className="text-primary hover:text-primary/80" 
                          title="View Details"
                          onClick={() => handleViewAdmin(admin.id)}
                        >
                          <RiEyeLine className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No administrators found. Try adjusting your search.
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
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span className="text-sm text-darkGray/70 ml-4">
              Showing {indexOfFirstAdmin + 1}-{Math.min(indexOfLastAdmin, filteredAdmins.length)} of {filteredAdmins.length} administrators
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

export default Admins;