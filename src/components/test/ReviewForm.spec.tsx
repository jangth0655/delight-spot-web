import { mockUseLoginStore } from '@/utils/test/mockZustandStore';
import { server } from '../../../jest.setup';
import { rest } from 'msw';
import userInfo from '@/server/response/users.json';
import render from '@/utils/test/render';
import ReviewForm from '../stores/review/ReviewForm';
import { screen } from '@testing-library/dom';

const routerReplaceFn = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: routerReplaceFn,
    };
  },
}));

beforeEach(() => {
  mockUseLoginStore({ token: 'mock-accessToken' });
  server.use(
    rest.get('api/v1/users/me', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(userInfo));
    })
  );
});

it('이미지를 업로드하면 업로드한 이미지가 노출된다.', async () => {
  const { user } = await render(<ReviewForm storeId={15} />);
  const uploadInput = screen.getByLabelText('upload-image');
  const file = new File(['dummy content'], 'example.png', { type: 'image/*' });
  await user.upload(uploadInput, file);
  const uploadPhoto = await screen.findByAltText('Upload Image');
  expect(uploadPhoto).toBeInTheDocument();
});

it('star 아이콘을 클릭하여 평점을 주면 star 아이콘은 올바른 클래스(text-yellow-500)를 갖는다.', async () => {
  const { user } = await render(<ReviewForm storeId={15} />);
  const tastingStarThreeScore = screen.getByLabelText('taste_rating-3-score');
  await user.click(tastingStarThreeScore);

  expect(tastingStarThreeScore.firstChild).toHaveClass('text-yellow-500');

  const tastingStarOneScore = screen.getByLabelText('taste_rating-1-score');
  const tastingStarTwoScore = screen.getByLabelText('taste_rating-2-score');
  expect(tastingStarOneScore.firstChild).toHaveClass('text-yellow-500');
  expect(tastingStarTwoScore.firstChild).toHaveClass('text-yellow-500');

  const tastingStarFourScore = screen.getByLabelText('taste_rating-4-score');
  const tastingStarFiveScore = screen.getByLabelText('taste_rating-5-score');
  expect(tastingStarFourScore.firstChild).toHaveClass('text-gray-300');
  expect(tastingStarFiveScore.firstChild).toHaveClass('text-gray-300');
});

it('내용을 입력하면 텍스트가 올바르게 노출된다.', async () => {
  const { user } = await render(<ReviewForm storeId={15} />);
  const textarea = screen.getByRole('textbox');
  await user.type(textarea, 'test');
  expect(textarea).toHaveValue('test');
});

it('내용을 입력하지 않으면 게시 버튼은 비활성화 된다.', async () => {
  await render(<ReviewForm storeId={15} />);
  const submitButton = screen.getByText('게시');
  expect(submitButton).toBeDisabled();
});

it('필수 항목인 내용만 입력하면 리뷰 작성을 완료되며, 스토어러 이동한다.', async () => {
  const { user } = await render(<ReviewForm storeId={15} />);
  const textarea = screen.getByRole('textbox');
  await user.type(textarea, 'test');
  expect(textarea).toHaveValue('test');

  const submitButton = screen.getByText('게시');
  await user.click(submitButton);
  expect(routerReplaceFn).toHaveBeenNthCalledWith(1, '/store/15');
});
