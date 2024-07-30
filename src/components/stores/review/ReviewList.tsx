'use client';

import { useGetReviews } from '@/hooks/queries/useReviews';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';

import ReviewItem from './ReviewItem';
import EmptyNotice from '@/components/EmptyNotice';
import { useUser } from '@/hooks/useUser';

interface Props {
  storeId: number;
}

export default function ReviewList({ storeId }: Props) {
  const { data: reviews, fetchNextPage } = useGetReviews({ storeId });
  const { userInfo } = useUser();
  const limitRef = useRef<HTMLDivElement | null>(null);
  const { isInterSecting } = useIntersectionObserver({
    node: limitRef.current,
  });

  useEffect(() => {
    if (isInterSecting) {
      fetchNextPage();
    }
  }, [fetchNextPage, isInterSecting]);
  const hasReviews = reviews?.pages && reviews.pages.some((page) => page.length > 0);

  return (
    <>
      {hasReviews ? (
        <ul className="flex flex-col">
          {reviews?.pages.flat().map((review) => (
            <ReviewItem key={review.pk} review={review} isOwner={userInfo?.pk === review.user.pk} storeId={storeId} />
          ))}
        </ul>
      ) : (
        <EmptyNotice />
      )}
      <div ref={limitRef} />
    </>
  );
}
