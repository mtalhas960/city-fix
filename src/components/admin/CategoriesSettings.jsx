import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RiEditLine, RiDeleteBin6Line, RiAddLine } from '@remixicon/react';

const CategoriesSettings = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Lighting',
      color: 'primary',
      icon: 'light',
      totalReports: 124,
    },
    {
      id: 2,
      name: 'Roads',
      color: 'danger',
      icon: 'road',
      totalReports: 237,
    },
    {
      id: 3,
      name: 'Water',
      color: 'blue',
      icon: 'water',
      totalReports: 86,
    },
    {
      id: 4,
      name: 'Waste',
      color: 'warning',
      icon: 'bin',
      totalReports: 152,
    },
    {
      id: 5,
      name: 'Parks',
      color: 'success',
      icon: 'tree',
      totalReports: 93,
    },
    {
      id: 6,
      name: 'Other',
      color: 'gray',
      icon: 'question',
      totalReports: 64,
    },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    color: 'primary',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      toast.error('Please enter a category name');
      return;
    }
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, {
      id: newId,
      name: newCategory.name,
      color: newCategory.color,
      icon: 'add',
      totalReports: 0
    }]);
    toast.success(`Category "${newCategory.name}" added successfully! (Server logic will be set for this task when backend will be created)`);
    setNewCategory({ name: '', color: 'primary' });
  };

  const handleDeleteCategory = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the "${name}" category?`)) {
      setCategories(categories.filter(category => category.id !== id));
      toast.info(`Category "${name}" deleted successfully! (Server logic will be set for this task when backend will be created)`);
    }
  };

  const getColorClass = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'danger':
        return 'bg-danger/10 text-danger';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'success':
        return 'bg-success/10 text-success';
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'gray':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const getCategoryIcon = (type) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h5 className="text-lg font-poppins font-semibold text-darkGray">Issue Categories</h5>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-lightGray">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                    Total Reports
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-darkGray/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-lightGray/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span 
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${getColorClass(category.color)}`}
                        >
                          {getCategoryIcon(category.icon)}
                        </span>
                        <span className="ml-3 font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-darkGray/70">
                      {category.totalReports}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm pe-10">
                      <button 
                        className="text-danger hover:text-danger/80" 
                        title="Delete Category"
                        onClick={() => handleDeleteCategory(category.id, category.name)}
                      >
                        <RiDeleteBin6Line className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add New Category Form */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow p-6">
          <h5 className="mb-4">Add New Category</h5>
          <form onSubmit={handleAddCategory}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-darkGray/70 mb-2">Category Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="mt-1 text-xs text-darkGray/70">
                Category name should be unique and descriptive.
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="category-icon" className="block text-sm font-medium text-darkGray/70 mb-2">
                Icon Color
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="color-blue" 
                    name="color" 
                    value="primary"
                    checked={newCategory.color === 'primary'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300" 
                  />
                  <label htmlFor="color-blue" className="ml-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20"></div>
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="color-green" 
                    name="color" 
                    value="success"
                    checked={newCategory.color === 'success'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-success focus:ring-success border-gray-300" 
                  />
                  <label htmlFor="color-green" className="ml-2">
                    <div className="h-6 w-6 rounded-full bg-success/20"></div>
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="color-orange" 
                    name="color" 
                    value="warning"
                    checked={newCategory.color === 'warning'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-warning focus:ring-warning border-gray-300" 
                  />
                  <label htmlFor="color-orange" className="ml-2">
                    <div className="h-6 w-6 rounded-full bg-warning/20"></div>
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="color-red" 
                    name="color" 
                    value="danger"
                    checked={newCategory.color === 'danger'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-danger focus:ring-danger border-gray-300" 
                  />
                  <label htmlFor="color-red" className="ml-2">
                    <div className="h-6 w-6 rounded-full bg-danger/20"></div>
                  </label>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              <RiAddLine className="h-5 w-5 mr-2" />
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSettings;
