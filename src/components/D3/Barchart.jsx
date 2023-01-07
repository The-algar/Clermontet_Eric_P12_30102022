import React, { useState, useEffect, useRef} from "react"
import * as d3 from "d3"
import { select } from "d3"
import styled from 'styled-components'
import { useD3 } from "../../utils/hooks/useD3"


// import { GlobalStyles } from "../../utils/GlobalStyle"
/*
const useResizeObserver = (ref) => {
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
};*/

export default function Barchart({data}) {
    const svgRef = useRef();
    

    const wrapperRef = useD3(svgRef, data,  (dimensions) => {
      const svg = select(svgRef.current)
      console.log(dimensions)

      if(!dimensions) return;

          const margin = { top: 30, right: 30, bottom: 70, left: 50 }

          const x = d3.scaleBand()
                      .domain(data.map((d) => d.year))
                      .rangeRound([margin.left, dimensions.width - margin.right])
                      .padding(0.1);

          const y1 = d3.scaleLinear()
                      .domain([0, d3.max(data, (d) => d.sales)])
                      .rangeRound([dimensions.height - margin.bottom, margin.top]);

              const xAxis = (g) =>
                                    g.attr("transform", `translate(0,${dimensions.height - margin.bottom})`).call(
                                      d3.axisBottom(x)
                                          .tickValues(
                                              d3.ticks(...d3.extent(x.domain()), dimensions.width / 40)
                                              .filter((v) => x(v) !== undefined)
                                          ).tickSizeOuter(0)
      
              );
          
              const y1Axis = (g) =>
                      g.attr("transform", `translate(${margin.left},0)`)
                      .style("color", "steelblue")
                      .call(d3.axisLeft(y1).ticks(null, "s"))
                              .call((g) => g.select(".domain").remove())
                              .call((g) => g.append("text").attr("x", -margin.left)
                                                          .attr("y", 10)
                                                          .attr("fill", "currentColor")
                                                          .attr("text-anchor", "start")
                                              .text(data.y1));
      
              svg.select(".x-axis").call(xAxis);
              svg.select(".y-axis").call(y1Axis);

              svg.select(".plot-area")
                  .attr("fill", "steelblue")
                  .selectAll(".bar")
                  .data(data)
                  .join("rect")
                  .attr("class", "bar")
                  .attr("x", (d) => x(d.year))
                  .attr("width", x.bandwidth())
                  .attr("y", (d) => y1(d.sales))
                  .attr("height", (d) => y1(0) - y1(d.sales));
      });

    // will be called initially and on everydata change
    /*useEffect(() => {
        const svg = select(svgRef.current)
        console.log(dimensions)

        if(!dimensions) return;

            const margin = { top: 30, right: 30, bottom: 70, left: 50 }

            const x = d3.scaleBand()
                        .domain(data.map((d) => d.year))
                        .rangeRound([margin.left, dimensions.width - margin.right])
                        .padding(0.1);

            const y1 = d3.scaleLinear()
                        .domain([0, d3.max(data, (d) => d.sales)])
                        .rangeRound([dimensions.height - margin.bottom, margin.top]);

                const xAxis = (g) =>
                                      g.attr("transform", `translate(0,${dimensions.height - margin.bottom})`).call(
                                        d3.axisBottom(x)
                                            .tickValues(
                                                d3.ticks(...d3.extent(x.domain()), dimensions.width / 40)
                                                .filter((v) => x(v) !== undefined)
                                            ).tickSizeOuter(0)
        
                );
            
                const y1Axis = (g) =>
                        g.attr("transform", `translate(${margin.left},0)`)
                        .style("color", "steelblue")
                        .call(d3.axisLeft(y1).ticks(null, "s"))
                                .call((g) => g.select(".domain").remove())
                                .call((g) => g.append("text").attr("x", -margin.left)
                                                            .attr("y", 10)
                                                            .attr("fill", "currentColor")
                                                            .attr("text-anchor", "start")
                                                .text(data.y1));
        
                svg.select(".x-axis").call(xAxis);
                svg.select(".y-axis").call(y1Axis);

                svg.select(".plot-area")
                    .attr("fill", "steelblue")
                    .selectAll(".bar")
                    .data(data)
                    .join("rect")
                    .attr("class", "bar")
                    .attr("x", (d) => x(d.year))
                    .attr("width", x.bandwidth())
                    .attr("y", (d) => y1(d.sales))
                    .attr("height", (d) => y1(0) - y1(d.sales));
        },
        [data, data.lenght, dimensions]
    )*/
    return (
        <div ref={wrapperRef}>
            {/* <div style={{ marginTop: "10px", marginRight: "10px", marginLeft: "20px", background: "none"}}>Activité quotidienne</div> */}
            <Title>Activité quotidienne</Title>
            <svg ref={svgRef} style={{ height: "18rem", width: "100%"}}> 
            {/* <svg ref={svgRef}>  */}
                <g className="plot-area" />
                <g className="x-axis" />
                <g className="y-axis" /> 
            </svg>
        </div>
    )
}

const Title = styled.h1`
    font-size: 24px;
    margin: 10px 10px 0 20px;
    background: none;
    @media (max-width: 768px) {
        font-size: 18px;
    }
`