import { useEffect, useState } from "react";

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  rootMargin: "0px",
  threshold: 1,
};

export default function useIntersection(
  id: string,
  options?: IntersectionObserverInit
) {
  const [viewed, setViewed] = useState(false);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const mergedOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setViewed(true);
          setIntersecting(true);
        } else {
          setIntersecting(false);
        }
      });
    }, mergedOptions);

    const target = document.getElementById(id);

    if (target !== null) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [id, options]);

  return { viewed, intersecting };
}
