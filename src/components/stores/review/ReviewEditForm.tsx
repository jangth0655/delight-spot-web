'use client';

import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Header from '@/components/header/Header';
import UploadPhoto from '../UploadPhoto';
import Divider from '@/components/Divider';
import UploadPhotoList from '@/components/UploadPhotoList';
import ReviewRating from './ReviewRating';
import TextArea from '@/components/TextArea';
import LoginModal from '@/components/modal/LoginModal';
import AlertModal from '@/components/modal/AlertModal';

import { cls } from '@/utils/cls';
import { useGetMyReview, useUpdateReview } from '@/hooks/queries/useReviews';
import { RatingTitle } from '@/types/domain/stores';

type ReviewEditForm = {
  text: string;
};

interface Props {
  reviewId: number;
  storeId: number;
}

export default function ReviewEditForm({ reviewId, storeId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ReviewEditForm>();

  const { isLoggedIn, userInfo } = useUser();
  const loginModal = useModal();
  const errorModal = useModal();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<RatingTitle, number>>({
    taste_rating: 0,
    atmosphere_rating: 0,
    kindness_rating: 0,
    clean_rating: 0,
    parking_rating: 0,
    restroom_rating: 0,
  });

  const {
    data: review,
    isError: isMyReviewError,
    isPending: isGetMyReviewPending,
  } = useGetMyReview({ reviewId, username: userInfo?.name });

  const { mutate: updateReview, isPending } = useUpdateReview(
    { reviewId, storeId },
    {
      onError: () => {
        errorModal.show();
      },
    }
  );

  useEffect(() => {
    if (isMyReviewError) errorModal.show();
  }, [errorModal, isMyReviewError]);

  useEffect(() => {
    if (review) {
      setValue('text', review.description);
      setRatings({
        atmosphere_rating: review.atmosphere_rating,
        clean_rating: review.clean_rating,
        kindness_rating: review.kindness_rating,
        parking_rating: review.parking_rating,
        restroom_rating: review.restroom_rating,
        taste_rating: review.taste_rating,
      });
      setFileUrls([...review.review_photo]);
    }
  }, [review, setValue]);

  const onSetFileUrls = (fileUrl: string) => {
    if (fileUrls.length > 5) return;
    setFileUrls((prev) => [...prev, fileUrl]);
  };

  const onDeleteFileUrls = (fileUrl: string) => {
    setFileUrls((prev) => prev.filter((url) => url !== fileUrl));
  };

  const handleRatingChange = (key: string, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [key]: value,
    }));
  };

  const disabled = !getValues('text');

  const onSubmit = ({ text }: ReviewEditForm) => {
    if (isPending || isMyReviewError || isGetMyReviewPending) return;
    if (!userInfo?.username) return;
    if (!isLoggedIn) return loginModal.show();
    updateReview({
      description: text,
      username: userInfo.username,
      review_photo: fileUrls,
      ...ratings,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="수정"
          isBack
          customButton={
            <div>
              <Button title="수정" type="submit" disabled={disabled} />
            </div>
          }
        />
        <div className="pt-20 px-4">
          <UploadPhoto onSetFileUrls={onSetFileUrls} />

          <div className="my-4">
            <Divider type="sm" />
          </div>

          <div>
            <UploadPhotoList fileUrls={fileUrls} onDeleteFileUrls={onDeleteFileUrls} />
          </div>

          <div className="my-10">
            <ReviewRating onRatingChange={handleRatingChange} ratings={ratings} />
          </div>

          <div>
            <p
              className={cls(
                errors.text?.message ? 'border-b border-b-system-S200' : '',
                'text-h4 leading-h4 font-bold inline-block'
              )}
            >
              내용을 입력해 주세요.
            </p>
            <TextArea
              register={register('text', {
                required: {
                  message: '입력해주세요.',
                  value: true,
                },
              })}
            />
          </div>

          <LoginModal isOpen={loginModal.isVisible} onCloseModal={loginModal.hide} />
          <AlertModal
            close={errorModal.hide}
            isOpen={errorModal.isVisible}
            type="error"
            backUrl={`/store/${storeId}`}
          />
        </div>
      </form>
    </>
  );
}
