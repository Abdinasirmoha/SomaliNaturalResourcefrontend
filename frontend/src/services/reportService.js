import api from './api';

export const getAllReports = async () => {
  const response = await api.get('/Reports');
  return response.data;
};

export const getReportById = async (id) => {
  const response = await api.get(`/Reports/${id}`);
  return response.data;
};

export const createReport = async (data) => {
  const response = await api.post('/Reports', data);
  return response.data;
};

export const updateReport = async (id, data) => {
  const response = await api.put(`/Reports/${id}`, data);
  return response.data;
};

export const deleteReport = async (id) => {
  const response = await api.delete(`/Reports/${id}`);
  return response.data;
};

export const searchReports = async (type) => {
  const response = await api.get(`/Reports/search?type=${encodeURIComponent(type)}`);
  return response.data;
};
