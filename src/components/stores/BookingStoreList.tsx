'use client';

import { useGetBookingList, useToggleBooking } from '@/hooks/queries/useBookings';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import BookingStoreItem from '../mypage/BookingStoreItem';
import EmptyNotice from '../EmptyNotice';

export default function BookingStoreList() {
  const { data, fetchNextPage, isPending, isSuccess } = useGetBookingList();
  const { mutate: deleteBooking } = useToggleBooking();

  const limitRef = useRef<HTMLDivElement | null>(null);
  const { isInterSecting } = useIntersectionObserver({
    node: limitRef.current,
  });
  const hasStoreList = data?.pages && data.pages.some((item) => item.length > 0);

  useEffect(() => {
    if (isSuccess && isInterSecting) {
      fetchNextPage();
    }
  }, [isInterSecting, fetchNextPage, isSuccess]);

  return (
    <div className="pt-20">
      {data?.pages && data?.pages[0][0].store.length < 1 && <h1>찜 목록이 없습니다.</h1>}
      {!isPending &&
        (hasStoreList ? (
          <ul className="grid grid-cols-2 gap-4">
            {data?.pages[0][0].store.map((item) => (
              <BookingStoreItem key={item.pk} item={item} size={170} deleteBookingStore={deleteBooking} />
            ))}
          </ul>
        ) : (
          <EmptyNotice height={400} />
        ))}

      <div ref={limitRef} className="mt-4" />
    </div>
  );
}
