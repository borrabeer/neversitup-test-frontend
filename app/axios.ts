'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

const backendURL = process.env.API_URL;

export const backendAPI = axios.create({
  baseURL: `${backendURL}/`,
});

backendAPI.interceptors.request.use((config) => {
  const token = cookies().get('token')?.value;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

backendAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message.includes('Unauthorized')
    ) {
      cookies().delete('token');
      throw new Error('Unauthorized');
    }
    return Promise.reject(error);
  }
);
