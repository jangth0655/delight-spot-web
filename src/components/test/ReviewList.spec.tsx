import render from '@/utils/test/render';
import ReviewList from '../stores/review/ReviewList';
import reviewData from '@/server/response/reviews.json';
import { screen, within } from '@testing-library/dom';
import { formatRating } from '@/utils/formatNumber';
import { mockUseLoginStore } from '@/utils/test/mockZustandStore';
import { server } from '../../../jest.setup';
import { rest } from 'msw';
import userInfo from '@/server/response/users.json';

const routerPushFn = jest.fn();
const routerReplaceFn = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: routerPushFn,
      replace: routerReplaceFn,
    };
  },
}));

describe('기본 리뷰 항목', () => {
  it('리뷰 항목들이 제대로 노출된다.', async () => {
    await render(<ReviewList storeId={15} />);
    const reviewItems = await screen.findAllByLabelText('reviewItem');
    expect(reviewItems).toHaveLength(3);

    reviewItems.forEach((el, index) => {
      const wrapper = within(el);
      const reviewItem = reviewData[index];

      expect(wrapper.getByText(reviewItem.user.username)).toBeInTheDocument();
      expect(wrapper.getByText(formatRating(reviewItem.total_rating))).toBeInTheDocument();
      expect(wrapper.getByText(reviewItem.description)).toBeInTheDocument();

      if (reviewItem.user.avatar) {
        const img = wrapper.queryByAltText('avatar');
        expect(img).toBeInTheDocument();
      } else {
        const icon = wrapper.queryByLabelText('noneAvatarIcon');
        expect(icon).toBeInTheDocument();
      }

      if (reviewItem.review_photo.length > 0) {
        const reviewImg = wrapper.queryAllByAltText('review_image');
        expect(reviewImg[0]).toBeInTheDocument();
      }
    });
  });
});

describe('로그인한 경우', () => {
  beforeEach(() => {
    mockUseLoginStore({ token: 'mock-accessToken' });
    server.use(
      rest.get('api/v1/users/me', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(userInfo));
      })
    );
  });

  it('내가 작성한 리뷰는 더보기 아이콘이 노출되며 클릭하면 "수정", "삭제" 버튼이 노출된다.', async () => {
    const { user } = await render(<ReviewList storeId={15} />);
    const reviewItems = await screen.findAllByLabelText('reviewItem');
    for (const el of reviewItems) {
      const wrapper = within(el);
      const reviewItem = reviewData[reviewItems.indexOf(el)];
      const isOwner = userInfo.pk === reviewItem.user.pk;

      if (isOwner) {
        const moreView = wrapper.getByLabelText('icon-wrapper');
        expect(moreView).toBeInTheDocument();
        await user.click(moreView);
        expect(wrapper.getByText('수정')).toBeInTheDocument();
        expect(wrapper.getByText('삭제')).toBeInTheDocument();
      }
    }
  });

  it('더보기 팝업의 수정을 클릭하면 수정페이지로 이동한다.', async () => {
    const { user } = await render(<ReviewList storeId={15} />);
    const reviewItems = await screen.findAllByLabelText('reviewItem');

    for (const el of reviewItems) {
      const wrapper = within(el);
      const reviewItem = reviewData[reviewItems.indexOf(el)];
      const isOwner = userInfo.pk === reviewItem.user.pk;

      if (isOwner) {
        const moreView = wrapper.getByLabelText('icon-wrapper');
        expect(moreView).toBeInTheDocument();
        await user.click(moreView);
        const editButton = screen.getByText('수정');

        expect(editButton).toBeInTheDocument();

        await user.click(editButton);
        expect(routerPushFn).toHaveBeenCalledWith(`/store/15/review/edit/${reviewItem.pk}`);
      }
    }
  });

  it('더보기 팝업의 삭제를 클릭하면 해당 리뷰는 노출되지 않는다.', async () => {
    const { user } = await render(<ReviewList storeId={15} />);
    const reviewItems = await screen.findAllByLabelText('reviewItem');

    for (const el of reviewItems) {
      const wrapper = within(el);
      const reviewItem = reviewData[reviewItems.indexOf(el)];
      const isOwner = userInfo.pk === reviewItem.user.pk;

      if (isOwner) {
        const moreView = wrapper.getByLabelText('icon-wrapper');
        expect(moreView).toBeInTheDocument();
        await user.click(moreView);
        const deleteButton = screen.getByText('삭제');
        expect(deleteButton).toBeInTheDocument();

        await user.click(deleteButton);
      }
    }
  });
});
