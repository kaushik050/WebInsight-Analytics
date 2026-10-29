import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/analytics';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDomainSummary = async (filters = {}) => {
  const response = await apiClient.get('/domain-summary', { params: filters });
  return response.data.data;
};

export const fetchComparison = async (domain, item1, item2, filters = {}) => {
  const response = await apiClient.get('/comparison', {
    params: { ...filters, domain, item1, item2 }
  });
  return response.data.data;
};

export const fetchExplorerData = async (domain, page = 1, limit = 15, filters = {}) => {
  const response = await apiClient.get('/explorer', {
    params: { ...filters, domain, page, limit }
  });
  return response.data;
};

export const fetchOverview = async (filters = {}) => {
  const response = await apiClient.get('/overview', { params: filters });
  return response.data.data;
};

export const fetchContentAnalytics = async (filters = {}) => {
  const response = await apiClient.get('/content', { params: filters });
  return response.data.data;
};

export const fetchCategoryAnalytics = async (filters = {}) => {
  const response = await apiClient.get('/categories', { params: filters });
  return response.data.data;
};

export const fetchDeviceAnalytics = async (filters = {}) => {
  const response = await apiClient.get('/devices', { params: filters });
  return response.data.data;
};

export const fetchUserTypeAnalytics = async (filters = {}) => {
  const response = await apiClient.get('/user-types', { params: filters });
  return response.data.data;
};

export const fetchTrendAnalytics = async (filters = {}) => {
  const response = await apiClient.get('/trends', { params: filters });
  return response.data.data;
};

export const fetchTopContent = async (filters = {}, limit = 10) => {
  const response = await apiClient.get('/top-content', { params: { ...filters, limit } });
  return response.data.data;
};

export const getExportUrl = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return `${API_BASE_URL}/export?${params}`;
};
