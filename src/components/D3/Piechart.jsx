import * as d3 from 'd3'
import { select } from 'd3'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useD3 } from '../../utils/hooks/useD3'
import PropTypes from 'prop-types'

/**
* A Radial pie chart showing an user score corresponding to the percentage of his weekly target. Filled by D3.js.
* @name KpiChart
* @param {Object} props - props component
* @param {Array<Object>} props.data - user data
* @hook useD3 : hook filtering data, Id and renderChartFn draw the svg of the chart while including responsive dimensions with resize observer
* @function: Draw the svg pie chart
* @param {data: array} : array of object displaying value and type of activity
* @returns {ReactElement} a Radial Chart
* @component
 */

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    // padding-bottom: 100%;
    vertical-align: top;
    overflow: hidden;
    background: #FBFBFB;
    border-radius: 5px;
`
const WrapperRefSvg = styled.div`
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
`
export default function PieChart({ data }) {
  const svgRef = useRef()
  const wrapperRef = useD3(svgRef, data, (dimensions) => {
    
    console.log('userData', data);
    console.log('svgDimensions :', dimensions);

    if (!dimensions) return

    const margin = { top: 20, left: 0, bottom: 20, right: 0 };
    const width = (dimensions.width -margin.left -margin.right); //Width of the radar chart
    const height = (dimensions.height -margin.top -margin.bottom); //height of the radar chart

    // console.log('width :', dimensions.width);
    // console.log('height :', dimensions.height);

    const svg = select(svgRef.current)
    .append("svg")
    .classed(WrapperRefSvg, true)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .attr("preserveAspectRatio", "xMidYMid meet")

    // add a title
    svg.append('text')
    .attr('fill', '#20253A')
    .attr('x', 20)
    .attr('y', 30)
    .text('Score')
    .style('font-size', '1rem')
    .style('font-weight', '700')

    svg.append("circle")
    .attr('transform', `translate(${(width+ margin.left + margin.right) / 2}, ${(height+ margin.top + margin.bottom) / 2})`)
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", height/ 4 + margin.top + margin.bottom) 
    .attr("stroke", "#ffffff")
    .attr("fill", "#ffffff")
    .transition()
    .duration(700)
    // .attr("stroke-width", 8); 

    // const scoreData = [ (data?.user?.todayScore), (data?.user?.score) ];

    //center text
		svg.append("text")
			.attr("fill", "#000")
			.attr("x", width/ 2)
			.attr("y", height/ 2 +margin.top)
			.style("text-anchor", "middle")
			.style("font-size", "1.8rem")
			.style("font-weight", "700")
			.text(`${data?.user?.todayScore*100}%`) //.text(`${data?.user?.score*100}%`)
      // .data(function(d) { return scoreData.map(function(key) { return {key: key, value: d[key]}; }); })
      // .text('text', d => scoreData(d.key))
      
		svg.append("text")
			.attr("fill", "#000")
			.attr("x", width/ 2)
			.attr("y", height/ 1.7 +margin.top)
			.style("font-size", "1.2rem")
			.style("font-weight", "400")
			.style("text-anchor", "middle")
			.text(`de votre`)
		svg.append("text")
			.attr("fill", "#000")
			.attr("x", width/ 2)
			.attr("y", height/ 1.5 +margin.top)
			.style("text-anchor", "middle")
			.style("font-size", "1.2rem")
			.style("font-weight", "400")
			.text(`objectif`)

		//
    const graph = svg.append("g")
			.attr("transform", `translate(${width /2 + margin.right}, ${height /2 + margin.bottom})`)

		const arcPath= d3.arc()
			.outerRadius(100)
			.innerRadius(90)
			.startAngle(0)
			.cornerRadius(8)

    // radial bar
		graph.append("path") 
			.datum({ endAngle: -0.1 })
			.attr("d", arcPath)
			.attr("fill", "#FF0000")
			.transition()
            .duration(750)
            .call(arcTween, data?.user?.todayScore * Math.PI * -2)

		function arcTween(transition, newFinishAngle) {
			transition.attrTween("d", function (d) {
				let interpolateEnd = d3.interpolate(d.endAngle, newFinishAngle)
				return function (t) {
					d.endAngle = interpolateEnd(t)
					return arcPath(d)
				}
			})
		}
    })

    return (
    <Wrapper ref={wrapperRef}>
      <svg ref={svgRef} style={{ height: '100%', width: '100%', backgroundColor: '#FBFBFB', borderRadius: '5px'}}> 
      </svg>
    </Wrapper>
  )
}

PieChart.propTypes = {
	data: PropTypes.number, //.isRequired
	dimensions: PropTypes.number
}