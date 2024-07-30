import render from '@/utils/test/render';
import StoreList from '../stores/StoreList';
import { screen, within } from '@testing-library/dom';
import storeData from '../../../src/server/response/stores.json';
import { translateKindMenu } from '@/utils/translateToKorean';
import { KindMenu } from '@/types/domain/stores';

const routerPush = jest.fn();
const routerReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: routerPush,
      replace: routerReplace,
    };
  },
}));

it('스토어 리스트의 아이템 항목과 상세페이지로 이동하는 올바른 링크가 제대로 표시된다.', async () => {
  await render(<StoreList />);

  const storeItems = await screen.findAllByRole('link');
  expect(storeItems).toHaveLength(10);

  storeItems.forEach((el, index) => {
    const storeItem = within(el);
    const item = storeData[index];

    expect(storeItem.getByText(item.name)).toBeInTheDocument();
    expect(storeItem.getByText(item.city)).toBeInTheDocument();
    expect(storeItem.getByText(translateKindMenu(item.kind_menu as KindMenu))).toBeInTheDocument();
    expect(el).toHaveAttribute('href', `/store/${item.pk}`);
  });
});

it('카테고리를 전체를 클릭한 경우, 스토어 종류가 모두 나온다.', async () => {
  const { user } = await render(<StoreList />);
  const [all, food, cafe] = await screen.findAllByTestId('storeList-tab');

  await user.click(all);

  const storeItems = await screen.findAllByRole('link');
  storeItems.forEach((el, index) => {
    const storeItem = within(el);
    const item = storeData[index];
    expect(storeItem.getByText(translateKindMenu(item.kind_menu as KindMenu))).toBeInTheDocument();
  });
});

it('카테고리를 음식을 클릭한 경우, 스토어 종류 타입이 음식으로 나온다.', async () => {
  const { user } = await render(<StoreList />);
  const [all, food, cafe] = await screen.findAllByTestId('storeList-tab');

  await user.click(food);

  const storeItems = await screen.findAllByRole('link');

  storeItems.forEach((el) => {
    const storeItem = within(el);
    expect(storeItem.getByText('상점')).toBeInTheDocument();
    expect(storeItem.queryByText('기타')).not.toBeInTheDocument();
    expect(storeItem.queryByText('카페')).not.toBeInTheDocument();
  });
});

it('카테고리를 카페을 클릭한 경우, 스토어 종류 타입이 카페로 나온다.', async () => {
  const { user } = await render(<StoreList />);
  const [all, food, cafe] = await screen.findAllByTestId('storeList-tab');

  await user.click(cafe);

  const storeItems = await screen.findAllByRole('link');

  storeItems.forEach((el) => {
    const storeItem = within(el);
    expect(storeItem.getByText('카페')).toBeInTheDocument();
    expect(storeItem.queryByText('상점')).not.toBeInTheDocument();
    expect(storeItem.queryByText('기타')).not.toBeInTheDocument();
  });
});
