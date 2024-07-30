import { rest } from 'msw';
import storeData from '../src/server/response/stores.json';
import reviewList from '../src/server/response/reviews.json';
import userInfo from '../src/server/response/users.json';
import StoreDetailData from '../src/server/response/storeDetail.json';

const API_BASE_URL = '/api/v1';
const pageSize = 10;

export const handlers = [
  rest.get(`${API_BASE_URL}/stores`, (req, res, ctx) => {
    const type = req.url.searchParams.get('type') ?? 'all';
    const page = parseInt(req.url.searchParams.get('page') ?? '1', 10);
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const storeList = storeData.slice(startIndex, endIndex).filter((item) => {
      if (type === 'all') return item;
      return item.kind_menu === type;
    });

    return res(ctx.status(200), ctx.json(storeList));
  }),

  rest.post(`${API_BASE_URL}/stores`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${API_BASE_URL}/stores/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(StoreDetailData));
  }),

  rest.get(`${API_BASE_URL}/stores/:id/reviews`, (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') ?? '1', 10);
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const reviewData = reviewList.slice(startIndex, endIndex);
    return res(ctx.status(200), ctx.json(reviewData));
  }),

  rest.post(`${API_BASE_URL}/stores/:id/reviews`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(`${API_BASE_URL}/users/${userInfo.username}/reviews/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${API_BASE_URL}/users/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(null));
  }),

  rest.post(`${API_BASE_URL}/bookings`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.post('/api/s3', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        imageUrl: '/mock-test-image.png',
      })
    );
  }),
];
