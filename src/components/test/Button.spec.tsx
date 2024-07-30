import render from '@/utils/test/render';
import Button from '../Button';
import { screen } from '@testing-library/dom';

it('title이 제대로 나타나는지 검증', async () => {
  await render(<Button title="test" />);
  expect(screen.getByText('test')).toBeInTheDocument();
});

it('sm size를 설정할 경우 className h-8 py-1이 등록됨', async () => {
  await render(<Button title="test" size="sm" />);
  expect(screen.getByRole('button')).toHaveClass('h-8 py-1');
});
it('md size를 설정할 경우 className h-10 py-2이 등록됨', async () => {
  await render(<Button title="test" size="md" />);
  expect(screen.getByRole('button')).toHaveClass('h-10 py-2');
});
it('lg size를 설정할 경우 className h-14 py-4이 등록됨', async () => {
  await render(<Button title="test" size="lg" />);
  expect(screen.getByRole('button')).toHaveClass('h-14 py-4');
});

it('disabled일 경우 className은 text-slate-S500로 등록되고 버튼이 비활성화 됨', async () => {
  await render(<Button title="test" disabled />);
  expect(screen.getByRole('button')).toHaveClass('text-slate-S500');
  expect(screen.getByRole('button')).toBeDisabled();
});

it('버튼이 활성화되었는지 확인하고 활성화된 경우 className은 bg-primary-P300로 등록', async () => {
  await render(<Button title="test" />);
  expect(screen.getByRole('button')).not.toBeDisabled();
  expect(screen.getByRole('button')).toHaveClass('bg-primary-P300');
});
