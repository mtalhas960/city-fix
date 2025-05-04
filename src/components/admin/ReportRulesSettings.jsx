import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RiCheckLine } from '@remixicon/react';

const ReportRulesSettings = () => {
  const [formData, setFormData] = useState({
    maxImages: 3,
    maxFileSize: 5,
    allowedFormats: ['jpg', 'png','webp'],
    requireLocation: 'required',
    minDescriptionLength: 20,
    allowAnonymous: true,
    autoAssign: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormatChange = (format) => {
    setFormData(prevState => {
      const currentFormats = [...prevState.allowedFormats];
      
      if (currentFormats.includes(format)) {
        return {
          ...prevState,
          allowedFormats: currentFormats.filter(f => f !== format)
        };
      } else {
        return {
          ...prevState,
          allowedFormats: [...currentFormats, format]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.maxImages < 1 || formData.maxFileSize < 1 || formData.minDescriptionLength < 0) {
      toast.error('Please enter valid values for all fields');
      return;
    }
    if (formData.allowedFormats.length === 0) {
      toast.error('Please select at least one allowed image format');
      return;
    }
    toast.success('Report settings saved successfully! (Server logic will be set for this task when backend will be created)');
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h4 className="mb-6">Report & Image Settings</h4>

        <form id="report-settings-form" className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Settings */}
            <div className="space-y-4">
              <h6>Image Upload Limits</h6>

              <div>
                <label htmlFor="maxImages" className="block text-sm font-medium text-darkGray/70 mb-2">
                  Maximum number of images per report
                </label>
                <input 
                  type="number" 
                  id="maxImages" 
                  name="maxImages" 
                  min="1" 
                  max="10" 
                  value={formData.maxImages}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-darkGray/70">
                  Limit the number of images users can upload with each report submission.
                </p>
              </div>

              <div>
                <label htmlFor="maxFileSize" className="block text-sm font-medium text-darkGray/70 mb-2">
                  Maximum image size per file (MB)
                </label>
                <input 
                  type="number" 
                  id="maxFileSize" 
                  name="maxFileSize" 
                  min="1" 
                  max="20" 
                  value={formData.maxFileSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-darkGray/70">
                  Set the maximum file size for each uploaded image in megabytes.
                </p>
              </div>

              <div>
                <label htmlFor="allowedFormats" className="block text-sm font-medium text-darkGray/70 mb-2">
                  Allowed image formats
                </label>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="format-jpg" 
                      checked={formData.allowedFormats.includes('jpg')}
                      onChange={() => handleFormatChange('jpg')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="format-jpg" className="ml-2 text-sm text-darkGray">JPG/JPEG</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="format-png" 
                      checked={formData.allowedFormats.includes('png')}
                      onChange={() => handleFormatChange('png')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="format-png" className="ml-2 text-sm text-darkGray">PNG</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="format-gif" 
                      checked={formData.allowedFormats.includes('gif')}
                      onChange={() => handleFormatChange('gif')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="format-gif" className="ml-2 text-sm text-darkGray">GIF</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="format-webp" 
                      checked={formData.allowedFormats.includes('webp')}
                      onChange={() => handleFormatChange('webp')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="format-webp" className="ml-2 text-sm text-darkGray">WebP</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Settings */}
            <div className="space-y-4">
              <h6>Report Submission Rules</h6>

              <div>
                <label htmlFor="requireLocation" className="block text-sm font-medium text-darkGray/70 mb-2">
                  Location Requirements
                </label>
                <select 
                  id="requireLocation" 
                  name="requireLocation" 
                  value={formData.requireLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="required">Required</option>
                  <option value="auto-detect">Auto-detect only</option>
                </select>
                <p className="mt-1 text-xs text-darkGray/70">
                  Define how location information is handled in reports.
                </p>
              </div>

              <div>
                <label htmlFor="minDescriptionLength" className="block text-sm font-medium text-darkGray/70 mb-2">
                  Minimum description length
                </label>
                <input 
                  type="number" 
                  id="minDescriptionLength" 
                  name="minDescriptionLength" 
                  min="0" 
                  max="500" 
                  value={formData.minDescriptionLength}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-darkGray/70">
                  Set the minimum character count required for report descriptions.
                </p>
              </div>

              <div>
                <label htmlFor="allowAnonymous" className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="allowAnonymous" 
                    name="allowAnonymous"
                    checked={formData.allowAnonymous}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-darkGray">Allow anonymous reports</span>
                </label>
                <p className="mt-1 text-xs text-darkGray/70 ml-6">
                  If enabled, users can submit reports without providing contact information.
                </p>
              </div>

              <div>
                <label htmlFor="autoAssign" className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="autoAssign" 
                    name="autoAssign"
                    checked={formData.autoAssign}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-darkGray">Auto-assign reports to admins</span>
                </label>
                <p className="mt-1 text-xs text-darkGray/70 ml-6">
                  Automatically assign new reports to admins based on category and workload.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button 
              type="submit"
              className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center"
            >
              <RiCheckLine className="h-5 w-5 mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportRulesSettings;
