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

    const margin = { top: 30, right: 30, bottom: 70, left: 50 }

    // Graduations Axe horizontal

    //x1Scale is used to build the x axis
    const extent = d3.extent(data?.activity?.sessions?.map((d) => d.day))
    const x_Scale = d3
      .scaleLinear()
      .domain(extent)
      .range([margin.left, dimensions.width - margin.right])

    const xAxis = d3
      .axisBottom(x_Scale)
      .tickSize(0)
      .tickPadding(margin.bottom)
      .ticks(7)

    //append it to the svg and position it on the bottom with transform attribute
    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${dimensions.height - margin.top})`)
      .attr('font-size', '1rem')
      .select('path')
      .attr('transform', 'scale(1.03) translate(-11,0)')
    // .select('.domain').remove();

    // Axe vertical
    //calculating the min and max value of our data element
    const minY = d3.min(data?.activity?.sessions, (d) => d.kilogram)
    const maxY = d3.max(data?.activity?.sessions, (d) => d.kilogram)

    //create y scale, to build the y axis of the kilogram data
    const yScale = d3
      .scaleLinear()
      .domain([minY - 2, maxY + 25])
      .range([0, dimensions.height - margin.bottom])

    //create the y axis
    const yAxis = d3.axisRight(yScale)

    //append it to the first svg
    //position it on the right with transfrom attribute
    svg.select('g').call(yAxis).attr('opacity', '0')

    //create a second y scale on each we will use for the calories data
    const y2Scale = d3
      .scaleLinear()
      .domain([0, 700])
      .range([0, dimensions.height - margin.bottom])

    const y2Axis = d3.axisRight(y2Scale)

    //append it on the svg element
    svg.select('g').call(y2Axis).attr('opacity', '0')

    //create the yscale that will hold values as shown on the mock
    const y3Scale = d3
      .scaleLinear()
      .domain([69, 71])
      .range([dimensions.height - margin.bottom, 100])

    const y3Axis = d3
      .axisRight(y3Scale)
      .ticks(2)
      .tickSize(-dimensions.width)
      .tickPadding(10)

    svg
      .select('g')
      .attr('transform', `translate(${dimensions.width - margin.right}, 0)`)
      .call(y3Axis)
      .attr('opacity', '0.3')

    svg.select('.x-axis').call(xAxis)
    svg.select('.y-axis').call(yAxis)
    svg.select('.y-axis').call(y2Axis)

    svg
      .select('.plot-area')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .style('margin-left', '20px')
      .attr('width', (d) => 7)
      .attr('height', (d) => y2Scale(d.calories))
      .attr('x', (d, i) => i * (dimensions.width / data.length) + 14)
      .attr('y', (d) => dimensions.height - margin.bottom - y2Scale(d.calories))
      .attr('rx', '2')
      .attr('class', 'bars')
      .attr('fill', `${colors.redChartBg}`)

    svg
      .select('.plot-area')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', (d) => 7) //scale it with the xscale
      .attr('height', (d) => yScale(d.kilogram))
      .attr('x', (d, i) => i * (dimensions.width / data.length)) //positioning our kilobars on the x axis
      .attr('y', (d) => dimensions.height - margin.bottom - yScale(d.kilogram)) //vertical coordinate
      .attr('rx', '2')
      .style('padding', '2px')
      .style('margin', '35px')
      .attr('class', 'bars')
      .attr('fill', `${colors.darkChartBg}`)
    // .attr('fill', (d,i) => color(i * d.kilogram));
  })

  return (
    <div ref={wrapperRef}>
      <Title>Activité quotidienne</Title>
      <svg ref={svgRef} style={{ height: '18rem', width: '100%' }}>
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="y2-axis" />
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
