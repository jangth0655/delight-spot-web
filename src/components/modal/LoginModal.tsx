'use client';

import Button from '../Button';
import ModalWrapper from './ModalWrapper';
import { IoChatbubbleSharp } from 'react-icons/io5';

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
}

export default function LoginModal({ isOpen, onCloseModal }: Props) {
  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
    });
  };

  return (
    isOpen && (
      <ModalWrapper>
        <h1 className="text-h4 font-bold leading-h4">로그인이 필요해요.</h1>
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={kakaoLogin}
            className="gap-2 bg-[#FEE500] py-4 w-full flex items-center justify-center rounded-xl h-14"
          >
            <IoChatbubbleSharp color="#000000" />
            <span className="text-black text-subtitle leading-subtitle font-bold">카카오로 로그인하기</span>
          </button>
          <Button onClick={onCloseModal} title="닫기" size="lg" />
        </div>
      </ModalWrapper>
    )
  );
}
