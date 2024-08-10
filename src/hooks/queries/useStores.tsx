import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { number, queryKeys } from '@/constants';
import {
  CreateAndUpdateStoreArgs,
  createStore,
  deleteStore,
  getStoreDetail,
  getStores,
  updateStore,
} from '@/services/store/store';
import { ErrorStatus, UseMutationCustomOptions, UseQueryCustomOption } from '@/types/common';
import { Store, StoreDetail } from '@/types/domain/stores';
import { useRouter } from 'next/navigation';
import { useStoreListTabState } from '@/store/useStoreListTabStore';
import { useToastStore } from '@/store/useToastStore';
import { useDeleteImage } from './useImage';

function useGetInfiniteStores(
  queryOptions?: UseInfiniteQueryOptions<Store[], ErrorStatus, InfiniteData<Store[], number>, Store[], QueryKey, number>
) {
  const { selectedTab } = useStoreListTabState();
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getStores(pageParam, selectedTab),
    queryKey: [queryKeys.STORE.GET_STORES, selectedTab],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length < number.INFINITE_QUERY_OFFSET) return undefined;
      const lastFeed = lastPage.at(-1);
      return lastFeed ? allPage?.length + 1 : undefined;
    },
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

function useCreateStore(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addToast } = useToastStore();
  const { selectedTab } = useStoreListTabState();
  return useMutation({
    mutationFn: createStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORES, selectedTab],
        refetchType: 'inactive',
      });
      addToast({
        message: '스토어를 생성했습니다.',
        type: 'success',
      });
      router.replace('/');
    },
    ...mutationOptions,
  });
}

function useDeleteStore(storeId: number, mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  const { selectedTab } = useStoreListTabState();
  const { addToast } = useToastStore();
  const router = useRouter();
  const prevStoreDetail = queryClient.getQueryData<StoreDetail>([queryKeys.STORE.GET_STORE_DETAIL, storeId]);
  const { mutate: deleteImage } = useDeleteImage();
  return useMutation({
    mutationFn: (storeId: number) => deleteStore({ storeId }),
    onSuccess: () => {
      if (prevStoreDetail && prevStoreDetail.store_photo.length > 0) {
        deleteImage(prevStoreDetail?.store_photo);
      }
      router.replace('/');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORES, selectedTab],
        refetchType: 'inactive',
      });
      addToast({
        message: '스토어를 제거했습니다.',
        type: 'success',
      });
    },

    ...mutationOptions,
  });
}

function useEditStore(storeId: number, mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addToast } = useToastStore();
  return useMutation({
    mutationFn: (updateArgs: CreateAndUpdateStoreArgs) => updateStore(storeId, updateArgs),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORE_DETAIL, storeId],
      });
      router.push(`/store/${storeId}`);
      addToast({
        message: '스토어가 수정되었습니다.',
        type: 'success',
      });
    },
    ...mutationOptions,
  });
}

function useGetStoreDetail(id: number, queryOptions?: UseQueryCustomOption<StoreDetail>) {
  return useQuery({
    queryKey: [queryKeys.STORE.GET_STORE_DETAIL, id],
    queryFn: () => getStoreDetail(id),
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    ...queryOptions,
  });
}

export { useGetInfiniteStores, useCreateStore, useGetStoreDetail, useDeleteStore, useEditStore };
