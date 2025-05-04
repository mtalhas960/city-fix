import React, { useEffect } from 'react';
import L from 'leaflet';
import createIcon from "./CustomMarker"

const IssueDetailModal = ({ issue, isOpen, onClose }) => {
  if (!issue || !isOpen) return null;

  useEffect(() => {
    if (issue) {
      setTimeout(() => {
        const container = document.getElementById('detail-map');
        if (container) {
          container.innerHTML = '';
          const detailMap = L.map('detail-map').setView(
            [issue.location.latitude, issue.location.longitude], 
            15
          );
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(detailMap);
          
          const customIcon = createIcon();
          L.marker([issue.location.latitude, issue.location.longitude], { icon: customIcon }).addTo(detailMap);
          
          detailMap.dragging.disable();
          detailMap.touchZoom.disable();
          detailMap.doubleClickZoom.disable();
          detailMap.scrollWheelZoom.disable();
        }
      }, 300);
    }
    return () => {
      const container = document.getElementById('detail-map');
      if (container) {
        container._leaflet_id = null;
      }
    };
  }, [issue, isOpen]);

  const issueDate = new Date(issue.submittedAt);
  const formattedDate = issueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const estimatedDate = issue.estimatedResolutionDate ? new Date(issue.estimatedResolutionDate) : null;
  const formattedEstimatedDate = estimatedDate ? estimatedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Not set';

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700';
      case 'Moderate': return 'bg-yellow-50 text-yellow-700';
      case 'Low': return 'bg-green-50 text-green-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  };

  return (
    <div className="fixed inset-0 bg-darkGray/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h4 className="text-darkGray">{issue.title}</h4>
          <button onClick={onClose} className="text-darkGray hover:text-danger">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className={`status-badge px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(issue.status)}`}>
                {formatStatus(issue.status)}
              </span>
              <span className={`status-badge px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(issue.priority)}`}>
                {issue.priority} Priority
              </span>
              <span className="text-sm text-darkGray/60 ml-auto">Reported on {formattedDate}</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-primary">{issue.category}</p>
              <p className="text-darkGray">{issue.description}</p>
            </div>
            
            <div>
              <p className="text-sm text-darkGray/80">
                <span className="font-medium">Estimated Resolution:</span> {formattedEstimatedDate}
              </p>
            </div>
            
            {issue.photos && issue.photos.length > 0 && (
              <div>
                <h5 className="mb-2">Photos</h5>
                <div className="grid grid-cols-2 gap-2">
                  {issue.photos.map((photo, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200 h-32">
                      <img src={photo} alt="Issue photo" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h5 className="mb-2">Location</h5>
              <p className="text-sm text-darkGray/80">{issue.location.address || 'Address not available'}</p>
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 h-40" id="detail-map">
                {/* Small map will be added here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailModal;
