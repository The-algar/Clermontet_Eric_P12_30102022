import { useEffect, useRef} from "react"
import { select} from 'd3';
import { useResizeObserver } from "../../utils/hooks/resizeObserver"

export const useD3 = (svgRef, data, renderChartFn) => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
      renderChartFn(dimensions, select(svgRef.current));
      return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, dimensions]);

  return wrapperRef;
}