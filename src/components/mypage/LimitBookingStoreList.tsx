'use client';

import { useGetBookingList } from '@/hooks/queries/useBookings';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import Link from 'next/link';

import ListMoveButton from './ListMoveButton';
import AlertModal from '../modal/AlertModal';
import LoginModal from '../modal/LoginModal';
import BookingStoreItem from './BookingStoreItem';

export default function LimitBookingStoreList() {
  const { data, error: getBookingListError } = useGetBookingList();
  const [showBackButton, setShowBackButton] = useState(false);
  const [showForwardButton, setShowForwardButton] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const errorModal = useModal();

  useEffect(() => {
    if (getBookingListError) {
      errorModal.show();
    }
  }, [getBookingListError, errorModal]);

  useEffect(() => {
    if (data && data.pages.flat().length > 3) {
      setShowForwardButton(true);
    }

    const handleScroll = () => {
      if (listRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
        setShowBackButton(scrollLeft > 0);
        setShowForwardButton(scrollLeft < scrollWidth - clientWidth);
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
  }, [data]);

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
        {data?.pages.flat().map((item) => (
          <BookingStoreItem item={item} key={item.pk} />
        ))}
      </ul>
      {showForwardButton && (
        <ListMoveButton
          direction="right"
          onClick={handleForwardClick}
          isHide={data?.pages && data?.pages[0].length < 5}
        />
      )}
      <div className="flex items-center justify-end text-label text-primary-P300 font-semibold">
        <Link href="/my/bookings" className="p-1">
          더보기
        </Link>
      </div>

      {getBookingListError?.statusCode === 401 ? (
        <LoginModal isOpen={errorModal.isVisible} onCloseModal={errorModal.hide} />
      ) : (
        <AlertModal close={errorModal.show} isOpen={errorModal.isVisible} type="error" />
      )}
    </div>
  );
}
