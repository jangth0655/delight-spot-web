import { KindMenu } from '@/types/domain/stores';
import api from '../httpClient';

type BookingListParams = {
  page: number;
  keyword?: string;
  type?: string;
};

const getBookingStoreList = async ({ page, type, keyword }: BookingListParams) => {
  const response = await (
    await api.get(`/bookings`, {
      params: {
        ...(type !== 'all' && { type }),
        page,
        keyword,
      },
    })
  ).data;
  return response;
};

const toggleBooking = async (storeId: number): Promise<void> => {
  const response = await (
    await api.post(`/bookings`, {
      store_pk: [storeId],
    })
  ).data;
  return response;
};

export { getBookingStoreList, toggleBooking };
export type { BookingListParams };
