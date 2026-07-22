import React, { useState, useEffect } from 'react';
import { Plus, Download, Filter, Waves, Diamond, TreePine, Droplets, TrendingUp } from 'lucide-react';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDelete from '../components/ConfirmDelete';
import { getAllProjects, createProject, updateProject, deleteProject, searchProjects } from '../services/projectService';
import { getAllResources } from '../services/resourceService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ 
    projectName: '', 
    resourceID: '', 
    companyName: '', 
    startDate: '', 
    endDate: '', 
    status: 'Planned',
    description: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [projData, resData] = await Promise.all([
        getAllProjects(),
        getAllResources()
      ]);
      setProjects(projData);
      setFilteredData(projData);
      setResources(resData);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toISOString().split('T')[0];
  };

  const handleOpenModal = (project = null) => {
    setFormError('');
    if (project) {
      setCurrentProject(project);
      setFormData({ 
        projectName: project.projectName, 
        resourceID: project.resourceID, 
        companyName: project.companyName || '', 
        startDate: formatDateForInput(project.startDate), 
        endDate: formatDateForInput(project.endDate), 
        status: project.status || 'Planned',
        description: project.description || ''
      });
    } else {
      setCurrentProject(null);
      setFormData({ 
        projectName: '', 
        resourceID: resources.length > 0 ? resources[0].resourceID : '', 
        companyName: '', 
        startDate: '', 
        endDate: '', 
        status: 'Planned',
        description: '' 
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      if (currentProject) {
        await updateProject(currentProject.projectID, { ...formData, projectID: currentProject.projectID });
      } else {
        await createProject(formData);
      }
      setIsModalOpen(false);
      const updatedProjects = await getAllProjects();
      setProjects(updatedProjects);
      setFilteredData(updatedProjects);
    } catch (error) {
      setFormError('Failed to save project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('fish') || name.includes('marine')) return <Waves className="w-4 h-4 text-emerald-600 mr-2" />;
    if (name.includes('mineral') || name.includes('mining')) return <Diamond className="w-4 h-4 text-yellow-600 mr-2" />;
    if (name.includes('forest') || name.includes('wood')) return <TreePine className="w-4 h-4 text-green-700 mr-2" />;
    return <Droplets className="w-4 h-4 text-blue-500 mr-2" />;
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#003b5c] tracking-tight">Natural Resource Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Monitoring and oversight of nationwide resource utilization initiatives.</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <Download className="-ml-1 mr-2 h-4 w-4" />
            Export CSV
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#004a70] hover:bg-[#003b5c] focus:outline-none"
          >
            <Plus className="-ml-1 mr-2 h-4 w-4" />
            Create Project
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <p className="text-[12px] font-bold text-gray-500 tracking-wide mb-2">Active Projects</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold text-[#003b5c]">{projects.filter(p => p.status === 'Ongoing').length}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <p className="text-[12px] font-bold text-gray-500 tracking-wide mb-2">Under Review</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold text-amber-500">{projects.filter(p => p.status === 'Under Review').length}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <p className="text-[12px] font-bold text-gray-500 tracking-wide mb-2">Completed</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold text-emerald-600">{projects.filter(p => p.status === 'Completed').length}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <p className="text-[12px] font-bold text-gray-500 tracking-wide mb-2">Total Projects</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold text-[#003b5c]">{projects.length}</h3>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-3xl overflow-hidden flex flex-col">
        {/* Table Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center bg-white">
          <div className="flex items-center text-gray-400 mr-2">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold tracking-wider uppercase">Filter By</span>
          </div>
          <select className="bg-gray-50 border-none text-sm font-medium text-gray-700 rounded-full py-2 px-4 focus:ring-0 cursor-pointer">
            <option>All Regions</option>
            <option>Banaadir Coast</option>
            <option>Puntland</option>
          </select>
          <select className="bg-gray-50 border-none text-sm font-medium text-gray-700 rounded-full py-2 px-4 focus:ring-0 cursor-pointer">
            <option>All Resource Types</option>
            <option>Fisheries</option>
            <option>Minerals</option>
          </select>
          <select className="bg-gray-50 border-none text-sm font-medium text-gray-700 rounded-full py-2 px-4 focus:ring-0 cursor-pointer">
            <option>Status: All</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
          <button className="ml-auto text-sm font-semibold text-[#004a70] hover:text-[#003b5c]">
            Clear All Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">Project Name</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">Company</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">Type</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">Region</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">Duration</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {currentData.length > 0 ? (
                currentData.map((project) => (
                  <tr key={project.projectID} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => handleOpenModal(project)}>
                    <td className="px-6 py-5 whitespace-nowrap relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#004a70] rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="text-sm font-bold text-[#004a70] mb-1">{project.projectName}</div>
                      <div className="text-[11px] text-gray-400 font-medium">ID: PRJ-2024-{project.projectID.toString().padStart(3, '0')}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-medium max-w-[120px] truncate">{project.companyName || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center text-sm font-semibold text-gray-700">
                        {getCategoryIcon(project.resource?.category?.categoryName)}
                        {project.resource?.category?.categoryName || 'Unknown'}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-medium">{project.resource?.location || 'Somalia'}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {formatDisplayDate(project.startDate)} - {formatDisplayDate(project.endDate) || 'Present'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded bg-opacity-10 text-xs font-bold tracking-wide ${
                        project.status === 'Ongoing' ? 'bg-emerald-500 text-emerald-700' : 
                        project.status === 'Completed' ? 'bg-gray-500 text-gray-700' :
                        project.status === 'Planned' ? 'bg-blue-500 text-blue-700' :
                        'bg-amber-500 text-amber-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                     {loading ? 'Loading projects...' : 'No projects found.'}
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-end">
           <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
           />
        </div>
      </div>

      {/* Add/Edit Modal (Unchanged functionality) */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentProject ? 'Edit Project' : 'Create New Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700">Project Name <span className="text-red-500">*</span></label>
             <input
               type="text"
               required
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
               value={formData.projectName}
               onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700">Company Name</label>
             <input
               type="text"
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
               value={formData.companyName}
               onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
             />
           </div>
           
           <div>
             <label className="block text-sm font-medium text-gray-700">Target Resource <span className="text-red-500">*</span></label>
             <select
               required
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border bg-white"
               value={formData.resourceID}
               onChange={(e) => setFormData({ ...formData, resourceID: e.target.value })}
             >
               <option value="" disabled>Select a resource</option>
               {resources.map(r => (
                 <option key={r.resourceID} value={r.resourceID}>{r.resourceName} ({r.category?.categoryName})</option>
               ))}
             </select>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700">Start Date</label>
               <input
                 type="date"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
                 value={formData.startDate}
                 onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700">End Date</label>
               <input
                 type="date"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c4a34] focus:ring-[#0c4a34] sm:text-sm p-2 border"
                 value={formData.endDate}
                 onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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
               <option value="Planned">Planned</option>
               <option value="Ongoing">Ongoing</option>
               <option value="Completed">Completed</option>
               <option value="Suspended">Suspended</option>
             </select>
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
               className="inline-flex w-full justify-center rounded-md bg-[#004a70] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#003b5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c4a34] sm:col-start-2 disabled:opacity-50"
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
    </div>
  );
};

export default Projects;
