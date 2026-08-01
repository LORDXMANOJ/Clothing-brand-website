import API from './api';

export const authService = {
  login: async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    if (res.data.token) {
      localStorage.setItem('clothing_swap_token', res.data.token);
      localStorage.setItem('clothing_swap_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  register: async (userData) => {
    const res = await API.post('/auth/register', userData);
    if (res.data.token) {
      localStorage.setItem('clothing_swap_token', res.data.token);
      localStorage.setItem('clothing_swap_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('clothing_swap_token');
    localStorage.removeItem('clothing_swap_user');
  },

  getCurrentUser: async () => {
    const res = await API.get('/auth/me');
    return res.data;
  },
};
