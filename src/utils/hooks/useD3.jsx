import { useEffect, useRef} from "react"
import * as d3 from 'd3';
import { useResizeObserver } from "../../utils/hooks/resizeObserver"

/**
 * Hook filtering data, Id and renderChartFn draw the svg of the chart while including responsive dimensions with resize observer
 * 
 * @name use3D
 * @returns {userId|data} the data associated to the selected useriD
 * @returns {number} the viewport current width and height
 * @function
*/

export const useD3 = (svgRef, data, renderChartFn) => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
      d3.select(svgRef.current).selectAll('svg').remove()
      renderChartFn(dimensions, d3.select(svgRef.current));
      return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, dimensions]);

  return wrapperRef;
}