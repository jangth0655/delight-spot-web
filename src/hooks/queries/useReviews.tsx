import { queryClient } from '@/QueryProvider';
import { number, queryKeys } from '@/constants';
import {
  createReview,
  deleteMyReview,
  getMyReview,
  getReviews,
  updateMyReview,
  UpdateReviewRgs,
  UpdateWithCreateReviewArgs,
} from '@/services/store/reviews';
import { useToastStore } from '@/store/useToastStore';
import { ErrorStatus, UseMutationCustomOptions, UseQueryCustomOption } from '@/types/common';
import { Review } from '@/types/domain/reviews';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function useGetReviews(
  { storeId, page = 1 }: { storeId: number; page?: number },
  queryOptions?: UseInfiniteQueryOptions<
    Review[],
    ErrorStatus,
    InfiniteData<Review[], number>,
    Review[],
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryKey: [queryKeys.REVIEW.GET_REVIEWS, storeId],
    queryFn: () => getReviews({ storeId, page }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length < number.INFINITE_QUERY_OFFSET) return undefined;
      const lastFeed = lastPage.at(-1);
      return lastFeed ? allPage.length + 1 : undefined;
    },
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    ...queryOptions,
  });
}

function useCreateReviews(storeId: number, mutationOptions?: UseMutationCustomOptions) {
  const { addToast } = useToastStore();
  const router = useRouter();
  return useMutation({
    mutationFn: (reviewData: UpdateWithCreateReviewArgs) => createReview(storeId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEW.GET_REVIEWS, storeId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORE_DETAIL, storeId],
      });

      addToast({
        message: '리뷰를 작성했습니다.',
        type: 'success',
      });
      router.replace(`/store/${storeId}`);
    },
    ...mutationOptions,
  });
}

function useGetMyReview(
  { reviewId, username }: { reviewId: number; username?: string },
  queryOptions?: UseQueryCustomOption<Review | undefined>
) {
  return useQuery({
    queryKey: [queryKeys.REVIEW.GET_MY_REVIEW, reviewId],
    queryFn: () => getMyReview({ reviewId, username }),
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    ...queryOptions,
    enabled: !!username && !!reviewId,
  });
}

function useUpdateReview(
  { reviewId, storeId }: { reviewId: number; storeId: number },
  mutationOptions?: UseMutationCustomOptions
) {
  const router = useRouter();
  const { addToast } = useToastStore();
  return useMutation({
    mutationFn: (reviewUpdateArgs: UpdateReviewRgs) => updateMyReview(reviewId, reviewUpdateArgs),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEW.GET_REVIEWS, storeId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORE_DETAIL, storeId],
      });
      addToast({
        message: '리뷰를 수정했습니다.',
        type: 'success',
      });
      router.replace(`/store/${storeId}`);
    },
    ...mutationOptions,
  });
}

function useDeleteReview(
  { reviewId, storeId }: { reviewId: number; storeId: number },
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (username: string) => deleteMyReview({ reviewId, username }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEW.GET_REVIEWS, storeId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORE_DETAIL, storeId],
      });
    },
    ...mutationOptions,
  });
}

export { useGetReviews, useCreateReviews, useGetMyReview, useUpdateReview, useDeleteReview };
