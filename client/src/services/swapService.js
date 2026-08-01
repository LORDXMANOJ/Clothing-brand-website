import API from './api';

export const swapService = {
  getSwaps: async () => {
    const res = await API.get('/swaps');
    return res.data;
  },

  createSwap: async (swapData) => {
    const res = await API.post('/swaps', swapData);
    return res.data;
  },

  updateStatus: async (id, status) => {
    const res = await API.put(`/swaps/${id}/status`, { status });
    return res.data;
  },

  getMessages: async (swapId) => {
    const res = await API.get(`/chat/${swapId}`);
    return res.data;
  },

  sendMessage: async (messageData) => {
    const res = await API.post('/chat', messageData);
    return res.data;
  },
};
