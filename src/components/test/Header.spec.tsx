import render from '@/utils/test/render';
import Header from '../header/Header';
import HeaderMenu from '../HeaderMenu';
import { screen } from '@testing-library/dom';

const routerPush = jest.fn();
const routerBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: routerPush,
      back: routerBack,
    };
  },
}));

it('커스텀 타이틀을 설정하면 노출된다.', async () => {
  await render(<Header title="STORE LIST" />);
  expect(screen.getByText('STORE LIST')).toBeInTheDocument();
});

it('헤더의 메뉴 버튼을 클릭하면 customMenu로 전달한 다양한 메뉴를 확인할 수 있다.', async () => {
  const { user } = await render(<Header customMenu={<HeaderMenu />} title="" />);

  await user.click(screen.getByLabelText('menu-button'));
  expect(screen.getByText('공지사항')).toBeInTheDocument();
  expect(screen.getByText('마이페이지')).toBeInTheDocument();
});

it('isBack을 props로 전달하지 않으면 back-icon을 노출하지 않는다.', async () => {
  await render(<Header title="TEST" />);
  expect(screen.queryByLabelText('back-icon')).not.toBeInTheDocument();
});

it('isBack을 props로 받을 경우 back-icon을 노출하고, back-icon을 클릭하면 전 페이지로 이동한다.', async () => {
  const { user } = await render(<Header title="TEST" isBack />);
  const backIcon = screen.getByLabelText('back-icon');
  expect(backIcon).toBeInTheDocument();

  await user.click(backIcon);
  expect(routerBack).toHaveBeenCalled();
});

it('isBack과 backUrl을 전달 받으면, back-icon을 노출하고 클릭하면 전달받은 url로 이동한다.', async () => {
  const { user } = await render(<Header title="" backUrl="/url" isBack />);
  const backIcon = screen.getByLabelText('back-icon');
  expect(backIcon).toBeInTheDocument();
  await user.click(backIcon);
  expect(routerPush).toHaveBeenNthCalledWith(1, '/url');
});

it('customButton을 받으면 menu-button는 노출되지 않고 customButton이 노출된다.', async () => {
  await render(<Header title="" customButton={<button>custom-button</button>} />);
  expect(screen.getByRole('button', { name: 'custom-button' })).toBeInTheDocument();
  expect(screen.queryByLabelText('menu-button')).not.toBeInTheDocument();
});
