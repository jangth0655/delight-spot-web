import axios, { AxiosError } from 'axios';
import HttpError from '../httpError';

type ImageResponse = {
  error?: string;
  isSuccess: boolean;
  imageUrl?: string;
};

const uploadImage = async (formData: FormData): Promise<ImageResponse> => {
  try {
    const response = await (
      await axios.post(`/api/s3`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
    return response;
  } catch (error) {
    console.error(error);
    if (!(error instanceof AxiosError)) throw new Error('네트워크 통신 에러');
    throw new HttpError(error.response?.status, error.response?.statusText).errorData;
  }
};

const deleteImage = async (fileNames: string[]): Promise<ImageResponse> => {
  try {
    const response = await (
      await axios.delete('/api/s3', {
        data: { fileNames },
      })
    ).data;
    return response;
  } catch (error) {
    console.error(error);
    if (!(error instanceof AxiosError)) throw new Error('네트워크 통신 에러');
    throw new HttpError(error.response?.status, error.response?.statusText).errorData;
  }
};

export { uploadImage, deleteImage };
export type { ImageResponse };
