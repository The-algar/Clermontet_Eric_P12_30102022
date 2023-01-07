import React from "react"
import * as d3 from "d3"
import { useD3 } from "../../utils/hooks/useD3"
import styled from 'styled-components'

const BarChartWrapper = styled.div`
width:100%;
display:flex wrap;
align-content:column;
height: 100vh;
`

export default function Barchart({data}){
    const ref = useD3 (
        (svg ) => {
            // const height = 400;
            // const width = 500;
            const heightValue = 320;
            const widthValue = 835;
            const margin = { top: 20, right: 50, bottom: 90, left: 30 };

            const x = d3.scaleBand()
                        .domain(data.map((d) => d.year))
                        .rangeRound([margin.left, widthValue - margin.right])
                        .padding(0.1);

            const y1 = d3.scaleLinear()
                        .domain([0, d3.max(data, (d) => d.sales)])
                        .rangeRound([heightValue - margin.bottom, margin.top]);

                const xAxis = (g) =>
                                      g.attr("transform", `translate(0,${heightValue - margin.bottom})`).call(
                                        d3.axisBottom(x)
                                            .tickValues(
                                                d3.ticks(...d3.extent(x.domain()), widthValue / 40)
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
        [data]
    )
    return (
        <React.Fragment>
            <BarChartWrapper>
            <div style={{ marginTop: "10px", marginRight: "10px", marginLeft: "20px", background: "none"}}>Activité quotidienne</div>
            <svg ref={ref}
                style={{ height: "100vh", width: "100vw", marginRight: "10px", marginLeft: "20px", background: "none"}}>
                <g className="plot-area" />
                <g className="x-axis" />
                <g className="y-axis" /> 
            </svg>
            </BarChartWrapper>
        </React.Fragment>
    )
}