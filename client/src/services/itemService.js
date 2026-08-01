import API from './api';

export const itemService = {
  getItems: async (params = {}) => {
    const res = await API.get('/items', { params });
    return res.data;
  },

  getItemById: async (id) => {
    const res = await API.get(`/items/${id}`);
    return res.data;
  },

  createItem: async (itemData) => {
    const res = await API.post('/items', itemData);
    return res.data;
  },

  updateItem: async (id, itemData) => {
    const res = await API.put(`/items/${id}`, itemData);
    return res.data;
  },

  deleteItem: async (id) => {
    const res = await API.delete(`/items/${id}`);
    return res.data;
  },
};
