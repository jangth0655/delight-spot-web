'use client';

import { useModal } from '@/hooks/useModal';
import { useCallback, useRef } from 'react';
import { useCloseOnOutSideClick } from '@/hooks/useCloseOnOutSide';
import Image from 'next/image';
import { IoStar } from 'react-icons/io5';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

import Avatar from '../Avatar';
import IconWrapper from '@/components/IconWrapper';
import ReviewMoreView from './ReviewMoreView';

import { Review } from '@/types/domain/reviews';
import { formatRating } from '@/utils/formatNumber';

interface Props {
  review: Review;
  isOwner: boolean;
  storeId: number;
}

export default function ReviewItem({ review, isOwner, storeId }: Props) {
  const moreViewModal = useModal();
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);
  useCloseOnOutSideClick({
    excludeRefs: [menuWrapperRef],
    onClose: moreViewModal.hide,
  });

  const onMoreView = useCallback(() => {
    moreViewModal.toggle();
  }, [moreViewModal]);

  return (
    <li aria-label="reviewItem" className="mt-10 first:mt-0 flex flex-col gap-3 relative">
      <div ref={menuWrapperRef} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar size={32} avatarUrl={review.user.avatar} />
          <div className="flex flex-col text-body-s">
            <p className="text-slate-S400">{review?.user.username}</p>
          </div>
        </div>
        {isOwner && (
          <div>
            <IconWrapper icon={<IoEllipsisHorizontalSharp />} onClick={onMoreView}></IconWrapper>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {review?.review_photo && review?.review_photo.length > 0 && (
          <ul className="flex items-center gap-1 w-full overflow-x-auto">
            {review?.review_photo.map((item) => (
              <li key={item} className="size-[120px] aspect-square shrink-0 relative rounded-lg overflow-hidden">
                <Image src={item} fill alt="review_image" className="object-cover" />
              </li>
            ))}
          </ul>
        )}

        <p>{review.description}</p>
        {review?.total_rating && (
          <div className="flex items-center gap-1">
            <p>총 평점</p>
            <IoStar color="#FFBD53" />
            <p>{formatRating(review?.total_rating)}</p>
          </div>
        )}
      </div>

      {isOwner && <ReviewMoreView isOpen={moreViewModal.isVisible} reviewId={review.pk} storeId={storeId} />}
    </li>
  );
}
