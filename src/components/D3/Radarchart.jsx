// //@ts-check

import * as d3 from 'd3'
import { select } from 'd3'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useD3 } from '../../utils/hooks/useD3'
import PropTypes from 'prop-types'

/**
 * @name RadarChart A Radar chart showing the user performances. Filled by D3.js.
 * @param {Object} props - props component
 * @param {Array<Object>} props.data - user data
 * @hook useD3 : hook filtering data, Id and renderChartFn draw the svg of the chart while including responsive dimensions with resize observer
 * @function RadarChart Draw the svg radar chart with D3.js
 * @returns {JSX} : a Radial Pie Chart
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

export default function RadarChart({ data }) {
  const svgRef = useRef()
  const wrapperRef = useD3(svgRef, data, (dimensions) => {
    
    // console.log('userData', data);
    // console.log('svgDimensions :', dimensions);

    if (!dimensions) return

    const margin = { top: 20, left: 0, bottom: 20, right: 0 };
    const width = (dimensions.width -margin.left -margin.right); //Width of the radar chart
    const height = (dimensions.height -margin.top -margin.bottom); //height of the radar chart
    // const buffer = 30
    const radius = (dimensions.height /2 -margin.top -margin.bottom)
    // const maxValue = d3.max(data?.perf?.data, function(d){return d.value})
    const maxValue = d3.max(data?.perf?.data, d => d.value)    
    
    // console.log('width :', dimensions.width);
    // console.log('height :', dimensions.height);

    const svg = select(svgRef.current)
      .append("svg")
      .classed(WrapperRefSvg, true)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // .attr("preserveAspectRatio", "xMidYMid meet")
      svg.append("g")
      .attr('id','radialChart')
      .attr('transform', `translate(${(width+ margin.left + margin.right) / 2}, ${(height+ margin.top + margin.bottom) / 2})`)

    const radialScale = d3.scaleLinear()
      .domain([0, maxValue + 20])
      .range([0, radius])
    const radialLine = d3.lineRadial()
      .angle(d => d[0] * (Math.PI / 180))
      .radius(d => radialScale(d[1]))           
    const Angle = 360 / data?.perf?.data.length; 


    // Retrieve name of axes via the kind element
    const perfData = data?.perf?.data.map((elt)=>{
    switch (elt.kind){
      case 1 :
      return {...data, kind: "Cardio"};
      case 2 :  
      return {...data, kind: "Energie"};
      case 3 :  
      return {...data, kind: "Endurance"};
      case 4 :  
      return {...data, kind: "Force"};
      case 5 :  
      return {...data, kind: "Vitesse"};
      case 6 :  
      return {...data, kind: "Intensité"};
      default :
      return {...perfData};
      }
    }, [data])  

    // Add Axis from center 
    perfData.forEach((labels, index) => {
      
    //Axes intérieurs
    svg.select('#radialChart')
      .append('path')
      .attr('id', `axisPerform${index}`)
      .attr('d', radialLine([
        [index * Angle, 0], [index * Angle, maxValue ]
      ]))
      .style('fill', "none")
      .style("stroke-width", '0,5')
      .style("stroke", '#282D30') //'white'
    
    // Add Text from axis 
      const Path = radialLine([
      [index * Angle, 0], [index * Angle,maxValue + 60 ]
    ])
      const selectIndex = Path.indexOf('L')
      const selectPosition = Path.slice(selectIndex + 1)
      let [X,Y] = [...selectPosition.split(',')]
      svg.select('#radialChart')
      .append('text')
      .attr('class','axisPerformtext')
      .text(()=>labels.kind)
      .attr('x', X)
      .attr('y', Y)
      .style('text-anchor','middle')
      .style('fill','black')
      .style('font-size', '9px')
      .transition()
      .duration(2000)
      .style('fill', 'white')
    }) 
  
    // create Polygone
    function createPolygon(rad){
    svg.select('#radialChart')
    .append('g')
    .attr('class','poly')
    .selectAll('path')
    .data([data?.perf?.data])
    .join('path')
    .attr('d', d3.lineRadial()
      .angle((d,i)=>(i* Angle) * (Math.PI / 180))
      .radius(()=>radialScale(maxValue/rad)).curve(d3.curveLinearClosed))
    .style('fill','none')
    .style('stroke', "white")
    .attr('stroke-width', 1)
    }
    createPolygon(1)
    createPolygon(1.33)
    createPolygon(2)
    createPolygon(3.33)
    createPolygon(10)

    //create polygones for values
    svg.select('#radialChart')
    .append('g')
    .attr('class','poly')
    .selectAll('path')
    .data([data?.perf?.data])
    .join('path')
    .attr('d', d3.lineRadial()
            .angle((d,i)=>(i* Angle) * (Math.PI / 180))
            .radius((d)=>radialScale(d.value))
            .curve(d3.curveLinearClosed)
      )
      .style('fill', "rgba(255, 1, 1, 0.7)")
    }   
  )

  return (
    <Wrapper ref={wrapperRef}>
      <svg ref={svgRef} style={{ height: '100%', width: '100%', backgroundColor: '#282D30', borderRadius: '5px'}}> 
      </svg>
    </Wrapper>
  )
}

  // eslint-disable-next-line no-unused-vars
  const perfData = {
    data: PropTypes.array.isRequired,
  }

  RadarChart.propTypes = {
    perfData: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        kind: PropTypes.string.isRequired,
      })
    )
  }
