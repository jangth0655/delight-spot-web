'use client';

import { useUser } from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useToggleBooking } from '@/hooks/queries/useBookings';
import { useGetStoreDetail } from '@/hooks/queries/useStores';
import { useEffect } from 'react';

import IconWrapper from '../IconWrapper';
import RatingList from '../RatingList';
import Avatar from './Avatar';
import ReviewList from './review/ReviewList';
import Header from '../header/Header';
import StoreDetailSubtitle from './StoreDetailSubTitle';
import LoginModal from '../modal/LoginModal';
import ImageSlider from './ImageSlider';
import StoreDetailMenu from '../header/StoreDetailMenu';
import AlertModal from '../modal/AlertModal';

import { RatingTitle } from '@/types/domain/stores';
import { translateKindMenu } from '@/utils/translateToKorean';
import { formatTimeAgo } from '@/utils/formatDate';
import { cls } from '@/utils/cls';
import { MdOutlinePets } from 'react-icons/md';
import {
  IoHeartSharp,
  IoShareSocialOutline,
  IoHomeSharp,
  IoPencilSharp,
  IoArrowForward,
  IoCopy,
} from 'react-icons/io5';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { copyToClipboard } from '@/utils/copyText';
import { storeRatingList } from '@/constants';
const Maps = dynamic(() => import('../Map'), {
  ssr: false,
});

interface Props {
  id: number;
}

export default function StoreDetailInfo({ id }: Props) {
  const { data, isError } = useGetStoreDetail(id);
  const router = useRouter();
  const modal = useModal();
  const loginModal = useModal();

  const { isLoggedIn } = useUser();

  const { mutate: toggleBooking } = useToggleBooking(id);

  const ratingList: { title: RatingTitle; rating: number }[] = data
    ? storeRatingList.reduce<{ title: RatingTitle; rating: number }[]>((acc, title) => {
        if (data[title] !== undefined) {
          acc.push({ title, rating: data[title] as number });
        }
        return acc;
      }, [])
    : [];

  const onBooking = () => {
    if (!isLoggedIn) return loginModal.show();
    toggleBooking(id);
  };

  const onShare = () => {
    if (!isLoggedIn) return loginModal.show();
    console.log('share');
  };

  const onReviewForm = () => {
    if (!isLoggedIn) return loginModal.show();
    router.push(`/store/${id}/review`);
  };

  useEffect(() => {
    if (isError) {
      modal.show();
    }
  }, [isError, modal]);

  return (
    <div className="pb-5">
      <Header title={data?.name ?? ''} isBack customMenu={data?.is_owner && <StoreDetailMenu storeId={id} />} />
      <div className="pt-20 min-w-sm md:w-md m-auto">
        <div className="flex items-center gap-2 mb-4 px-4">
          <Avatar size={40} avatarUrl={data?.owner.avatar} />

          <div className="text-body leading-body flex w-full justify-between">
            <div>
              <span className="text-black">{data?.owner.username}</span>
              <div className="flex items-center gap-1 text-slate-S400">
                <p aria-label="username">{data?.owner.username}</p>
                <span>﹒</span>
                <p>{formatTimeAgo(data?.created_at)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <IconWrapper
                onClick={onBooking}
                icon={
                  <IoHeartSharp aria-label="booking-icon" size={18} color={data?.is_liked ? '#FF5F5F' : '#C8C9DF'} />
                }
              />
              <IconWrapper onClick={onShare} icon={<IoShareSocialOutline size={18} aria-label="share-icon" />} />
            </div>
          </div>
        </div>

        <div className="w-full h-[22.5rem] md:min-h-[48rem] bg-slate-400 relative">
          {data?.store_photo && data?.store_photo.length > 0 ? (
            <ImageSlider images={data.store_photo.map((photo) => photo)} />
          ) : (
            <div className="absolute w-full h-full" data-testid="detail-no-photo" />
          )}
        </div>

        <div className="border-b border-b-slate-S200 px-4 flex flex-col gap-4 pb-4">
          <div className="flex flex-col mt-4">
            <StoreDetailSubtitle title={data?.name ?? ''} />

            <button
              aria-label="city-copy-button"
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => copyToClipboard(data?.city ?? '')}
            >
              <span className="text-label leading-label text-primary-P300 font-semibold max-w-[200px] ">
                {data?.city}
              </span>
              <IoCopy size={14} color="#2D47DB" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <IoHomeSharp color="#565978" />
              <p className="text-system-S300 font-bold">{translateKindMenu(data?.kind_menu)}</p>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlinePets color="#565978" />
              <p>애완동물</p>
              <span className={cls(data?.pet_friendly ? 'text-system-S300' : 'text-system-S200', 'font-bold')}>
                {data?.pet_friendly ? ' 가능' : '불가능'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <StoreDetailSubtitle title="설명" />
            <p className="text-body leading-body">{data?.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            <StoreDetailSubtitle
              title={`평점 (${data?.total_rating === 'No Ratings' ? '없음' : data?.total_rating})`}
            />
            <RatingList ratingList={ratingList} />
          </div>

          <div>
            <StoreDetailSubtitle title="위치" />
            <Link
              href={`https://map.naver.com/v5/search/${data?.city}`}
              className="flex items-center gap-1 mb-2"
              target="_blank"
            >
              <p className="text-label leading-label text-system-S500 font-semibold mt-0.5">네이버 지도에서 보기</p>
              <IoArrowForward size={14} color="#00A007" />
            </Link>
            <Maps address={data?.city} />
          </div>
        </div>

        <div className="my-4 px-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <StoreDetailSubtitle title="리뷰" />
            <button aria-label="reviewForm-button" onClick={onReviewForm} className="flex items-center gap-1 p-2">
              <IoPencilSharp color="#2D47DB" />
              <span className="text-subtitle leading-subtitle text-primary-P300 ">리뷰 쓰기</span>
            </button>
          </div>
          <ReviewList storeId={id} />
        </div>
      </div>

      <LoginModal isOpen={loginModal.isVisible} onCloseModal={loginModal.hide} />
      <AlertModal isOpen={modal.isVisible} close={modal.hide} type="error" backUrl="/" />
    </div>
  );
}
