import render from '@/utils/test/render';
import LimitBookingStoreList from '../mypage/LimitBookingStoreList';
import { screen, within } from '@testing-library/dom';
import bookingList from '../../server/response/bookings.json';

const routerPush = jest.fn();
const routerReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: routerPush,
      replace: routerReplace,
    };
  },
}));

it('북킹 스토어의 제목이 제대로 표시된다.', async () => {
  await render(<LimitBookingStoreList deleteBookingStore={() => {}} bookingStores={bookingList[0].store} />);
  const storeItems = await screen.findAllByTestId('bookingStoreList-li');
  expect(storeItems).toHaveLength(3);

  storeItems.forEach((el, index) => {
    const storeItem = within(el);
    const item = bookingList[0].store[index];

    expect(storeItem.getByText(item.name.length > 8 ? `${item.name.slice(0, 8)}...` : item.name));
  });
});

it('더보기 링크 "/my/bookings"가 올바르게 설정되었다.', async () => {
  await render(<LimitBookingStoreList deleteBookingStore={() => {}} bookingStores={bookingList[0].store} />);
  const moreLink = await screen.findByText('더보기');
  expect(moreLink).toBeInTheDocument();
  expect(moreLink).toHaveAttribute('href', '/my/bookings');
});

it('취소 버튼을 누르면 useToggleBooking의 북킹 스토어를 제거하는 deleteBooking가 호출된다.', async () => {
  const deleteStoreMutate = jest.fn();
  const { user } = await render(
    <LimitBookingStoreList deleteBookingStore={deleteStoreMutate} bookingStores={bookingList[0].store} />
  );

  const [firstDeleteButton] = await screen.findAllByRole('button', { name: '취소' });
  expect(firstDeleteButton).toBeInTheDocument();

  await user.click(firstDeleteButton);
  expect(deleteStoreMutate).toHaveBeenCalled();
});
