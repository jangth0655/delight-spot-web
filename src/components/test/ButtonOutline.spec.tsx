import render from '@/utils/test/render';
import ButtonOutline from '../ButtonOutline';
import { screen } from '@testing-library/dom';

it('title이 제대로 나타나는지 검증', async () => {
  await render(<ButtonOutline title="test" />);
  expect(screen.getByText('test')).toBeInTheDocument();
});
it('sm size를 설정할 경우 className h-8 py-1이 등록됨', async () => {
  await render(<ButtonOutline title="test" size="sm" />);
  expect(screen.getByRole('button')).toHaveClass('h-8 py-1');
});
it('md size를 설정할 경우 className h-10 py-2이 등록됨', async () => {
  await render(<ButtonOutline title="test" size="md" />);
  expect(screen.getByRole('button')).toHaveClass('h-10 py-2');
});
it('lg size를 설정할 경우 className h-14 py-4이 등록됨', async () => {
  await render(<ButtonOutline title="test" size="lg" />);
  expect(screen.getByRole('button')).toHaveClass('h-14 py-4');
});
