import { useEffect, useRef } from 'react';

export function useVideoIntersection(
  index: number,
  onActive: (index: number) => void,
  threshold = 0.6
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            onActive(index);
          }
        });
      },
      {
        threshold: [0, threshold, 1],
        root: null,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [index, onActive, threshold]);

  return ref;
}
