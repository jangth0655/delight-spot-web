import render from '@/utils/test/render';
import Divider from '../Divider';
import { screen } from '@testing-library/dom';

it('size가 sm일 경우 className이 h-[0.0625rem]로 나타난다.', async () => {
  await render(<Divider type="sm" />);
  expect(screen.getByTestId('divider')).toHaveClass('h-[0.0625rem]');
});

it('size가 md일 경우 className이 h-[0.25rem]로 나타난다.', async () => {
  await render(<Divider type="md" />);
  expect(screen.getByTestId('divider')).toHaveClass('h-[0.25rem]');
});

it('size가 lg일 경우 className이 h-[0.5rem]로 나타난다.', async () => {
  await render(<Divider type="lg" />);
  expect(screen.getByTestId('divider')).toHaveClass('h-[0.5rem]');
});
