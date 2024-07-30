import { act, renderHook } from '@testing-library/react';
import { useModal } from '../useModal';

it('초기 모달의 상태는 false이다.', () => {
  const { result } = renderHook(useModal);
  expect(result.current.isVisible).toBe(false);
});

it('show()를 호출하게 되면 isVisible은 true가된다.', () => {
  const { result } = renderHook(useModal);
  act(() => {
    result.current.show();
  });

  expect(result.current.isVisible).toBe(true);
});

it('hide()를 호출하게 되면 isVisible은 false가된다.', () => {
  const { result } = renderHook(useModal);
  act(() => {
    result.current.hide();
  });
  expect(result.current.isVisible).toBe(false);
});

it('toggle()를 호출하게 되면 isVisible은 기존 상태와 반대의 boolean값이 된다.', () => {
  const { result } = renderHook(useModal);
  act(() => {
    result.current.toggle();
  });
  expect(result.current.isVisible).toBe(true);
});
