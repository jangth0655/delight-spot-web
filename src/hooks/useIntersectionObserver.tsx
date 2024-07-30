import { RefObject, useEffect, useState } from 'react';

interface IntersectionCustomOptions {
  node: HTMLElement | null;
  options?: {
    root: null;
    rootMargin: '0px';
    threshold: 0.1;
  };
}

function useIntersectionObserver({ node, options }: IntersectionCustomOptions) {
  const [isInterSecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => setIsIntersecting(entry.isIntersecting));
    }, options);

    if (node) {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
    };
  }, [options, node]);

  return {
    isInterSecting,
  };
}

export { useIntersectionObserver };
