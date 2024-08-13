import { prefetchStores } from '@/utils/prefetch/prefetchStores';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

import Header from '@/components/header/Header';
import StoreList from '@/components/stores/StoreList';
import StoreListSkeleton from '@/components/stores/StoreListSkeleton';
import StoreAddButton from '@/components/stores/StoreAddButton';
import HeaderMenu from '@/components/HeaderMenu';
import Toast from '@/components/Toast';

export default async function HomePage() {
  const queryClient = await prefetchStores();

  return (
    <section>
      <Header title="STORE LIST" customMenu={<HeaderMenu />} />
      <StoreList />
      {/* <Suspense fallback={<StoreListSkeleton paddingTop={70} length={10} />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <StoreList />
        </HydrationBoundary>
      </Suspense> */}
      <StoreAddButton />
      <Toast isShowing />
    </section>
  );
}
