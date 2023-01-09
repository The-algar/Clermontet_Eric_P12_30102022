import { useState, useEffect } from "react"

/**
 * Hook to get the width of the page, for doing responsive
 * 
 * @name resizeObserver
 * @returns {number} the viewport actual width and height
 * @function
 */

export const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};