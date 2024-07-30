import render from '@/utils/test/render';
import BottomModal from '../modal/BottomModal';
import { screen } from '@testing-library/dom';

const TestBottomModalChildren = () => {
  return <h1>BottomModal Children</h1>;
};

it('모달이 열릴 때 children이 노출된다.', async () => {
  await render(
    <BottomModal isOpen onClose={() => {}}>
      <TestBottomModalChildren />
    </BottomModal>
  );

  expect(screen.getByText('BottomModal Children')).toBeInTheDocument();
});

it('title을 노출한다.', async () => {
  await render(
    <BottomModal isOpen title="test-title" onClose={() => {}}>
      <TestBottomModalChildren />
    </BottomModal>
  );

  expect(screen.getByText('test-title')).toBeInTheDocument();
});

it('close button을 클릭하면 모달이 닫힌다.', async () => {
  const mockCloseButton = jest.fn();
  const { user } = await render(
    <BottomModal isOpen title="test-title" onClose={mockCloseButton}>
      <TestBottomModalChildren />
    </BottomModal>
  );

  await user.click(screen.getByRole('button'));

  expect(mockCloseButton).toHaveBeenCalled();
});

it('모달이 닫히면 children을 볼 수 없다.', async () => {
  await render(
    <BottomModal isOpen={false} onClose={() => {}}>
      <TestBottomModalChildren />
    </BottomModal>
  );

  expect(screen.queryByText('BottomModal Children')).not.toBeInTheDocument();
});
