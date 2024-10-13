import axios from 'axios';

const backendURL = process.env.API_URL;

export const backendAPI = axios.create({
  baseURL: `${backendURL}/`,
});

export const setAuthorizationHeader = (token: string | undefined) => {
  if (token) {
    backendAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete backendAPI.defaults.headers.common['Authorization'];
  }
};

backendAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message.includes('Unauthorized')
    ) {
      throw new Error('Unauthorized');
    }
    return Promise.reject(error);
  }
);
