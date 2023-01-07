import * as d3 from 'd3'
import { select } from 'd3'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useD3 } from '../../utils/hooks/useD3'
// import colors from '../../utils/style/colors.js'

/**
 * React Comoponent displaying Radar chart of daily kind of activity
 * @function useD3 : hook filtering  data, Id and renderChartFn draw the svg of the radar chart while including viewport dimensions
 * @param {data: array} : array of object displaying value and label of activity
 * @returns {JSX}
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
    
    console.log('userData', data);
    console.log('svgDimensions :', dimensions);

    if (!dimensions) return

    const margin = { top: 20, left: 0, bottom: 20, right: 0 };
    const width = (dimensions.width -margin.left -margin.right); //Width of the radar chart
    const height = (dimensions.height -margin.top -margin.bottom); //height of the radar chart
    const buffer = 50
    const radius = dimensions.height /2 - buffer
    const maxValue = d3.max(data?.perf?.data, function(d){return d.value})

    // console.log('width :', dimensions.width);
    // console.log('height :', dimensions.height);
    const svg = select(svgRef.current)
      .append("svg")
      .classed(WrapperRefSvg, true)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("preserveAspectRatio", "xMidYMid meet")
      svg.append("g")
      .attr('id','radialChart')
      .attr('transform', `translate(${(width+ margin.left + margin.right) / 2}, ${(height+ margin.top + margin.bottom) / 2})`)

    const radialScale = d3.scaleLinear()
      .domain([0, maxValue + 10])
      .range([0, radius])
    const radialLine = d3.lineRadial()
      .angle(d => d[0] * (Math.PI / 180))
      .radius(d => radialScale(d[1]))           
    const Angle = 360 / data?.perf?.data.length; 

    // Add Axis from center 
    data?.perf?.data.forEach((labels, index) => {
    svg.select('#radialChart')
      .append('path')
      .attr('id', `axisPerform${index}`)
      .attr('d', radialLine([
        [index * Angle, 0], [index * Angle,maxValue ]
      ]))
      .style('fill', "none")
      .style("stroke-width", '0,5')
      .style("stroke", 'hsla(203, 9%, 17%, 1)') 
    
//     const datas = data?.perf?.kind.map((data)=>{
//     switch (datas.kind){
//       case 1 :
//         return {...data, kind: "Cardio"};
//       case 2 :  
//       return {...data, kind: "Energie"};
//       case 3 :  
//       return {...data, kind: "Endurance"};
//       case 4 :  
//       return {...data, kind: "Force"};
//       case 5 :  
//       return {...data, kind: "Vitesse"};
//       case 6 :  
//       return {...data, kind: "Intensité"};
//       default :
//       return {...data};
//     }
// })
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

        // ADD RadialLine of values. 
        svg.select('#radialChart')
        .append('path')
        .attr('id', `axisPerformValue${index}`)
        .attr('d', radialLine([
          [index * Angle, 0], [index * Angle,labels.value ]
        ]))
        .style('fill', "none")
        .style("stroke-width", '0')
        .style('stroke', "white")
        
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
    createPolygon(1.3)
    createPolygon(2)
    createPolygon(3.3)
    createPolygon(10)

    //create polygone of values
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