'use client';

import { useForm } from 'react-hook-form';
import { useUser } from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';
import { useCreateReviews } from '@/hooks/queries/useReviews';
import { useState } from 'react';

import Button from '../../Button';
import LoginModal from '../../modal/LoginModal';
import AlertModal from '../../modal/AlertModal';
import Header from '../../header/Header';
import UploadPhoto from '../UploadPhoto';
import UploadPhotoList from '../../UploadPhotoList';
import Divider from '../../Divider';
import ReviewRating from './ReviewRating';
import TextArea from '@/components/TextArea';

import { cls } from '@/utils/cls';

interface Props {
  storeId: number;
}

type ReviewFormValue = {
  text: string;
};

export default function ReviewForm({ storeId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ReviewFormValue>();
  const { isLoggedIn } = useUser();
  const loginModal = useModal();
  const errorModal = useModal();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [ratings, setRatings] = useState({
    taste_rating: 0,
    atmosphere_rating: 0,
    kindness_rating: 0,
    clean_rating: 0,
    parking_rating: 0,
    restroom_rating: 0,
  });

  const { mutate: reviewMutate, isPending } = useCreateReviews(storeId, {
    onError: (error) => {
      if (error.statusCode === 403 || error.statusCode === 403) {
        return loginModal.show();
      } else {
        errorModal.show();
      }
    },
  });

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

  const onSubmit = ({ text }: ReviewFormValue) => {
    if (!isLoggedIn) return loginModal.show();
    if (isPending || !text) return;
    reviewMutate({
      description: text,
      review_photo: fileUrls,
      ...ratings,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="리뷰 작성"
          isBack
          customButton={
            <div>
              <Button title="게시" type="submit" disabled={!isValid} />
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
          <AlertModal close={errorModal.hide} isOpen={errorModal.isVisible} type="error" />
        </div>
      </form>
    </>
  );
}
