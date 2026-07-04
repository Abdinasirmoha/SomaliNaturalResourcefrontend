import api from './api';

export const getAllCategories = async () => {
  const response = await api.get('/Categories');
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/Categories/${id}`);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post('/Categories', data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await api.put(`/Categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/Categories/${id}`);
  return response.data;
};
