'use client';

import { useGetBookingList, useToggleBooking } from '@/hooks/queries/useBookings';
import { useModal } from '@/hooks/useModal';

import LimitBookingStoreList from './LimitBookingStoreList';
import RecommendStoreList from './RecommendStoreList';
import StoreTypeTitle from './StoreTypeTitle';
import LoginModal from '../modal/LoginModal';
import AlertModal from '../modal/AlertModal';

export default function UserStoreList() {
  const { data, error: getBookingListError } = useGetBookingList();
  const { mutate: deleteBooking } = useToggleBooking();
  const errorModal = useModal();

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-10 px-4">
        <div className="flex flex-col gap-3">
          <StoreTypeTitle title="찜 스토어" />
          <LimitBookingStoreList bookingStores={data?.pages[0][0].store} deleteBookingStore={deleteBooking} />
        </div>

        <div className="flex flex-col gap-2">
          <StoreTypeTitle title="추천 스토어" />
          <RecommendStoreList />
        </div>
      </div>

      {getBookingListError?.statusCode === 401 ? (
        <LoginModal isOpen={errorModal.isVisible} onCloseModal={errorModal.hide} />
      ) : (
        <AlertModal close={errorModal.show} isOpen={errorModal.isVisible} type="error" />
      )}
    </div>
  );
}
