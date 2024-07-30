import { useCallback, useEffect, useState } from 'react';

const useScrollProgress = ({ percentage, px }: { percentage?: number; px?: number }) => {
  const [isScrolledPercentage, setIsScrolledPercentage] = useState(false);
  const [isScrolledPx, setIsScrolledPx] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = (scrollTop / docHeight) * 100;

    // 퍼센티지 기준
    if (percentage && scrolledPercentage >= percentage) {
      setIsScrolledPercentage(true);
    } else {
      setIsScrolledPercentage(false);
    }

    // 픽셀 기준
    if (px && scrollTop >= px) {
      setIsScrolledPx(true);
    } else {
      setIsScrolledPx(false);
    }
  }, [percentage, px]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isScrolledPercentage, isScrolledPx };
};

function useScrollToTop() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return scrollToTop;
}

export { useScrollProgress, useScrollToTop };
