import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { toast } from 'react-toastify';
import useLocalStorage from '../hooks/useLocalStorage';
import { uploadMultipleImages } from '../utils/uploadImage';
import createIcon from './utils/CustomMarker';

const MapPositionHandler = ({ position, setPosition, onPositionChange }) => {
    const map = useMap();

    useEffect(() => {
        if (position && position.length === 2 && !map._loaded) {
            map.setView(position, 16);
        }
    }, [position, map]);

    useEffect(() => {
        const handleMapClick = (e) => {
            const newPosition = [e.latlng.lat, e.latlng.lng];
            setPosition(newPosition);
            if (onPositionChange) {
                onPositionChange(newPosition);
            }
        };

        map.on('click', handleMapClick);

        return () => {
            map.off('click', handleMapClick);
        };
    }, [map, setPosition, onPositionChange]);

    return null;
};

const ReportForm = () => {
    const [submittedReports, setSubmittedReports] = useLocalStorage('issues', []);
    const [position, setPosition] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [locationAddress, setLocationAddress] = useState('');
    const [showAddressInfo, setShowAddressInfo] = useState(false);
    const fileInputRef = useRef(null);
    const dropzoneRef = useRef(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    // Reverse geocode to get address from coordinates
    const reverseGeocode = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
            );
            const data = await response.json();

            if (data.display_name) {
                const address = data.display_name;
                setLocationAddress(address);
                setShowAddressInfo(true);
                setValue('location-address', address);
            }
        } catch (error) {
            console.error('Error getting address:', error);
            setLocationAddress('');
        }
    };

    // Handle position change (from map click or geolocation)
    const handlePositionChange = (newPosition) => {
        if (newPosition && newPosition.length === 2) {
            reverseGeocode(newPosition[0], newPosition[1]);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const { latitude, longitude } = location.coords;
                    const newPosition = [latitude, longitude];
                    setPosition(newPosition);
                    handlePositionChange(newPosition);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setPosition([29.3956, 71.6836]);
                    handlePositionChange([29.3956, 71.6836]);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (position) {
            setValue('location-lat', position[0]);
            setValue('location-lng', position[1]);
        }
    }, [position, setValue]);

    useEffect(() => {
        const dropzone = dropzoneRef.current;
        const handleDragOver = (e) => {
            e.preventDefault();
            dropzone.classList.add('bg-lightGray/50');
        };
        const handleDragLeave = () => {
            dropzone.classList.remove('bg-lightGray/50');
        };
        const handleDrop = (e) => {
            e.preventDefault();
            dropzone.classList.remove('bg-lightGray/50');
            if (e.dataTransfer.files.length > 0) {
                handleFileSelection(e.dataTransfer.files);
            }
        };
        if (dropzone) {
            dropzone.addEventListener('dragover', handleDragOver);
            dropzone.addEventListener('dragleave', handleDragLeave);
            dropzone.addEventListener('drop', handleDrop);
            dropzone.addEventListener('click', () => {
                fileInputRef.current.click();
            });
        }

        return () => {
            if (dropzone) {
                dropzone.removeEventListener('dragover', handleDragOver);
                dropzone.removeEventListener('dragleave', handleDragLeave);
                dropzone.removeEventListener('drop', handleDrop);
            }
        };
    }, []);

    const handleFileSelection = (files) => {
        const newFiles = Array.from(files).slice(0, 3 - selectedFiles.length);
        if (selectedFiles.length + newFiles.length > 3) {
            toast.warning('Maximum 3 photos allowed');
        }
        setSelectedFiles(prev => [...prev, ...newFiles].slice(0, 3));
        const newPreviews = Array.from(newFiles).map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews].slice(0, 3));
    };
    const handleFileInputChange = (e) => {
        handleFileSelection(e.target.files);
    };
    const removePhoto = (index) => {
        URL.revokeObjectURL(previewUrls[index]);
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const useMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const { latitude, longitude } = location.coords;
                    const newPosition = [latitude, longitude];
                    setPosition(newPosition);
                    handlePositionChange(newPosition);
                    toast.success('Location updated');
                },
                (error) => {
                    toast.error('Could not get your location. Please check your browser permissions.');
                    console.error("Error getting location:", error);
                }
            );
        } else {
            toast.error('Geolocation is not supported by your browser');
        }
    };

    // Generate a unique issue ID
    const generateIssueId = () => {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        return `CX-${year}-${randomNum}`;
    };

    const onSubmit = async (data) => {
        try {
            if (!position) {
                toast.error('Please select a location on the map');
                return;
            }

            if (selectedFiles.length === 0) {
                toast.error('Please upload at least one photo');
                return;
            }

            setIsUploading(true);

            const { imageUrls, errors: uploadErrors } = await uploadMultipleImages(selectedFiles, 'reports');

            if (uploadErrors.length > 0) {
                toast.error(`Some images failed to upload: ${uploadErrors.join(', ')}`);
                if (imageUrls.length === 0) {
                    setIsUploading(false);
                    return;
                }
            }

            // Create report object with all data according to the required schema
            const reportData = {
                id: generateIssueId(),
                title: data['issue-title'],
                category: data['issue-category'],
                description: data['issue-description'],
                photos: imageUrls,
                location: {
                    latitude: position[0],
                    longitude: position[1],
                    address: locationAddress || 'Unknown location'
                },
                status: 'new',
                priority: data['issue-priority'],
                contact: {
                    email: data['contact-email'] || null,
                    phone: data['contact-phone'] || null
                },
                submittedAt: new Date().toISOString(),
                estimatedResolutionDate: null
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Save to local storage instead of sending to server
            setSubmittedReports(prev => [reportData, ...prev]);

            console.log('Issue saved to localStorage:', reportData);
            toast.success('Report submitted successfully!');

            // Clear form
            reset();
            setSelectedFiles([]);
            setPreviewUrls([]);
            setShowAddressInfo(false);
            setLocationAddress('');
            setIsUploading(false);
        } catch (error) {
            setIsUploading(false);
            toast.error('Failed to submit report. Please try again.');
            console.error(error);
        }
    };

    return (
        <section className="py-10">
            <div className="section-container">
                <div className="max-w-4xl mx-auto bg-primary/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-white/20">
                    <h2 className="font-poppins font-semibold text-2xl md:text-3xl text-darkGray mb-6">
                        Report an Issue
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Issue Title */}
                        <div className="form-group">
                            <label htmlFor="issue-title" className="form-label block mb-2">
                                Issue Title<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="issue-title"
                                placeholder="E.g., Broken Streetlight at 3rd Avenue"
                                className={`w-full px-4 py-3 rounded-lg border ${errors['issue-title'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                                    } focus:outline-none focus:ring-2`}
                                {...register('issue-title', { required: 'Please enter a title for the issue' })}
                            />
                            {errors['issue-title'] && (
                                <p className="text-red-500 text-sm mt-1">{errors['issue-title'].message}</p>
                            )}
                        </div>

                        {/* Category Selector */}
                        <div className="form-group">
                            <label htmlFor="issue-category" className="form-label block mb-2">
                                Category<span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="issue-category"
                                    className={`w-full px-4 py-3 rounded-lg border appearance-none ${errors['issue-category'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                                        } focus:outline-none focus:ring-2`}
                                    {...register('issue-category', { required: 'Please select a category' })}
                                >
                                    <option value="" disabled selected>Select issue category</option>
                                    <option value="pothole">🛣️ Pothole</option>
                                    <option value="streetlight">💡 Broken Streetlight</option>
                                    <option value="garbage">🗑️ Garbage</option>
                                    <option value="water">💧 Water Leakage</option>
                                    <option value="other">📌 Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-darkGray">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors['issue-category'] && (
                                <p className="text-red-500 text-sm mt-1">{errors['issue-category'].message}</p>
                            )}
                        </div>

                        {/* Priority Selector */}
                        <div className="form-group">
                            <label htmlFor="issue-priority" className="form-label block mb-2">
                                Priority<span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="issue-priority"
                                    className={`w-full px-4 py-3 rounded-lg border appearance-none ${errors['issue-priority'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                                        } focus:outline-none focus:ring-2`}
                                    {...register('issue-priority', { required: 'Please select a priority level' })}
                                >
                                    <option value="" disabled selected>Select priority level</option>
                                    <option value="Low">⬇️ Low</option>
                                    <option value="Medium">➡️ Medium</option>
                                    <option value="High">⬆️ High</option>
                                    <option value="Critical">⚠️ Critical</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-darkGray">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors['issue-priority'] && (
                                <p className="text-red-500 text-sm mt-1">{errors['issue-priority'].message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label htmlFor="issue-description" className="form-label block mb-2">
                                Description<span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                id="issue-description"
                                rows="4"
                                placeholder="Describe the issue in detail..."
                                className={`w-full px-4 py-3 rounded-lg border ${errors['issue-description'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                                    } focus:outline-none focus:ring-2`}
                                {...register('issue-description', { required: 'Please provide a description of the issue' })}
                            ></textarea>
                            {errors['issue-description'] && (
                                <p className="text-red-500 text-sm mt-1">{errors['issue-description'].message}</p>
                            )}
                        </div>

                        {/* Upload Photos */}
                        <div className="form-group">
                            <label className="form-label block mb-2">
                                Upload Photos (up to 3)<span className="text-red-500 ml-1">*</span>
                            </label>
                            <div
                                ref={dropzoneRef}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-lightGray/50 transition-colors cursor-pointer"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileInputChange}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="mt-2 text-sm text-darkGray/70">Drag and drop photos here or click to browse</p>
                                <p className="mt-1 text-xs text-darkGray/50">JPEG, PNG or GIF (Max 5MB each)</p>
                            </div>

                            {/* Photo Preview Container */}
                            {previewUrls.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <p className="text-xs text-darkGray/50 mt-2">Clear and detailed photos help city workers identify
                                and fix the problem faster.</p>
                        </div>

                        {/* Location Picker */}
                        <div className="form-group">
                            <label className="form-label block mb-2">
                                Location<span className="text-red-500 ml-1">*</span>
                            </label>

                            {/* Show address when a location is selected */}
                            {showAddressInfo && locationAddress && (
                                <div className="bg-green-100 text-green-800 py-2 px-4 rounded-md text-sm mb-2">
                                    <p>Location selected: {locationAddress}</p>
                                </div>
                            )}

                            <div className="h-[300px] rounded-lg border border-gray-200 overflow-hidden">
                                {position ? (
                                    <MapContainer
                                        center={position}
                                        zoom={16}
                                        style={{ height: '100%', width: '100%',cursor: 'pointer' }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        {position && (
                                            <Marker position={position} icon={createIcon()} />
                                        )}
                                        <MapPositionHandler
                                            position={position}
                                            setPosition={setPosition}
                                            onPositionChange={handlePositionChange}
                                        />
                                    </MapContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary/50"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="mt-2 text-darkGray/70">Getting your location...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4 items-center mt-2">
                                <button
                                    type="button"
                                    onClick={useMyLocation}
                                    className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Use My Location
                                </button>
                                <p className="text-xs text-darkGray/70">Tap the map to place a marker, or drag the marker to the
                                    exact location.</p>
                            </div>

                            {/* Hidden fields for location data */}
                            <input type="hidden" {...register('location-lat')} />
                            <input type="hidden" {...register('location-lng')} />
                            <input type="hidden" {...register('location-address')} />
                        </div>

                        {/* Contact Information */}
                        <div className="form-group">
                            <label className="form-label block mb-2">Contact Information (Optional)</label>
                            <p className="text-xs text-darkGray/70 mb-3">We'll notify you when your report is processed or if
                                there are any questions.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        placeholder="Email address"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                        {...register('contact-email', {
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Please enter a valid email address'
                                            }
                                        })}
                                    />
                                    {errors['contact-email'] && (
                                        <p className="text-red-500 text-sm mt-1">{errors['contact-email'].message}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        id="contact-phone"
                                        placeholder="Phone number"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                        {...register('contact-phone')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || isUploading}
                                className="w-full bg-primary text-white font-medium py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70"
                            >
                                {isSubmitting || isUploading ? (
                                    <>
                                        <span>{isUploading ? "Uploading Images..." : "Submitting Report..."}</span>
                                        <svg
                                            className="animate-spin ml-2 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    </>
                                ) : (
                                    <span>Submit Report</span>
                                )}
                            </button>
                            {submittedReports.length > 0 && (
                                <div className="mt-2 text-center">
                                    <p className="text-sm text-gray-600">
                                        {submittedReports.length} report{submittedReports.length !== 1 ? 's' : ''} stored locally
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section >
    );
};

export default ReportForm;