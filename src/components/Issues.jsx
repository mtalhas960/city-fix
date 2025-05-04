import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import IssueDetailModal from './utils/IssueDetailModal';
import FilterModal from './utils/FilterModal';
import createIcon from './utils/CustomMarker';
import reports from "../data/reports"

const Issues = () => {
    const [issues, setIssues] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        category: 'all',
        status: 'all',
        priority: 'all',
        time: 'all'
    });
    const defaultPosition = [29.3956, 71.6836];
    const mapRef = useRef();
    useEffect(() => {
        const storedIssues = localStorage.getItem('issues');
        const allIssues = reports.concat(JSON.parse(storedIssues || '[]'));
        setIssues(allIssues);
    }, []);
    const handleViewDetails = (issue) => {
        setSelectedIssue(issue);
        setShowIssueModal(true);
    };
    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);
        setShowFilterModal(false);
    };
    const filteredIssues = issues.filter(issue => {
        if (filters.category !== 'all' && issue.category.toLowerCase() !== filters.category) {
            return false;
        }
        if (filters.status !== 'all' && issue.status !== filters.status) {
            return false;
        }
        if (filters.priority !== 'all' && issue.priority !== filters.priority) {
            return false;
        }
        if (filters.time !== 'all') {
            const issueDate = new Date(issue.submittedAt);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            if (filters.time === 'today' && issueDate < today) {
                return false;
            } else if (filters.time === 'week') {
                const weekAgo = new Date(now);
                weekAgo.setDate(now.getDate() - 7);
                if (issueDate < weekAgo) {
                    return false;
                }
            } else if (filters.time === 'month') {
                const monthAgo = new Date(now);
                monthAgo.setMonth(now.getMonth() - 1);
                if (issueDate < monthAgo) {
                    return false;
                }
            }
        }
        return true;
    });

    const truncateText = (text, maxLength) => {
        if (!text || text.length <= maxLength) return text || '';
        return text.substring(0, maxLength) + '...';
    };

    const formatStatus = (status) => {
        return status.replace('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending': return 'bg-red-100 text-red-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };
    const getMarkerColor = (status) => {
        switch (status) {
            case 'pending': return '#ef4444';
            case 'in-progress': return '#eab308';
            case 'resolved': return '#22c55e';
            default: return '#2F80ED';
        }
    };

    return (
        <section className="relative">
            <div className="section-container relative top-14 z-10">
                <button
                    className="absolute top-4 right-4 z-50 bg-white p-2 rounded-md shadow-md"
                    onClick={() => setShowFilterModal(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-darkGray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm5 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
                    </svg>
                </button>
                <div className="map-container h-[70vh] relative z-0">
                    <MapContainer
                        center={defaultPosition}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        ref={mapRef}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {filteredIssues.map(issue => (
                            <Marker
                                key={issue.id}
                                position={[issue.location.latitude, issue.location.longitude]}
                                icon={createIcon(getMarkerColor(issue.status))}
                            >
                                <Popup>
                                    <div className="issue-popup">
                                        <h5 className="issue-popup-title font-medium">{issue.title}</h5>
                                        <p className="issue-popup-description text-sm">{truncateText(issue.description, 80)}</p>
                                        <div className="issue-popup-footer flex justify-between items-center mt-2">
                                            <span className={`status-badge text-xs px-2 py-1 rounded-full ${getStatusClass(issue.status)}`}>
                                                {formatStatus(issue.status)}
                                            </span>
                                            <button
                                                className="text-primary text-xs font-medium"
                                                onClick={() => handleViewDetails(issue)}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* Map Legend */}
            <div className="sticky bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 p-3 w-max ml-4">
                <h4 className="text-xs font-medium text-darkGray mb-2">Legend</h4>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-xs text-darkGray">Pending</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-xs text-darkGray">In Progress</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs text-darkGray">Completed</span>
                    </div>
                </div>
            </div>

            <IssueDetailModal
                issue={selectedIssue}
                isOpen={showIssueModal}
                onClose={() => setShowIssueModal(false)}
            />

            <FilterModal
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onApply={handleFilterApply}
                currentFilters={filters}
            />
        </section>
    );
};

export default Issues;