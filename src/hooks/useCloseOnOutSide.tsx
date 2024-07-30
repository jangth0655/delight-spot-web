import { RefObject, useCallback, useEffect } from 'react';

type Args = {
  onClose: () => void;
  excludeRefs: RefObject<HTMLElement>[];
};

export const useCloseOnOutSideClick = ({ onClose, excludeRefs = [] }: Args) => {
  const handleBackgroundClick = useCallback(
    (event: MouseEvent): void => {
      const isInsideRefs = excludeRefs.some((ref) => ref.current?.contains(event.target as Node));

      if (!isInsideRefs) {
        onClose();
      }
    },
    [onClose, excludeRefs]
  );

  useEffect(() => {
    window.addEventListener('click', handleBackgroundClick);

    return () => {
      window.removeEventListener('click', handleBackgroundClick);
    };
  }, [handleBackgroundClick]);
};
