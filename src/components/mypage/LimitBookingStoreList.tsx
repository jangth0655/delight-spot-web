'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import ListMoveButton from './ListMoveButton';
import BookingStoreItem from './BookingStoreItem';
import { BookingStore } from '@/types/domain/stores';

interface Props {
  bookingStores?: BookingStore[];
  deleteBookingStore: (storeId: number) => void;
}

export default function LimitBookingStoreList({ bookingStores, deleteBookingStore }: Props) {
  const [showBackButton, setShowBackButton] = useState(false);
  const [showForwardButton, setShowForwardButton] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (bookingStores && bookingStores.length > 3) {
      setShowForwardButton(true);
    }

    const handleScroll = () => {
      if (listRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
        setShowBackButton(scrollLeft > 0);
        const scrollRight = scrollWidth - clientWidth - scrollLeft;
        setShowForwardButton(scrollRight > 1);
      }
    };

    const ulElement = listRef.current;
    if (ulElement) {
      ulElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ulElement) {
        ulElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [bookingStores]);

  const handleForwardClick = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const handleBackClick = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full group">
      {showBackButton && <ListMoveButton direction="left" onClick={handleBackClick} />}
      <ul ref={listRef} className="flex items-center gap-4 overflow-x-auto relative pb-1">
        {bookingStores?.map((item) => (
          <BookingStoreItem item={item} key={item.pk} deleteBookingStore={deleteBookingStore} />
        ))}
      </ul>
      {bookingStores && showForwardButton && (
        <ListMoveButton direction="right" onClick={handleForwardClick} isHide={bookingStores.length < 5} />
      )}
      {bookingStores && bookingStores.length > 0 && (
        <div className="flex items-center justify-end text-label text-primary-P300 font-semibold">
          <Link href="/my/bookings" className="p-1">
            더보기
          </Link>
        </div>
      )}
    </div>
  );
}
