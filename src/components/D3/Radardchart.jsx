import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import PropTypes from 'prop-types'
// import useViewport from '../../utils/Hooks/useViewport'

/**
 * A Radar chart showing the user performances. Filled by D3.js.
 * @name RadarChart
 * @param {Object} props - props component
 * @param {Array<Object>} props.data - user data
 * @param {number} props.svgHeight - height of svg container
 * @returns {ReactElement} a radar Chart
 * @component
 */
export default function RadardChart({data, svgHeight}) {

	// const { viewportWidth } = useViewport()

  	// Format X axis label
	const formatLabels = (kindId) => { 
		const kind = data[kindId].kind
		return (kind)
  }
	return (
		<ResponsiveContainer height={svgHeight}>
			<RadarChart data={data} cx='47%' style={{backgroundColor: "#282A30", borderRadius:5}} >{/*   outerRadius={data > 1024 && 81} */}
				<PolarGrid radialLines={false} />
				<PolarAngleAxis tickFormatter={formatLabels} tick={{ fill: 'white'}} tickSize={6} style={{transform: "translate(2px, -7px) scaleY(1.1)", fontSize: "12px"}} />
				<Radar dataKey="value" fill="#ff0000" fillOpacity={0.7} />
			</RadarChart>
		</ResponsiveContainer>
	)
}

RadardChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.number.isRequired,
			kind: PropTypes.string.isRequired,
		})
	).isRequired,
	svgHeight: PropTypes.number,
}
