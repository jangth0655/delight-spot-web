import { screen } from '@testing-library/react';
import render from '@/utils/test/render';
import { useForm } from 'react-hook-form';
import Input from '../Input';

const TestInput = () => {
  const { register } = useForm();

  return <Input register={register('testInput')} />;
};

it('기본으로 설정된 width와 height로 렌더링되는지 확인', async () => {
  render(<Input />);

  const input = screen.getByRole('textbox');

  expect(input).toBeInTheDocument();
  expect(input).toHaveStyle({ width: '100%' });
});

it('커스텀 너비와 높이를 반영', () => {
  render(<Input width="200px" height="50px" />);

  const input = screen.getByRole('textbox');
  expect(input).toHaveStyle({ width: '200px', height: '50px' });
});

it('isError를 props로 전달 받았을 경우 className border-system-S100 적용', () => {
  render(<Input isError />);

  const input = screen.getByRole('textbox');
  expect(input).toHaveClass('border-system-S100');
});

it('register로 설정된 name이 input에 올바르게 설정되었는지 확인 후 사용자가 입력한 값을 표시', async () => {
  const { user } = await render(<TestInput />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveAttribute('name', 'testInput');
  await user.type(input, 'test value');
  expect(input).toHaveValue('test value');
});
