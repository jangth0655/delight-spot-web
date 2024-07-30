import { number, queryKeys } from '@/constants';
import { queryClient } from '@/QueryProvider';
import { getBookingStoreList, toggleBooking } from '@/services/store/bookings';
import { useStoreListTabState } from '@/store/useStoreListTabStore';
import { useToastStore } from '@/store/useToastStore';
import { ErrorStatus, UseMutationCustomOptions } from '@/types/common';
import { BookingStore, StoreDetail } from '@/types/domain/stores';
import {
  InfiniteData,
  keepPreviousData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
} from '@tanstack/react-query';

export function useGetBookingList(
  selectedType: string = 'all',
  queryOptions?: UseInfiniteQueryOptions<
    BookingStore[],
    ErrorStatus,
    InfiniteData<BookingStore[], number>,
    BookingStore[],
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return getBookingStoreList({ page: pageParam, type: selectedType });
    },
    queryKey: [queryKeys.BOOKING.GET_BOOKINGS, selectedType],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length < number.INFINITE_QUERY_OFFSET) return undefined;
      const lastFeed = lastPage.at(-1);
      return lastFeed ? allPage.length + 1 : undefined;
    },
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export function useToggleBooking(storeId: number, mutationOptions?: UseMutationCustomOptions) {
  const { addToast } = useToastStore();
  const selectedTab = useStoreListTabState((state) => state.selectedTab);
  return useMutation({
    mutationFn: (storeId: number) => toggleBooking(storeId),
    onMutate: (storeId: number) => {
      const prevData = queryClient.getQueryData([queryKeys.STORE.GET_STORE_DETAIL, storeId]);
      queryClient.setQueryData([queryKeys.STORE.GET_STORE_DETAIL, storeId], (prevData: StoreDetail) => {
        if (prevData) {
          return {
            ...prevData,
            is_liked: !prevData.is_liked,
          };
        }
      });
      return prevData;
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORE_DETAIL, storeId],
      });
      addToast({
        message: '현재 북마크를 적용할 수 없습니다.',
        type: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BOOKING.GET_BOOKINGS, selectedTab],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORES, selectedTab],
      });
    },
    ...mutationOptions,
  });
}
