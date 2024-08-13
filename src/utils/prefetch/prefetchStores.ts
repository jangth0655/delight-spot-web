import { queryKeys } from '@/constants';
import { getStores } from '@/services/store/store';
import { QueryClient } from '@tanstack/react-query';

export async function prefetchStores() {
  const initialSelectedTab = 'all';
  const serverQueryClient = new QueryClient();
  await serverQueryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.STORE.GET_STORES, initialSelectedTab],
    queryFn: () => getStores(1, initialSelectedTab),
    getNextPageParam: () => 2,
    pages: 1,
    initialPageParam: 1,
  });

  console.log('Prefetched stores:', serverQueryClient.getQueryData([queryKeys.STORE.GET_STORES, initialSelectedTab]));

  return serverQueryClient;
}
