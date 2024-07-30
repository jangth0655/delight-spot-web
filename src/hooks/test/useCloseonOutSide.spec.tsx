import { act, renderHook } from '@testing-library/react';
import { useCloseOnOutSideClick } from '../useCloseOnOutSide';

it('excludeRefs 외부를 클릭 했을 경우 onClose함수가 호출되어야 한다.', () => {
  const onClose = jest.fn();
  renderHook(() => useCloseOnOutSideClick({ onClose, excludeRefs: [] }));

  // 외부 document 클릭 이벤트 발생
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);

  expect(onClose).toHaveBeenCalledTimes(1);
});

it('excludeRef에 포함된 요소를 클릭 했을 경우 onClose는 호출되면 안된다.', () => {
  const onClose = jest.fn();
  const excludeRef = { current: document.createElement('div') };
  renderHook(() => useCloseOnOutSideClick({ onClose, excludeRefs: [excludeRef] }));

  excludeRef.current.click();

  expect(onClose).not.toHaveBeenCalled();
});
