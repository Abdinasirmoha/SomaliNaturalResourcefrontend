import api from './api';

export const getAllUsers = async () => {
  const response = await api.get('/Users');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/Users/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post('/Users', data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/Users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/Users/${id}`);
  return response.data;
};
