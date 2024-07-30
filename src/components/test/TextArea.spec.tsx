import { useForm } from 'react-hook-form';
import TextArea from '../TextArea';
import render from '@/utils/test/render';
import { screen } from '@testing-library/dom';

const TestArea = () => {
  const { register } = useForm();

  return <TextArea register={register('textArea')} />;
};

it('register가 올바르게 등록되었는지 확인', async () => {
  const { user, container } = await render(<TestArea />);
  const textArea = screen.getByRole('textbox');
  expect(textArea).toHaveAttribute('name', 'textArea');
  await user.type(textArea, 'textArea');
  expect(textArea).toHaveValue('textArea');
});

it('isError props를 전달 받았을 경우 className에 placeholder:text-system-S200가 존재해야한다.', () => {
  render(<TextArea isError />);
  const textArea = screen.getByRole('textbox');
  expect(textArea).toBeInTheDocument();
  expect(textArea).toHaveClass('placeholder:text-system-S200');
});
