import HttpError from '@/services/httpError';
import { AxiosError } from 'axios';

const handleNetworkError = (error: any) => {
  if (error instanceof AxiosError) {
    throw new HttpError(error.response?.status, error.response?.statusText).errorData;
  } else {
    throw new Error('Network error');
  }
};

export { handleNetworkError };
