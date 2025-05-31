import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
  loading: false,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Login failed', 
        loading: false 
      });
      return false;
    }
  },

  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.post('/auth/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Registration failed', 
        loading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.get('/user/me');
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch user', 
        loading: false 
      });
    }
  },
}));

export default useAuthStore; 