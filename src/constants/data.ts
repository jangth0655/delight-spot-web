import { RatingTitle } from '@/types/domain/stores';

const mainHeaderMenu = [
  { title: '마이페이지', key: 'myPage', url: '/my' },
  { title: '공지사항', key: 'notice', url: '/notice' },
];

const myStoreTabList = [
  {
    title: '추천 스토어',
    key: 'recommend',
  },
  {
    title: '찜 스토어',
    key: 'booking',
  },
] as const;

const storeTabList = [
  {
    title: '전체',
    key: 'all',
  },
  {
    title: '음식',
    key: 'food',
  },
  {
    title: '카페',
    key: 'cafe',
  },
] as const;

const storeTypeList = ['cafe', 'food', 'ect'] as const;

const petFriendlyOptions = ['possible', 'impossible'] as const;

const myMenuList = [
  {
    name: '수정',
    key: 'edit',
  },
  {
    name: '삭제',
    key: 'delete',
  },
] as const;

const storeRatingList: RatingTitle[] = [
  'taste_rating',
  'atmosphere_rating',
  'kindness_rating',
  'clean_rating',
  'parking_rating',
  'restroom_rating',
] as const;

export { storeTabList, storeTypeList, myMenuList, storeRatingList, petFriendlyOptions, myStoreTabList, mainHeaderMenu };
