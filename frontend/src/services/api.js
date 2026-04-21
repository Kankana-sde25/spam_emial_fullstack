import axios from 'axios';

const API_URL = 'https://spam-emial-fullstack-3.onrender.com';

export const analyzeMessage = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, { text });
    return response.data;
  } catch (error) {
    console.error('Error analyzing message:', error);
    if (error.response) {
      throw new Error(error.response.data?.error || 'Failed to connect to the server');
    }
    throw new Error('Network error. Please make sure the backend is running.');
  }
};
