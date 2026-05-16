import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = (email, password) => api.post('/auth/login', { email, password });
export const getMe = () => api.get('/auth/me');
export const getUsers = () => api.get('/auth/users');

export const uploadMenu = (formData) => api.post('/menus/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getMenus = () => api.get('/menus');
export const getCurrentMenu = () => api.get('/menus/current');
export const getMenuById = (id) => api.get(`/menus/${id}`);
export const deleteMenu = (id) => api.delete(`/menus/${id}`);

export const downloadMenuPdf = async (id) => {
  const response = await api.get(`/menus/${id}/download`, {
    responseType: 'blob'
  });
  return response.data;
};

export const uploadProgramming = (formData) => api.post('/programmings/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProgramming = (id, data) => api.put(`/programmings/${id}`, data);
export const getProgrammingByClassroom = (classroom) => api.get(`/programmings/${classroom}`);
export const getAllProgrammings = () => api.get('/programmings');
export const deleteProgramming = (id) => api.delete(`/programmings/${id}`);

export const downloadProgrammingPdf = async (id) => {
  const response = await api.get(`/programmings/${id}/download`, {
    responseType: 'blob'
  });
  return response.data;
};

export const generateProgrammingPdf = async (id) => {
  const response = await api.get(`/programmings/${id}/generate-pdf`, {
    responseType: 'blob'
  });
  return response.data;
};

export default api;
