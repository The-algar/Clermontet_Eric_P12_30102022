import * as d3 from 'd3'
import { select } from 'd3'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useD3 } from '../../utils/hooks/useD3'
// import { useSportSeeApi } from '../../utils/hooks/SportSeeApi'
// import CustomTooltip from '../CustomTooltip/index.js'; // à finir
// import colors from '../../utils/style/colors.js'

export default function Barchart({ data }) {
  const svgRef = useRef()
  const wrapperRef = useD3(svgRef, data, (dimensions) => {
    
    console.log('userData', data);
    console.log('svgDimensions :', dimensions);

    if (!dimensions) return

    const margin = { top: 0, right: 30, bottom: 50, left: 50 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = select(svgRef.current)
    .append("svg")
      .classed('barChart-svg', true)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    // // List of subgroups = header of the activity sessions = calories and weight data here
    const subgroups = ['kilogram', 'calories'];

    // List of groups = activities here = value of the first column called group -> I show them on the X axis
    const groups = data?.activity?.sessions.map(d => d.day) //.key() 

    console.log('Data Group:', groups)

    // Add X axis
    const xAxis = d3.scaleBand()
      .domain(groups)
      .range([0, width +margin.left +margin.right])
      .padding([0.5])

    svg.append("g")
      //send the xAxis to the bottom of the chart
      .attr("transform",`translate(0,${height - margin.bottom})`)
      .attr("stroke-opacity", '0.3')
      .attr("stroke-width",'0')
      .style('font-size', '0.75rem')

      .call(d3.axisBottom(xAxis)
      .tickSize(0)
      .tickFormat((value, index) => index + 1)
      .tickPadding([8])
      )

    //calculating the min and max value of our data elements
    const minMaxKg = d3.extent(data?.activity?.sessions, d => d.kilogram)
		const minMaxCal = d3.extent(data?.activity?.sessions, d => d.calories)

    console.log('kilogram:', minMaxKg)
    console.log('calories:', minMaxCal)

    const minY = d3.min(data?.activity?.sessions, d => d.kilogram)
		const maxY = d3.max(data?.activity?.sessions, d => d.calories)

    console.log('kilogram:', minY)
    console.log('calories:', maxY)

    // Axe vertical
    //create y scale, to build the y axis of the group data
    const yScale = d3.scaleLinear()
      .domain( minMaxKg)
      .range([height -margin.bottom -margin.top, 5 ])
    
    //create the y axis
    const formatyAxis = d3.format('~');
    const yAxis = d3.axisRight(yScale)
      .tickFormat(formatyAxis)
      .ticks(3)
      .tickSize(margin.right-width)
      .tickPadding([20])

    //append it to the first svg
    //position it on the right with transform attribute and tcks on the left inside
    svg.append('g')
      .call(yAxis)
      .attr('transform', `translate(${width + margin.left - margin.right},0)`)
      .attr('opacity', '0.4')
      .attr('stroke-dasharray',("3, 3"))
      .style('font-size', '0.75rem')
    //remove the yAxis line 
      // .select('.domain').attr('stroke-width', 0) fonctionne aussi
      .select('path').remove()

    //create a second x scale for subgroup position
    const xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, xAxis.bandwidth()])
      .padding([0.5])

    // create a second y scale for the biggest bar (the biggest one) to be the same height as our SVG container
    const ySubgroup = d3.scaleLinear()
            .domain([0, (maxY*1.4)])
            .range([0, height])
            

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#020203','#FF0101'])

    // Bars rounded tops and squared bottoms
      // .style("stroke", 'green')          // colour the line - should be d => color(d.key)
      // .style("stroke-width", '5') // adjust line width
      // .style("stroke-linecap", "round") // stroke-linecap type
      // .attr("x1", d => xSubgroup(d.key)) // x position of the first start of the column
      // .attr("x2", d => xSubgroup(d.key)) // x position of the first end of the column
      // .attr("y1", d => ySubgroup(d.value)) // y position of the second start of the column
      // .attr("y2", d => ySubgroup(d.value)) // y position of the second end of the column
      // .style("stroke-linecap", "square")  // stroke-linecap type
      // .attr("x1", d => xSubgroup(d.key)) // x position of the first start of the column
      // .attr("x2", d => xSubgroup(d.key)) // x position of the first end of the column
      // .attr("y1", d => ySubgroup(d.value)) // y position of the second start of the column
      // .attr("y2", d => ySubgroup(d.value)) // y position of the second end of the column
    
    data?.activity?.sessions.forEach((d, index) => { 
			let group = svg.append("g")
				.attr("id", `day${index+1}`)

    // Add Tooltip
    const divTooltip = d3.select().append("div")
    .style("display","none")
    .style("text-align","center")
    .style("padding-top","21px")
    .style("position", "absolute")
    .style("width","39px")
    .style("height","63px")
    .style("font-size","7px")
    .style("color","white")
    .style("background","#E60000")
    .style("border","2px")
    .style("border-radius","2px")
    .style("pointer-events","none")

    // Add rectangles that appears on mouseover                   
    const rectangle = svg.selectAll("rect").data(data?.activity?.sessions);
    rectangle
      .enter()
      .append("rect")
      .attr("width", xAxis.bandwidth())
      .attr("height", height -margin.bottom -margin.top)
      // .attr("x",function(d,i){return i*(width/7) +(margin.left/2) +(margin.right/2)})
      .attr("x",(d)  => xAxis(d.day))
      .attr("y", 0)
      .style("opacity", 0)
      .style("fill","rgba(196, 196, 196, 0.5)")
      .style("pointer-events","all") 
      .on("mouseover", function(event,d) {
        d3.select(this).transition().duration(200).style("opacity", .9)
        divTooltip.transition()
        .duration(200)
        .style("display", "block");
        divTooltip.html(d.kilogram  +  "kg   "  + d.calories + "Kcal")
        .style("left",  (event.pageX - 10) + "px")
        .style("top", ( 400) + "px");
        })
        .on("mouseout", function(d) {
          d3.select(this).transition()
            .duration(500)
            .style("opacity", 0);
            divTooltip.transition()
            .duration(500)
            .style("display", "none");  
          })
        })
    
    // append the svg object to the body of the page
    svg.append('g')
    // Show the bars
    .selectAll('g')
    // Enter in data = loop group per group
    .data(data?.activity?.sessions)
    .join('g')
    .attr("transform", d => `translate(${xAxis(d.day)}, ${-margin.top -margin.bottom})`)
    .selectAll('rect')
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .join('rect')
    .attr('x', d => xSubgroup(d.key))
    .attr('y', d => height-ySubgroup(d.value))
    .attr('width', xSubgroup.bandwidth())
    .attr('height', d => ySubgroup(d.value))
    .attr('fill', d => color(d.key))
       
})

  return (
    // <div ref={wrapperRef.current ? d3.select('.barChart-svg').remove() : wrapperRef.current = true}>
    <Wrapper ref={wrapperRef}>
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
      <svg ref={svgRef} style={{ height: '15rem', width: '100%' }}> 
      </svg>
    </Wrapper>
  )}


const Wrapper = styled.div`
    // position: relative;
    background: #FBFBFB;
    border-radius: 5px;
`
const Head = styled.div`
    display: flex;
    justify-content: space-around;
    // margin-bottom: 0; // 2.5rem;
    // margin-right: 1.5rem;
    margin: 2.5rem 1.5rem 1rem 1.5rem;
    padding-top: 0; 1.5rem;
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