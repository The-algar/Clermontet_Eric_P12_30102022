import * as d3 from 'd3'
import { select } from 'd3'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useD3 } from '../../utils/hooks/useD3'
// import colors from '../../utils/style/colors.js'

export default function LineChart({ data }) {
  const svgRef = useRef()
  const wrapperRef = useD3(svgRef, data, (dimensions) => {
    
    console.log('userData', data);
    //  console.log(dimensions)

    if (!dimensions) return

    const margin = { top: 30, left: 20, bottom: 30, right: 20 };
    // const width = (dimensions.width -margin.left -margin.right);
    // const height = (dimensions.height -margin.top -margin.bottom);
    const widthSvg = parseInt(d3.select(svgRef.current).style('width') ) - margin.left - margin.right
		const heightSvg = parseInt(d3.select(svgRef.current).style('height')) - margin.top - margin.bottom
		
	
    const dayInitMaj = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    console.log('dayInitMaj :', dayInitMaj)

	// append the svg object to the body of the page
    const svg = select(svgRef.current)
    .append("svg")
    .classed('wrapperRef-svg', true)
    .attr("width", widthSvg + margin.left + margin.right)
    .attr("height", heightSvg + margin.top + margin.bottom)

    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top}/2)`)
    .style('background-color', '#FF0000')
    .style('border-radius', '5px');

		// add a title
		svg.append('text')
			.attr('fill', '#fff')
			.attr('x', margin.right)
			.attr('y', margin.top)
			.text('Durée moyenne des sessions')
			.style('font-size', '1rem')
      .style('font-weight', '700')

		// X axis
		const x = d3.scaleBand()
			.domain(data?.average?.sessions.map(d => d.day)) //d => dayInitMaj[d.day]
			.range([0, widthSvg])
      // .padding([0.5])
		svg.append("g")
    //send the x Axis to the bottom of the chart
    .attr("transform",`translate(${margin.left}, ${heightSvg +margin.bottom})`)
		.call(d3.axisBottom(x).tickSize(0).tickFormat((value, dayInitMaj) => dayInitMaj)
      .tickPadding([8]) ) 
			.attr("stroke-width", 0)
			.style("color", "rgba(255, 255, 255)")
			.style("font-weight", "500") 
			.style("font-size","12px")

		 //Add Y Axis ( not visible)
          const y = d3.scaleLinear()
            .domain(d3.extent(data?.average?.sessions, function(d){return d.sessionLength}))
            .range([margin.top, heightSvg +margin.top +margin.bottom ]);
          svg.append("g")
            .call(d3.axisLeft(y).ticks(0)).attr("stroke-width",0)

           // Add the line
          svg.append("path")
            .datum(data?.average?.sessions)
            .attr("fill", "none")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .curve(d3.curveCardinal)
              .x(function(d) { return x(d.day)*2 })
              .y(function(d) { return y(d.sessionLength)/2 })
              )
			  

           // Add The points
          svg.append("g")
            .selectAll("dot")
            .data(data?.average?.sessions)
            .enter()
            .append("circle")
            .attr("class","tooltipBasic")
            .attr("cx", function(d) { return x(d.day) })
            .attr("cy", function(d) { return y(d.sessionLength)})
            .attr("r", 6)
            .attr("fill", "none")
            .style("pointer-events","all")
	});       

  return (
    <Wrapper ref={wrapperRef} style={{ height: '100%', width: '100%',backgroundColor: '#FF0000', borderRadius: '5px'}}>
    {/* // <div ref={wrapperRef}>  */}
      <svg ref={svgRef}> 
      </svg>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    // padding-bottom: 100%;
    vertical-align: top;
    overflow: hidden;
    background: #FBFBFB;
    border-radius: 5px;
`
const lineChartSvg = styled.div`
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
`
