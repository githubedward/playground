import { useCallback, useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseIntersectionObserverParams {
  onIntersect: () => void;
  enabled: boolean;
  options?: UseIntersectionObserverOptions;
  dependencies?: React.DependencyList;
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled,
  options = { rootMargin: "0px" },
  dependencies = [],
}: UseIntersectionObserverParams) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && enabled) {
        onIntersect();
      }
    },
    [onIntersect, enabled],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options);

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection, ...dependencies]);

  return targetRef;
};
