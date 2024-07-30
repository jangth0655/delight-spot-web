'use client';

import BookingStoreList from './LimitBookingStoreList';
import RecommendStoreList from './RecommendStoreList';
import StoreTypeTitle from './StoreTypeTitle';

interface Props {}

export default function UserStoreList({}: Props) {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-10 px-4">
        <div className="flex flex-col gap-3">
          <StoreTypeTitle title="찜 스토어" />
          <BookingStoreList />
        </div>

        <div className="flex flex-col gap-2">
          <StoreTypeTitle title="추천 스토어" />
          <RecommendStoreList />
        </div>
      </div>
    </div>
  );
}
