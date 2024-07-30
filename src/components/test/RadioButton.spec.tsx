import render from '@/utils/test/render';
import RadioButton from '../RadioButton';
import { screen } from '@testing-library/dom';

it('checked가 false일경우', async () => {
  await render(<RadioButton checked={false} />);
  expect(screen.getByTestId('outer-circle')).toHaveClass('bg-transparent');
  expect(screen.queryByTestId('inner-circle')).not.toBeInTheDocument();
});

it('checked가 true일 경우', async () => {
  await render(<RadioButton checked />);
  expect(screen.getByTestId('outer-circle')).toHaveClass('bg-primary-P200');
  expect(screen.getByTestId('inner-circle')).toBeInTheDocument();
});
