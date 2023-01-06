import * as d3 from 'd3'
import { select } from 'd3'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useD3 } from '../../utils/hooks/useD3'
// import { useSportSeeApi } from '../../utils/hooks/SportSeeApi'
// import CustomTooltip from '../CustomTooltip/index.js'; // à finir
import colors from '../../utils/style/colors.js'

export default function Barchart({ data }) {
  const svgRef = useRef()
  const wrapperRef = useD3(svgRef, data, (dimensions) => {
    const svg = select(svgRef.current)
    console.log('userData', data);
    //  console.log(dimensions)

    if (!dimensions) return

    const margin = { top: 30, right: 30, bottom: 70, left: 50 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    // List of groups = activities here = value of the first column called group -> I show them on the X axis
    const groups = d3.map(data?.activity?.sessions, function(d){return(d.group)}).keys()

    // Add X axis
    const xAxis = d3.scaleBand()
        .domain(groups)
        .range([margin.left, width + margin.right ])
        .padding([0.6])
    svg.append("g")
      //send the xAxis to the bottom of the chart
      .attr("transform",`translate(${0},${height})`)
      .attr("stroke-opacity", 0)
      //.tickSize(0) hide ticks and .tickFormat starts the x Scale @ 1
      .call(d3.axisBottom(xAxis)
        .tickSize(5)
        .tickFormat(function(d) { return d + 1; }))

    // // x1Scale is used to build the x axis
    // const extent = d3.extent(data?.activity?.sessions?.map((d) => d.day))
    // const x_Scale = d3
    //   .scaleLinear()
    //   .domain(extent)
    //   .range([margin.left, width - margin.right])

    // const xAxis = d3
    //   .axisBottom(x_Scale)
    //   .tickSize(0)
    //   .tickPadding(margin.bottom)
    //   .ticks(7)

    // // append it to the svg and position it on the bottom with transform attribute
    // svg
    //   .append('g')
    //   .call(xAxis)
    //   .attr('transform', `translate(0, ${height - margin.top})`)
    //   .attr('font-size', '1rem')
    //   .select('path')
    //   .attr('transform', 'scale(1.03) translate(-11,0)')
    //  .select('.domain').remove();

    // Axe vertical
    //calculating the min and max value of our data element
    const minY = d3.min(data?.activity?.sessions, (d) => d.kilogram)
    const maxY = d3.max(data?.activity?.sessions, (d) => d.kilogram)

    //create y scale, to build the y axis of the kilogram data
    const yScale = d3.scaleLinear()
      .domain([minY, maxY])
      .range([0, height ]) //- margin.bottom

    //create the y axis
    const yAxis = d3.axisRight(yScale)

    //append it to the first svg
    //position it on the right with transfrom attribute
    svg.select('g')
      .call(yAxis)
     .attr('opacity', '0')

    //create a second y scale on each we will use for the calories data
    const y2Scale = d3.scaleLinear()
      .domain([minY, maxY])
      .range([0, height - margin.bottom])

    const y2Axis = d3.axisRight(y2Scale)

    //append it on the svg element
    svg.select('g')
      .call(y2Axis)
      .attr('opacity', '0.3')

    //create the yscale that will hold values as shown on the mock 
    const y3Scale = d3.scaleLinear()
      .domain([minY, maxY])
      .range([height - margin.bottom, 0])

    const y3Axis = d3.axisRight(y3Scale)
      .ticks(2)
      .tickSize(margin.right-width)
      .tickPadding(10)

    svg
      .select('g')
      .attr('transform', `translate(${width + margin.right}, ${margin.left})`)
      .call(y3Axis)
      .attr('opacity', '0.3')
      .attr("stroke-dasharray","4")

    // svg.select('.x-axis').call(xAxis)
    // svg.select('.y-axis').call(yAxis)
    // svg.select('.y-axis').call(y2Axis)

    svg
      .select('.plot-area')
      .selectAll('.bar')
      .data(data?.activity?.sessions)
      .enter()
      .append('rect')
      .style('margin-left', '0')
      .attr('width', (d) => 7)
      .attr('height', (d) => y2Scale(d.calories))
      .attr('x', (d, i) => i * (width / data?.activity?.sessions.length + 14)) // + 14
      .attr('y', (d) => height - margin.bottom - y2Scale(d.calories))
      // .attr('rx', '2')
      .attr('class', 'bars')
      .attr('fill', `${colors.redChartBg}`)

    svg
      .select('.plot-area')
      .selectAll('.bar')
      .data(data?.activity?.sessions)
      .enter()
      .append('rect')
      .attr('width', (d) => 7) //scale it with the xscale
      .attr('height', (d) => yScale(d.kilogram))
      .attr('x', (d, i) => i * (width / data?.activity?.sessions.length)) //positioning our kilobars on the x axis
      .attr('y', (d) => height - margin.bottom - yScale(d.kilogram)) //vertical coordinate
      // .attr('rx', '2')
      .style('padding', '2px')
      .style('margin', '35px')
      .attr('class', 'bars')
      .attr('fill', `${colors.darkChartBg}`)
    // .attr('fill', (d,i) => color(i * d.kilogram));
  })

//   return (
//     <div ref={wrapperRef}>
//       <Title>Activité quotidienne</Title>
//       <svg ref={svgRef} style={{ height: '18rem', width: '100%' }}>
//         <g className="plot-area" />
//         <g className="x-axis" />
//         <g className="y-axis" />
//         <g className="y2-axis" />
//       </svg>
//     </div>
//   )
// }

return (
    <div ref={wrapperRef}>
    <Head>
      <Title>Activité quotidienne</Title>
      <Legend>
					<Info>
						<Icon color='#282D30' />
						<Text>Poids (kg)</Text>
					</Info>
					<Info>
						<Icon color='#E60000' />
						<Text>Calories brûlées (kCal)</Text>
					</Info>
				</Legend>
      </Head>
      <svg ref={svgRef} style={{ height: '18rem', width: '100%' }}> 
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="y2-axis" />
      </svg>
    </div>
  )
}

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    margin-right: 1.5rem;
	`

const Title= styled.h2`
    font-size: 18px;
    line-height: 24px;
    color: #20253A;
    @media (max-width: 968px) {
      font-size: 15px;
    }
`

const Text = styled.p`
	font-weight: 500;
	font-size: 14px;
	color: #74798c;
	margin-left: 10px;
`

const Icon = styled.div`
	height: 8px;
	width: 8px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	align-self: center;
	margin-left: 30px;
`

const Legend = styled.div`
	display: flex;
`

const Info = styled.div`
    display: flex;
    align-items:center;
`