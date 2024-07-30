import render from '@/utils/test/render';
import React from 'react';
import LoginModal from '../modal/LoginModal';
import { screen } from '@testing-library/dom';

const mockAuthorize = jest.fn();

beforeAll(() => {
  window.Kakao = {
    Auth: {
      authorize: mockAuthorize,
    },
  };
});

it('모달이 열릴 때 카카오로 로그인하기 버튼이 보이는지 확인한다.', async () => {
  await render(<LoginModal isOpen={true} onCloseModal={() => {}} />);

  const kakaoLoginButton = screen.getByText('카카오로 로그인하기');
  expect(kakaoLoginButton).toBeInTheDocument();
});

it('모달이 열릴 때 닫기 버튼이 보이는지 확인한다.', async () => {
  await render(<LoginModal isOpen={true} onCloseModal={() => {}} />);

  const closeButton = screen.getByText('닫기');
  expect(closeButton).toBeInTheDocument();
});

it('카카오로 로그인하기 버튼을 클릭하면 kakaoLogin 함수가 호출된다.', async () => {
  const { user } = await render(<LoginModal isOpen={true} onCloseModal={() => {}} />);

  const kakaoLoginButton = screen.getByText('카카오로 로그인하기');
  await user.click(kakaoLoginButton);

  expect(mockAuthorize).toHaveBeenCalled();
});

it('닫기 버튼을 클릭하면 onCloseModal 함수가 호출된다.', async () => {
  const mockOnCloseModal = jest.fn();
  const { user } = await render(<LoginModal isOpen={true} onCloseModal={mockOnCloseModal} />);

  const closeButton = screen.getByText('닫기');
  await user.click(closeButton);

  expect(mockOnCloseModal).toHaveBeenCalled();
});

it('모달이 닫혀 있을 때는 카카오로 로그인하기 버튼이 보이지 않는다.', () => {
  render(<LoginModal isOpen={false} onCloseModal={() => {}} />);

  const kakaoLoginButton = screen.queryByText('카카오로 로그인하기');
  expect(kakaoLoginButton).not.toBeInTheDocument();
});
