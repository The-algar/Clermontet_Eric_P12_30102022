import * as d3 from 'd3'
import { select } from 'd3'
import { useRef } from 'react'
// import styled from 'styled-components'
import { useD3 } from '../../utils/hooks/useD3'
import PropTypes from 'prop-types'

/**
 * A Linear chart showing the user average sessions. 
 * Filled by D3.js.
 * @name LinearChart
 * @param {Object} props - props component
 * @param {Array<Object>} props.data - user average sessions data
 * @param {number} props.dimensions.height - responsive height of svg container
 * @returns {ReactElement} a Linear Chart
 * @component
 */

export default function LineChart({ data }) {
  const svgRef = useRef()
  const wrapperRef = useD3(svgRef, data, (dimensions) => {

     console.log('userData', data);
    // console.log(dimensions)

    if (!dimensions) return

// set margins of the graph
  const margin = { top: 10, right: 30, bottom: 10, left: 30 };
//   width = 800 - margin.left - margin.right,
//   height = 320 - margin.top - margin.bottom;

/** The trick here is to build two X scales. 
 * The first is called x and is for groups. It is used to build the axis. 
 * The second is called xSubgroup and allows to adjust the position for each subgroup in the group.
 */
  
// append the svg object to the body of the page
	const svg = select(svgRef.current)
	.append("svg")
		.attr("width", dimensions.width + margin.left + margin.right)
		.attr("height", dimensions.height + margin.top + margin.bottom)
	.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")")
		.style('background-color', '#FF0000')
		.style('border-radius', '5px')

		// add a title
		svg.append('text')
			.attr('fill', '#fff')
			.attr('x', margin.right)
			.attr('y', margin.top)
			.text('Durée moyenne des sessions')
			.style('font-size', '1rem')
		// X axis
		const x_Scale = d3
			.scaleLinear()
			.domain([0, 6])
			.range([margin.left, dimensions.width + margin.right])

		const tickLabels = data.map(d => d.day)
		const x_Axis = d3
			.axisBottom(x_Scale)
			.tickSize(0)
			.tickPadding(10)
			.ticks(7)
			.tickFormat((d, i) => tickLabels[i].substring(0,1))
		const y_Scale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.sessionLength)])
			.range([dimensions.height, margin.top + margin.bottom])

		svg.append('g')
			.call(x_Axis)
			.attr('color', '#fff')
			.attr('transform', `translate(0, ${dimensions.height + margin.top - 10})`)
			.attr('font-size', '1rem')
			.select('.domain')
			.remove()

		//path
		const line = d3
			.line()
			.x((d) => x_Scale(tickLabels.indexOf(d.day)))
			.y((d) => y_Scale(d.sessionLength))
			.curve(d3.curveMonotoneX)

		const path = svg
			.append('path')
			.attr('d', line(data))
			.attr('stroke', '#fff')
			.attr('stroke-width', 2)
			.attr('fill', 'none')

		// animation
		const pathLength = path.node().getTotalLength()
		path.attr('stroke-dashoffset', pathLength)
			.attr('stroke-dasharray', pathLength)
			.transition()
			.duration(1500)
			.attr('stroke-dashoffset', 0)
			.ease(d3.easeSin)

		//tooltips
		data.forEach((coordinates, index) => {
			let group = svg.append('g').attr('id', 'day' + index + 'average')
			group
				.append('rect')
				.attr('x', x_Scale(index))
				.attr('y', 0)
				.attr('width', '100%')
				.attr('height', dimensions.height + margin.top + margin.bottom)
				.attr('fill', 'rgba(0, 0, 0, 0.1)')
				.attr('opacity', '0')
			group
				.append('rect')
				.attr('x', displayTooltip(index))
				.attr('y', y_Scale(data[index].sessionLength) - 25)
				.attr('width', 50)
				.attr('height', 20)
				.attr('fill', '#fff')
				.attr('opacity', '0')
			group
				.append('text')
				.attr('x', displayTooltip(index) + 25)
				.attr('y', y_Scale(data[index].sessionLength) - 10)
				.style('text-anchor', 'middle')
				.attr('fill', 'black')
				.text(data[index].sessionLength + 'min')
				.attr('opacity', '0')
			group
				.append('circle')
				.attr('fill', '#fff')
				.attr('cx', x_Scale(index))
				.attr('cy', y_Scale(data[index].sessionLength))
				.attr('r', 4)
				.attr('opacity', '0')
			group
				.append('circle')
				.classed('low-opacity-circle', true)
				.attr('fill', '#fff')
				.attr('cx', x_Scale(index))
				.attr('cy', y_Scale(data[index].sessionLength))
				.attr('r', 10)
				.attr('opacity', '0')
			// hover area
			svg.append('rect')
				.attr('x', x_Scale(index))
				.attr('y', 0)
				.attr('width', dimensions.width / 7)
				.attr('height', 300)
				.attr('fill', 'transparent')
				.attr('opacity', '1')
				// make it appear on hover + make the infos appears
				.on('mouseover', function () {
					d3.selectAll(`#day${index}average > *`)
						.transition()
						.attr('opacity', '1')
					d3.selectAll(`#day${index}average > .low-opacity-circle`)
						.transition()
						.attr('opacity', '.3')
				})
				.on('mouseout', function () {
					d3.selectAll(`#day${index}average > *`)
						.transition()
						.attr('opacity', '0')
				})
		})
		// Just to be sure a tooltip don't go outside the chart
		function displayTooltip(index) {
			if (x_Scale(index) <= dimensions.width - margin.left - margin.right)
				return x_Scale(index)
			else return x_Scale(index) - margin.left - margin.right
		}
	})

	return (
    <div ref={wrapperRef}>
      <svg ref={svgRef} style={{ height: '18rem', width: '100%' }}>
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="y2-axis" />
      </svg>
    </div>
  )
}

const data_shape_prop = {
	day: PropTypes.string.isRequired, 
	sessionLength: PropTypes.number.isRequired,
}

LineChart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape(data_shape_prop)).isRequired,
	height: PropTypes.number,
}
