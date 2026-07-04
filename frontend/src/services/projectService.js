import api from './api';

export const getAllProjects = async () => {
  const response = await api.get('/Projects');
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/Projects/${id}`);
  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post('/Projects', data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await api.put(`/Projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/Projects/${id}`);
  return response.data;
};

export const searchProjects = async (name) => {
  const response = await api.get(`/Projects/search?name=${encodeURIComponent(name)}`);
  return response.data;
};
