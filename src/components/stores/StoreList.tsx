'use client';

import { useGetInfiniteStores } from '@/hooks/queries/useStores';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';
import { useStoreListTabState } from '@/store/useStoreListTabStore';
import { useModal } from '@/hooks/useModal';
import Link from 'next/link';

import StoreItem from './StoreItem';
import EmptyNotice from '../EmptyNotice';
import StoreTabList from './StoreTabList';
import LoginModal from '../modal/LoginModal';
import AlertModal from '../modal/AlertModal';

import { storeTabList } from '@/constants';

export default function StoreList() {
  const { selectedTab, setSelectedTab } = useStoreListTabState();
  const { data, fetchNextPage, isPending, isSuccess, error: storeListError } = useGetInfiniteStores();
  const limitRef = useRef<HTMLDivElement | null>(null);
  const [isClientReady, setIsClientReady] = useState(false);
  const { isInterSecting } = useIntersectionObserver({
    node: isClientReady ? limitRef.current : null,
  });
  const errorModal = useModal();

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  useEffect(() => {
    if (storeListError) {
      errorModal.show();
    }
  }, [storeListError, errorModal]);

  useEffect(() => {
    if (isInterSecting) {
      fetchNextPage();
    }
  }, [isInterSecting, fetchNextPage, isSuccess]);

  const handleSelectTab = (tabKey: string) => {
    setSelectedTab(tabKey as 'all' | 'food' | 'cafe');
  };

  const hasStoreList = data?.pages && data.pages.some((item) => item.length > 0);

  return (
    <>
      <div className="p-4 pt-20">
        <StoreTabList
          onTabClick={handleSelectTab}
          selectedTabKey={selectedTab}
          tabList={storeTabList}
          type="mainStore"
        />
      </div>

      {!isPending &&
        (hasStoreList ? (
          <ul className="flex flex-col gap-8 px-4">
            {data?.pages.flat().map((item) => (
              <Link href={`/store/${item.pk}`} key={item.pk}>
                <StoreItem store={item} />
              </Link>
            ))}
          </ul>
        ) : (
          <EmptyNotice height={400} />
        ))}
      <div ref={limitRef} className="mt-4 border-2" />
      {storeListError?.statusCode === 401 ? (
        <LoginModal isOpen={errorModal.isVisible} onCloseModal={errorModal.hide} />
      ) : (
        <AlertModal close={errorModal.hide} isOpen={errorModal.isVisible} type="error" />
      )}
    </>
  );
}
