const queryKeys = {
  USER: {
    INFO: 'userInfo',
  },
  STORE: {
    GET_STORES: 'GetStores',
    GET_STORE_DETAIL: 'GetStoreDetail',
  },
  REVIEW: {
    GET_REVIEWS: 'GetReviews',
    GET_MY_REVIEW: 'GetMyReview',
  },
  BOOKING: {
    GET_BOOKINGS: 'GetBookings',
  },
} as const;

const ACCESS_TOKEN = 'access_token';

export { queryKeys, ACCESS_TOKEN };
