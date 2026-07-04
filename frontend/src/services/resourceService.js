import api from './api';

export const getAllResources = async () => {
  const response = await api.get('/Resources');
  return response.data;
};

export const getResourceById = async (id) => {
  const response = await api.get(`/Resources/${id}`);
  return response.data;
};

export const createResource = async (data) => {
  const response = await api.post('/Resources', data);
  return response.data;
};

export const updateResource = async (id, data) => {
  const response = await api.put(`/Resources/${id}`, data);
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await api.delete(`/Resources/${id}`);
  return response.data;
};

export const searchResources = async (name) => {
  const response = await api.get(`/Resources/search?name=${encodeURIComponent(name)}`);
  return response.data;
};
