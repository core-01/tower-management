import axios from 'axios';
import { Tower, DashboardMetrics, ApiResponse, PaginationParams } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const towerService = {
  async getTowers(params: PaginationParams): Promise<{ data: Tower[]; total: number }> {
    const response = await api.get<Tower[]>('/towers', { params });
    return {
      data: response.data,
      total: response.data.length, 
    };
  },

  async getTower(id: string): Promise<Tower> {
    const response = await api.get(`/towers/${id}`);
    return response.data;
  },

  async createTower(tower: Omit<Tower, 'id' | 'lastUpdated'>): Promise<Tower> {
    const response = await api.post('/towers', tower);
    return response.data;
  },

  async updateTower(id: string, tower: Partial<Tower>): Promise<Tower> {
    const response = await api.put(`/towers/${id}`, tower);
    return response.data;
  },

  async deleteTower(id: string): Promise<void> {
    await api.delete(`/towers/${id}`);
  },

  async deleteTowers(ids: string[]): Promise<void> {
    await api.delete('/towers/bulk', { data: { ids } });
  },

  async searchTowers(query: string): Promise<Tower[]> {
    const response = await api.get(`/towers/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  async exportTowers(ids?: string[]): Promise<Blob> {
    const response = await api.post('/towers/export', { ids }, { responseType: 'blob' });
    return response.data;
  },

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  },
};