import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDelete from '../components/ConfirmDelete';
import { getAllResources, createResource, updateResource, deleteResource, searchResources } from '../services/resourceService';
import { getAllCategories } from '../services/categoryService';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ 
    resourceName: '', 
    categoryID: '', 
    location: '', 
    quantity: '', 
    unit: '', 
    status: 'Available' 
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [resData, catData] = await Promise.all([
        getAllResources(),
        getAllCategories()
      ]);
      setResources(resData);
      setCategories(catData);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setLoading(true);
    try {
      if (value.trim() === '') {
        const data = await getAllResources();
        setResources(data);
      } else {
        const data = await searchResources(value);
        setResources(data);
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(resources.length / itemsPerPage);
  const currentData = resources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenModal = (resource = null) => {
    setFormError('');
    if (resource) {
      setCurrentResource(resource);
      setFormData({ 
        resourceName: resource.resourceName, 
        categoryID: resource.categoryID, 
        location: resource.location || '', 
        quantity: resource.quantity || '', 
        unit: resource.unit || '', 
        status: resource.status || 'Available'
      });
    } else {
      setCurrentResource(null);
      setFormData({ 
        resourceName: '', 
        categoryID: categories.length > 0 ? categories[0].categoryID : '', 
        location: '', 
        quantity: '', 
        unit: '', 
        status: 'Available' 
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Numeric validation
    if (formData.quantity && isNaN(Number(formData.quantity))) {
      setFormError('Quantity must be a valid number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        resourceID: currentResource ? currentResource.resourceID : 0,
        quantity: formData.quantity ? Number(formData.quantity) : null
      };

      if (currentResource) {
        await updateResource(currentResource.resourceID, payload);
      } else {
        await createResource(payload);
      }
      setIsModalOpen(false);
      handleSearch(searchTerm); // Refresh data with current search
    } catch (error) {
      setFormError('Failed to save resource. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDelete = (resource) => {
    setCurrentResource(resource);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteResource(currentResource.resourceID);
      setIsDeleteModalOpen(false);
      handleSearch(searchTerm);
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete. Ensure it's not referenced by other records.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'resourceID' },
    { header: 'Resource Name', accessor: 'resourceName', render: (row) => <span className="font-semibold text-gray-900">{row.resourceName}</span> },
    { header: 'Category', accessor: 'category', render: (row) => row.category?.categoryName || 'Unknown' },
    { header: 'Location', accessor: 'location' },
    { header: 'Qty', accessor: 'quantity', render: (row) => row.quantity ? `${row.quantity} ${row.unit || ''}` : 'N/A' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'Available' ? 'bg-green-100 text-green-800' : 
          row.status === 'Active' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Depleted' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">Comprehensive registry of federal assets.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0c4a34] hover:bg-[#093626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c4a34]"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Resource
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-96">
           <SearchBar 
             placeholder="Search by name... (Press Enter)" 
             value={searchTerm} 
             onChange={(e) => setSearchTerm(e.target.value)} 
             onSearch={handleSearch}
           />
        </div>
        <div className="text-sm text-gray-500">
           Showing {resources.length} total entries
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden flex flex-col">
        <div className="flex-1">
          <Table
            columns={columns}
            data={currentData}
            onEdit={handleOpenModal}
            onDelete={handleOpenDelete}
            isLoading={loading}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentResource ? 'Edit Resource' : 'Add New Resource'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Resource Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
              value={formData.resourceName}
              onChange={(e) => setFormData({ ...formData, resourceName: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border bg-white"
              value={formData.categoryID}
              onChange={(e) => setFormData({ ...formData, categoryID: e.target.value })}
            >
              <option value="" disabled>Select a category</option>
              {categories.map(c => (
                <option key={c.categoryID} value={c.categoryID}>{c.categoryName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit (e.g. Tons, Barrels)</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border bg-white"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Active">Active</option>
              <option value="Protected">Protected</option>
              <option value="Depleted">Depleted</option>
              <option value="Under Review">Under Review</option>
            </select>
          </div>
          
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full justify-center rounded-md bg-[#0c4a34] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#093626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c4a34] sm:col-start-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={currentResource?.resourceName}
        isDeleting={isSubmitting}
      />
    </div>
  );
};

export default Resources;
