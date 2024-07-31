import axios from 'axios';
import { getCookie } from 'cookies-next';
import { ACCESS_TOKEN } from '@/constants';
import { handleNetworkError } from '@/utils/handleNetworkError';

export const SSR_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;
console.log('env ', process.env.NEXT_PUBLIC_BASE_URL);
export const CSR_BASE_URL = '/api/v1/';

const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL: isServer ? SSR_BASE_URL : CSR_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const prevAccessToken = getCookie(ACCESS_TOKEN);
  if (prevAccessToken) {
    config.headers.Authorization = prevAccessToken;
  }

  const csrftoken = getCookie('csrftoken');
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleNetworkError(error);
  }
);

export default api;
