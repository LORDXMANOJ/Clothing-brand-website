import API from './api';

export const authService = {
  login: async ({ email, password, rememberMe = true }) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.token) {
      if (rememberMe) {
        localStorage.setItem('clothing_swap_token', res.data.token);
        localStorage.setItem('clothing_swap_user', JSON.stringify(res.data.user));
        sessionStorage.removeItem('clothing_swap_token');
        sessionStorage.removeItem('clothing_swap_user');
      } else {
        sessionStorage.setItem('clothing_swap_token', res.data.token);
        sessionStorage.setItem('clothing_swap_user', JSON.stringify(res.data.user));
        localStorage.removeItem('clothing_swap_token');
        localStorage.removeItem('clothing_swap_user');
      }
    }
    return res.data;
  },

  register: async (userData) => {
    const res = await API.post('/auth/register', userData);
    if (res.data.token) {
      localStorage.setItem('clothing_swap_token', res.data.token);
      localStorage.setItem('clothing_swap_user', JSON.stringify(res.data.user));
      sessionStorage.removeItem('clothing_swap_token');
      sessionStorage.removeItem('clothing_swap_user');
    }
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('clothing_swap_token');
    localStorage.removeItem('clothing_swap_user');
    sessionStorage.removeItem('clothing_swap_token');
    sessionStorage.removeItem('clothing_swap_user');
  },

  getCurrentUser: async () => {
    const res = await API.get('/auth/me');
    return res.data;
  },
};
