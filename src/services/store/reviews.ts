import { Review } from '@/types/domain/reviews';
import api from '../httpClient';

const getReviews = async ({ storeId, page = 1 }: { storeId: number; page?: number }): Promise<Review[]> => {
  const { data } = await api.get(`/stores/${storeId}/reviews?page=${page}`);
  return data;
};

type UpdateWithCreateReviewArgs = {
  taste_rating?: number;
  atmosphere_rating?: number;
  kindness_rating?: number;
  clean_rating?: number;
  parking_rating?: number;
  restroom_rating?: number;
  review_photo?: string[];
  description: string;
};

const createReview = async (storeId: number, reviewData: UpdateWithCreateReviewArgs) => {
  const response = await (
    await api.post(`/stores/${storeId}/reviews`, {
      ...reviewData,
    })
  ).data;
  return response;
};

const getMyReviews = () => {};

type MyReviewArgs = {
  username?: string;
  reviewId: number;
};
const getMyReview = async ({ username, reviewId }: MyReviewArgs) => {
  if (!username || !reviewId) return;
  const response = await (await api.get<Promise<Review>>(`/users/${username}/reviews/${reviewId}`)).data;
  return response;
};

type UpdateReviewRgs = UpdateWithCreateReviewArgs & { username: string };

const updateMyReview = async (id: number, reviewData: UpdateReviewRgs) => {
  const response = await (
    await api.put<Promise<void>>(`/users/${reviewData.username}/reviews/${id}`, {
      id,
      reviewData,
    })
  ).data;
  return response;
};

const deleteMyReview = async ({ reviewId, username }: { reviewId: number; username: string }): Promise<void> => {
  const response = await (await api.delete(`/users/${username}/reviews/${reviewId}`)).data;
  return response;
};

export { getReviews, createReview, getMyReview, updateMyReview, deleteMyReview };
export type { UpdateReviewRgs, UpdateWithCreateReviewArgs };
