import React from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Rectangle
} from 'recharts'
import { withTheme } from '@material-ui/core/styles'
import formatDate from '../lib/format-date'
import getUnits from '../lib/units'
import graphStyles from './styles'

type Props = {
	data: WeatherData,
	timezone: string,
	dateFormat?: string,
	theme: MuiTheme
}

const TemperatureRangeGraph = (props: Props) => {
	const data = props.data.map(datum => ({
		...datum,
		time: formatDate({
			time: datum.time,
			timezone: props.timezone,
			format: props.dateFormat
		}),
		High: datum.temperatureHigh,
		Low: datum.temperatureLow
	}))

	const units = getUnits()
	const {
		responsiveContainer,
		legend,
		tooltip,
		xAxis,
		yAxis,
		barChart
	} = graphStyles(props.theme)

	return (
		<ResponsiveContainer {...responsiveContainer}>
			<BarChart data={data} {...barChart}>
				<XAxis dataKey="time" {...xAxis} />
				<YAxis {...yAxis} />
				<Tooltip {...tooltip} />
				<Legend {...legend} />
				<Bar
					background={false}
					dataKey="Low"
					fill={props.theme.palette.secondary.main}
					unit={units.temperatureLow}
					shape={barProps => <Rectangle {...barProps} visibility="inherit" />}
				/>
				<Bar
					background={false}
					dataKey="High"
					fill={props.theme.palette.primary.main}
					unit={units.temperatureHigh}
					shape={barProps => <Rectangle {...barProps} visibility="inherit" />}
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}

TemperatureRangeGraph.defaultProps = {
	dateFormat: 'ddd, MMM D, YYYY'
}

export default withTheme()(TemperatureRangeGraph)
