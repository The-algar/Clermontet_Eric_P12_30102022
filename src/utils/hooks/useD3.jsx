import React, { useEffect, useRef} from "react"
import * as d3 from 'd3';
import { useResizeObserver } from "../../utils/hooks/resizeObserver"

export const useD3 = (svgRef, data, renderChartFn) => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
      renderChartFn(dimensions, d3.select(svgRef.current));
      return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, data.length, dimensions]);

  return wrapperRef;
}