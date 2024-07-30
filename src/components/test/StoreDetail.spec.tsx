import { rest } from 'msw';
import { server } from '../../../jest.setup';
import userInfo from '@/server/response/users.json';
import { mockUseLoginStore } from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';
import StoreDetailInfo from '../stores/StoreDetailInfo';
import { screen } from '@testing-library/react';
import mockStoreDetailData from '@/server/response/storeDetail.json';
import { copyToClipboard } from '@/utils/copyText';

const routerPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: routerPush,
    };
  },
}));

jest.mock('../Map.tsx', () => {
  return function MockMap({ address }: { address: string }) {
    return <div aria-label="mock-map">{address}</div>;
  };
});

jest.mock('../../utils/copyText.ts', () => ({
  copyToClipboard: jest.fn(),
}));

it('스토어 상세 데이터가 노출된다.', async () => {
  await render(<StoreDetailInfo id={13} />);
  expect(await screen.findByText(mockStoreDetailData.description)).toBeInTheDocument();
  const [detailData, _] = await screen.findAllByText(mockStoreDetailData.city);
  expect(detailData).toBeInTheDocument();
  expect(await screen.findByText('불가능')).toBeInTheDocument();
  const [firstImg, secondImg] = await screen.findAllByRole('img');
  expect(firstImg).toBeInTheDocument();
  expect(secondImg).toBeInTheDocument();
});

describe('로그인 했을 경우', () => {
  beforeEach(() => {
    mockUseLoginStore({ token: 'mock-accessToken' });
    server.use(
      rest.get('api/v1/users/me', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(userInfo));
      })
    );
  });

  it('북마크가 true라면 북마크 표시를 확인할 수 있다.', async () => {
    const { user } = await render(<StoreDetailInfo id={13} />);
    const [bookingIconWrapper] = screen.getAllByLabelText('icon-wrapper');
    const bookingIcon = screen.getByLabelText('booking-icon');
    await user.click(bookingIconWrapper);
    expect(bookingIcon).toHaveStyle({ color: '#FF5F5F' });
    expect(bookingIcon).not.toHaveStyle({ color: '#C8C9DF' });
  });

  it('리뷰쓰기를 클릭하면 리뷰작성 페이지로 이동한다.', async () => {
    const { user } = await render(<StoreDetailInfo id={13} />);
    const reviewWriteButton = screen.getByLabelText('reviewForm-button');
    await user.click(reviewWriteButton);
    expect(routerPush).toHaveBeenCalled();
  });
});

describe('비로그인일 경우', () => {
  it('비로그인 유저는 북마크를 클릭하면 로그인 모달창을 노출한다.', async () => {
    const { user } = await render(<StoreDetailInfo id={13} />);
    const [bookingIconWrapper] = screen.getAllByLabelText('icon-wrapper');
    await user.click(bookingIconWrapper);
    const modalTitle = screen.getByText('로그인이 필요해요.');

    expect(modalTitle).toBeInTheDocument();
  });

  it('비로그인 유저는 리뷰쓰기를 클릭 했을 때 로그인 모달창을 노출한다.', async () => {
    const { user } = await render(<StoreDetailInfo id={13} />);
    const reviewWriteButton = screen.getByLabelText('reviewForm-button');
    await user.click(reviewWriteButton);
    const modalTitle = screen.getByText('로그인이 필요해요.');

    expect(modalTitle).toBeInTheDocument();
  });

  it('비로그인 상태에서도 도시 이름을 클릭하면 copyToClipboard 함수가 호출된다.', async () => {
    const { user } = await render(<StoreDetailInfo id={13} />);
    const cityCopyButton = screen.getByLabelText('city-copy-button');
    await user.click(cityCopyButton);
    expect(copyToClipboard).toHaveBeenNthCalledWith(1, mockStoreDetailData.city);
  });
});

jest.mock('../modal/AlertModal.tsx', () => {
  return function MockAlertModal({ isOpen, close }: { isOpen: boolean; close: () => void }) {
    return isOpen && <button aria-label="error-modal" onClick={close} />;
  };
});

describe('상세 데이터 통신 에러', () => {
  beforeEach(() => {
    server.use(
      rest.get('/api/v1/stores/:id', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'error' }));
      })
    );
  });
  it('에러가 발생하면 AlertModal을 보여준다.', async () => {
    await render(<StoreDetailInfo id={13} />);
    const errorModal = await screen.findByLabelText('error-modal');
    expect(errorModal).toBeInTheDocument();
  });
});
