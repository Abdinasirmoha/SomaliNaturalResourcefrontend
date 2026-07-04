import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDelete from '../components/ConfirmDelete';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ categoryName: '', description: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoading(false);
    }
  };

  // Client-side search for Categories
  useEffect(() => {
    const results = categories.filter(item =>
      item.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
    setCurrentPage(1);
  }, [searchTerm, categories]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenModal = (category = null) => {
    setFormError('');
    if (category) {
      setCurrentCategory(category);
      setFormData({ categoryName: category.categoryName, description: category.description || '' });
    } else {
      setCurrentCategory(null);
      setFormData({ categoryName: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      // Basic uniqueness check (client-side for this example, backend should also validate)
      if (!currentCategory || currentCategory.categoryName !== formData.categoryName) {
        const exists = categories.some(c => c.categoryName.toLowerCase() === formData.categoryName.toLowerCase());
        if (exists) {
          setFormError('A category with this name already exists.');
          setIsSubmitting(false);
          return;
        }
      }

      if (currentCategory) {
        await updateCategory(currentCategory.categoryID, { ...formData, categoryID: currentCategory.categoryID });
      } else {
        await createCategory(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      setFormError('Failed to save category. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDelete = (category) => {
    setCurrentCategory(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteCategory(currentCategory.categoryID);
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete. It might be in use by resources.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'categoryID' },
    { header: 'Category Name', accessor: 'categoryName', render: (row) => <span className="font-semibold text-gray-900">{row.categoryName}</span> },
    { header: 'Description', accessor: 'description', render: (row) => <span className="text-gray-500 truncate max-w-xs block">{row.description}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage resource classifications</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0c4a34] hover:bg-[#093626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c4a34]"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Category
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-96">
           <SearchBar 
             placeholder="Search categories..." 
             value={searchTerm} 
             onChange={handleSearch} 
           />
        </div>
        <div className="text-sm text-gray-500">
           Showing {filteredData.length} total entries
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
        title={currentCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
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
        itemName={currentCategory?.categoryName}
        isDeleting={isSubmitting}
      />
    </div>
  );
};

export default Categories;
