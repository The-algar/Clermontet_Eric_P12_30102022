import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
// import useViewport from '../../utils/Hooks/useViewport'
import PropTypes from 'prop-types'

/**
 * A Radial chart showing an user score corresponding to the percentage of his weekly target. Filled by D3.js.
 * @name RadialChart
 * @param {Object} props - props component
 * @param {Array<Object>} props.data - user data
 * @param {number} props.svgHeight - height of svg container
 * @returns {ReactElement} a Radial Chart
 * @component
 */
export default function RadialChart({ data, svgHeight }) {
	//svg parent ref
	const radialContainerRef = useRef()
	//ref for resize event
	const updateLines = useRef(false)
	//responsive width
	// const { viewportWidth } = useViewport()

	useEffect(() => {
		//if resize remove the previous chart
		updateLines.current
			? d3.select('.radial-chart-svg').remove()
			: (updateLines.current = true)
		DrawChart(data)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]) //viewportWidth

	const margin = { top: 40, left: 30, right: 30, bottom: 20 }

	const DrawChart = () => {
		//dimentions
		const graphWidth = parseInt(d3.select(radialContainerRef.current).style('width')) - margin.left - margin.right
		// create new chart
		const svg = d3.select(radialContainerRef.current)
			.append("svg")
			.classed("radial-chart-svg", true)
			.attr('width', "100%")
			.attr("height", svgHeight)
			.style("background-color", "#F5F7F9")
			.style("border-radius", "5px")
		// add a title
		svg.append('text')
			.attr('fill', '#000')
			.attr('x', margin.left)
			.attr('y', margin.top)
			.text("Score")
			.style("font-size", "1.5rem")
			.style("font-weight", "500")
		//Draw the Circle
		svg.append("circle")
			.attr("transform", `translate(${graphWidth /2 + margin.right}, ${svgHeight /2 + margin.bottom})`)
			// .attr("cx", 0)
			// .attr("cy", 0)
			.attr("r", 90)
			.attr("fill", "#fff");
		//center text
		svg.append("text")
			.attr("fill", "#000")
			.attr("x", "50%")
			.attr("y", "50%")
			.style("text-anchor", "middle")
			.style("font-size", "1.8rem")
			.style("font-weight", "500")
			.text(`${data*100}%`)
		svg.append("text")
			.attr("fill", "#000")
			.attr("x", "50%")
			.attr("y", "62%")
			.style("font-size", "1.2rem")
			.style("font-weight", "400")
			.style("text-anchor", "middle")
			.text(`de votre`)
		svg.append("text")
			.attr("fill", "#000")
			.attr("x", "50%")
			.attr("y", "73%")
			.style("text-anchor", "middle")
			.style("font-size", "1.2rem")
			.style("font-weight", "400")
			.text(`objectif`)
		//
		const graph = svg.append("g")
			.attr("transform", `translate(${graphWidth /2 + margin.right}, ${svgHeight /2 + margin.bottom})`)

		const arcPath= d3.arc()
			.outerRadius(100)
			.innerRadius(90)
			.startAngle(0)
			.cornerRadius(8)

		graph.append("path") 
			.datum({ endAngle: -0.1 })
			.attr("d", arcPath)
			.attr("fill", "#FF0000")
			.transition()
            .duration(750)
            .call(arcTween, data * Math.PI * -2)

		function arcTween(transition, newFinishAngle) {
			transition.attrTween("d", function (d) {
				let interpolateEnd = d3.interpolate(d.endAngle, newFinishAngle)
				return function (t) {
					d.endAngle = interpolateEnd(t)
					return arcPath(d)
				}
			})
		}
	}

	return <div className="radial-chart-container" ref={radialContainerRef}></div>
}

RadialChart.propTypes = {
	data: PropTypes.number.isRequired,
	svgHeight: PropTypes.number,
}
