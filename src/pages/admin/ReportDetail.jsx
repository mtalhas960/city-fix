import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import L from 'leaflet';
import {
    RiTimeLine,
    RiThumbUpLine,
    RiMailLine,
    RiPhoneLine,
    RiDeleteBin6Line,
    RiCheckLine,
    RiSaveLine,
    RiZoomInLine
} from '@remixicon/react';
import reports from '../../data/reports';
import createIcon from '../../components/utils/CustomMarker';

const ReportDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    const reportData = reports.find(report => report.id === id);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        priority: '',
        status: '',
        estimatedResolutionDate: '',
        adminNotes: ''
    });

    useEffect(() => {
        if (!reportData) {
            toast.error('Report not found');
            setTimeout(() => {
                navigate('/admin-panel/reports');
            }, 2000);
            return;
        }

        setFormData({
            title: reportData.title || '',
            category: reportData.category || '',
            description: reportData.description || '',
            priority: reportData.priority || 'Medium',
            status: reportData.status || 'pending',
            estimatedResolutionDate: reportData.estimatedResolutionDate
                ? new Date(reportData.estimatedResolutionDate).toISOString().split('T')[0]
                : '',
            adminNotes: ''
        });
    }, [reportData, navigate]);

    useEffect(() => {
        if (!reportData || !mapContainerRef.current) return;

        if (!mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current).setView(
                [reportData.location.latitude, reportData.location.longitude],
                15
            );

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            const customIcon = createIcon();
            L.marker([reportData.location.latitude, reportData.location.longitude], { icon: customIcon }).addTo(mapRef.current);

            mapRef.current.dragging.disable();
            mapRef.current.touchZoom.disable();
            mapRef.current.doubleClickZoom.disable();
            mapRef.current.scrollWheelZoom.disable();

            // L.marker([reportData.location.latitude, reportData.location.longitude])
            //     .addTo(mapRef.current);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [reportData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleUpdateReport = () => {
        toast.success('Report updated successfully! (Server logic will be set for this task when backend will be created)');
    };

    const handleDeleteReport = () => {
        if (window.confirm('Are you sure you want to delete this report?')) {
            toast.info('Report deleted successfully! (Server logic will be set for this task when backend will be created)');
            setTimeout(() => {
                navigate('/admin-panel/reports');
            }, 2000);
        }
    };

    // Handle marking as resolved
    const handleMarkResolved = () => {
        setFormData(prev => ({
            ...prev,
            status: 'resolved'
        }));
        toast.success('Report marked as resolved! (Server logic will be set for this task when backend will be created)');
    };

    if (!reportData) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-darkGray/70">Loading report details...</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-md max-w-6xl w-full mx-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h4 className="text-xl font-medium text-darkGray">Report Details – {reportData.title}</h4>
                    <button
                        onClick={() => navigate('/admin-panel/reports')}
                        className="text-darkGray/70 hover:text-primary"
                    >
                        Back to Reports
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between mb-6 text-sm text-darkGray/70">
                        <div className="flex items-center">
                            <span className="font-medium">Report ID:</span>
                            <span className="ml-2">{reportData.id}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
                            <div className="flex items-center">
                                <RiTimeLine className="h-4 w-4 mr-1" />
                                <span>Submitted: {formatDate(reportData.submittedAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <div className="space-y-6">
                                {/* Issue Title */}
                                <div>
                                    <label className="block text-sm font-medium text-darkGray/70 mb-2">Issue Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-darkGray/70 mb-2">Category</label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                                        >
                                            <option value="streetlight">Street Lighting</option>
                                            <option value="pothole">Road Damage</option>
                                            <option value="garbage">Waste Collection</option>
                                            <option value="water">Water Issues</option>
                                            <option value="graffiti">Graffiti</option>
                                            <option value="sidewalk">Sidewalks</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-darkGray/70 mb-2">Description</label>
                                    <textarea
                                        rows="4"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                {/* Contact Info */}
                                <div>
                                    <label className="block text-sm font-medium text-darkGray/70 mb-2">Contact Information</label>
                                    <div className="space-y-2">
                                        <div className="flex items-center bg-lightGray/50 px-4 py-3 rounded-lg">
                                            <RiMailLine className="h-5 w-5 text-darkGray/70 mr-2" />
                                            <span className="text-sm">{reportData.contact?.email || 'No email provided'}</span>
                                        </div>
                                        {reportData.contact?.phone && (
                                            <div className="flex items-center bg-lightGray/50 px-4 py-3 rounded-lg">
                                                <RiPhoneLine className="h-5 w-5 text-darkGray/70 mr-2" />
                                                <span className="text-sm">{reportData.contact.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Priority and Status Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-darkGray/70 mb-2">Priority</label>
                                        <div className="relative">
                                            <select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                                            >
                                                <option value="Critical">Critical</option>
                                                <option value="High">High</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Low">Low</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-darkGray/70 mb-2">Status</label>
                                        <div className="relative">
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Estimated Resolution Date */}
                                <div>
                                    <label className="block text-sm font-medium text-darkGray/70 mb-2">Estimated Resolution Date</label>
                                    <input
                                        type="date"
                                        name="estimatedResolutionDate"
                                        value={formData.estimatedResolutionDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Map */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-darkGray/70 mb-2">Location</label>
                                <div className="h-64 bg-lightGray rounded-lg overflow-hidden relative">
                                    <div ref={mapContainerRef} className="absolute inset-0"></div>
                                    <div className="absolute bottom-3 right-3 bg-white rounded-lg p-2 shadow-md text-xs">
                                        <span className="font-medium">Coordinates:</span> {reportData.location.latitude.toFixed(4)}, {reportData.location.longitude.toFixed(4)}
                                    </div>
                                </div>
                                {reportData.location.address && (
                                    <div className="mt-2 text-sm text-darkGray/70">
                                        <span className="font-medium">Address:</span> {reportData.location.address}
                                    </div>
                                )}
                            </div>

                            {/* Photos */}
                            {reportData.photos && reportData.photos.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-darkGray/70 mb-2">
                                        Photos ({reportData.photos.length})
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {reportData.photos.map((photo, index) => (
                                            <div
                                                key={index}
                                                className="group relative aspect-square bg-lightGray rounded-lg overflow-hidden cursor-pointer"
                                                onClick={() => window.open(photo, '_blank')}
                                            >
                                                <img src={photo} alt={`Report photo ${index + 1}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-darkGray/0 group-hover:bg-darkGray/20 flex items-center justify-center transition-all">
                                                    <RiZoomInLine className="h-8 w-8 text-white opacity-0 group-hover:opacity-100" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Admin Notes Section */}
                    <div className="mt-8">
                        <label className="block text-sm font-medium text-darkGray/70 mb-2">Admin Notes</label>
                        <textarea
                            rows="3"
                            name="adminNotes"
                            value={formData.adminNotes}
                            onChange={handleChange}
                            placeholder="Add internal notes about this report..."
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Footer with buttons */}
                <div className="px-6 py-4 bg-lightGray/50 border-t flex flex-wrap gap-3 justify-end">
                    <button
                        onClick={handleDeleteReport}
                        className="px-4 py-2 bg-danger text-white text-sm font-medium rounded-lg hover:bg-danger/90 transition-colors"
                    >
                        <RiDeleteBin6Line className="h-5 w-5 inline mr-1" />
                        Delete Report
                    </button>
                    <button
                        onClick={handleMarkResolved}
                        className="px-4 py-2 bg-success text-white text-sm font-medium rounded-lg hover:bg-success/90 transition-colors"
                    >
                        <RiCheckLine className="h-5 w-5 inline mr-1" />
                        Mark as Resolved
                    </button>
                    <button
                        onClick={handleUpdateReport}
                        className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <RiSaveLine className="h-5 w-5 inline mr-1" />
                        Update Report
                    </button>
                </div>
            </div>
        </>
    );
};

export default ReportDetail;