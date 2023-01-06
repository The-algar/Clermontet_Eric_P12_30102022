import * as d3 from 'd3'
import { select } from 'd3'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useD3 } from '../../utils/hooks/useD3'
// import PropTypes from 'prop-types'
// import { useSportSeeApi } from '../../utils/hooks/SportSeeApi'
// import CustomTooltip from '../CustomTooltip/index.js'; // à finir
// import colors from '../../utils/style/colors.js'

/**
 * A Bar chart showing the user weight and calories burned. 
 * Filled by D3.js.
 * @name BarChart
 * @param {Array<Object>} data - data mocked or Api
 * @returns {ReactElement} a Bar Chart
 * @component
 */

export default function Barchart({ data }) {
  const svgRef = useRef()
  const wrapperRef = useD3(svgRef, data, (dimensions) => {

    console.log('userData', data);
    // console.log(dimensions)

    if (!dimensions) return

/** The trick here is to build two X scales. 
 * The first is called x and is for groups. It is used to build the axis. 
 * The second is called xSubgroup and allows to adjust the position for each subgroup in the group.
 */

// set margins of the graph
  const margin = { top: 10, right: 30, bottom: 10, left: 30 },
  width = 800 - margin.left - margin.right,
  height = 320 - margin.top - margin.bottom;

  
// append the svg object to the body of the page
  const svg = select(svgRef.current)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // // List of subgroups = header of the data files = days condition here
  //   const subgroups = data?.activity?.sessions.columns.slice(2)

  // List of groups = activities here = value of the first column called group -> I show them on the X axis
    const groups = d3.map(data?.activity?.sessions, function(d){return(d.group)}).keys()

  // Add X axis
    const xAxis = d3.scaleBand()
        .domain(groups)
        .range([margin.left, width - margin.right])
        .padding([0.6])
    svg.append("g")
      //send the xAxis to the bottom of the chart
      .attr("transform", `translate(-25, ${height})`)
      .attr("opacity","1")
      // .tickSize(0) hide ticks and .tickFormat starts the x Scale @ 1
      .call(d3.axisBottom(xAxis).tickSize(0).tickFormat(function(d) { return d + 1; }));

    // Axe vertical   
    //calculating the min and max value of our data element
    const minY = d3.min(data?.activity.sessions, (d) => d.kilogram)
    const maxY = d3.max(data?.activity.sessions, (d) => d.kilogram)

  // Add Y axis
    const yAxis = d3.scaleLinear()
      .domain([minY, maxY])
      .range([height, 0]);
    svg.append("g")
      .attr("transform", `translate(${width},0)`)
      .attr("opacity","0.6")
      .call(d3.axisRight(yAxis)
        .tickSize(-width + margin.left + margin.right))
        .attr("stroke-dasharray","2")
        .attr("line","0");

  // // Another scale for subgroup position
  // const xSubgroup = d3.scaleBand()
  //   .domain(subgroups)
  //   .range([0, xAxis.bandwidth()])
  //   .padding([0.5])

  // // color palette = one color per subgroup
  // const color = d3.scaleOrdinal()
  //   .domain(subgroups)
  //   .range(['#e41a1c','#377eb8'])
  
  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data?.activity?.sessions)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + xAxis(d.group) + ",0)"; })
    .selectAll("rect")
    // .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      // .attr("xAxis", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return yAxis(d.value); })
      // .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - yAxis(d.value); })
      // .attr("fill", function(d) { return color(d.key); });

  // //x_Scale is used to build the x axis
  //   const extent = d3.extent(data?.activity?.sessions.map((d) => d.day))
  //   const x_Scale = d3
  //     .scaleLinear()
  //     .domain(extent)
  //     .range([margin.left, width - margin.right])

    // const xAxis = d3
    //   .axisBottom(x)
    //   .tickSize(5)
    //   // .tickPadding(margin.bottom)
    //   .ticks(10)
    //   //append it to the svg and position it on the bottom with transform attribute
    // svg
    //   .append('g')
    //   .call(xAxis)
    //   // .attr("transform", "translate(0,5)")
    //   .attr("transform", "translate(0,200)")
    //   .attr('font-size', '1rem')
    //   .select('path')
      // .attr('transform', 'translate(-11,0)')
    //  .select('.domain').remove();

  //   // Axe vertical   
  //   //calculating the min and max value of our data element
  //   const minY = d3.min(data?.activity.sessions, (d) => d.kilogram)
  //   const maxY = d3.max(data?.activity.sessions, (d) => d.kilogram)

    // //create y scale, to build the y axis of the kilogram data
    // const yScale = d3
    //   .scaleLinear()
    //   .domain([minY - 2, maxY + 25])
    //   .range([0, height - margin.bottom])

    // //create the y axis
    // const y_Axis = d3.axisRight(yScale)

    // //append it to the first svg
    // //position it on the right with transfrom attribute
    // svg.select('g').call(y_Axis).attr('opacity', '0')

    // //create a second y scale on each we will use for the calories data
    // const y2Scale = d3
    //   .scaleLinear()
    //   .domain([0, 700])
    //   .range([0, height - margin.bottom])
    //   // .select('.domain').remove()

    // const y2Axis = d3.axisRight(y2Scale)

    // //append it on the svg element
    // svg.select('g').call(y2Axis).attr('opacity', '0')

    //create the yscale that will hold values as shown on the mock
    // const y3Scale = d3
    //   .scaleLinear()
    //   .domain([69, 71])
    //   .range([height - margin.bottom, 100])

    // const y3Axis = d3
    //   .axisRight(y3Scale)
    //   .ticks(2)
    //   .tickSize(-width)
    //   .tickPadding(10)

  //   svg
  //     .select('g')
  //     .attr('transform', `translate(${width - margin.right}, 0)`)
  //     .call(y3Axis)
  //     .attr('opacity', '0.3')

  //   svg.select('.x-axis').call(xAxis)
  //   svg.select('.y-axis').call(yAxis)
  //   svg.select('.y-axis').call(y2Axis)

    // svg
    //   .select('.plot-area')
    //   .selectAll('.bar')
    //   .data(data)
    //   .enter()
    //   .append('rect')
    //   .style('margin-left', '20px')
    //   .attr('width', (d) => 7)
    //   .attr('height', (d) => y2Scale(d.calories))
    //   .attr('x', (d, i) => i * (width / data?.activity.sessions.length) + 14)
    //   .attr('y', (d) => height - margin.bottom - y2Scale(d.calories))
    //   .attr('rx', '2')
    //   .attr('class', 'bars')
    //   .attr('fill', `${colors.redChartBg}`)

    // svg
    //   .select('.plot-area')
    //   .selectAll('.bar')
    //   .data(data?.activity.sessions)
    //   .enter()
    //   .append('rect')
    //   .attr('width', (d) => 7) //scale it with the xscale
    //   .attr('height', (d) => yScale(d.kilogram))
    //   .attr('x', (d, i) => i * (width / data?.activity.sessions.length)) //positioning our kilobars on the x axis
    //   .attr('y', (d) => height - margin.bottom - yScale(d.kilogram)) //vertical coordinate
    //   .attr('rx', '2')
    //   .style('padding', '2px')
    //   .style('margin', '35px')
      // .attr('class', 'bars')
      // .attr('fill', `${colors.primary}`)
    // .attr('fill', (d,i) => color(i * d.kilogram));
  })

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
      <svg ref={svgRef} style={{ height: '100%', width: '100%' }}> 
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
    margin-right: 0;
    padding-left: 1rem;
    padding-right: 1rem;
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