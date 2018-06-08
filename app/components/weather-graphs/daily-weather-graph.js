import React from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'
import formatDate from '../weather/lib/format-date'

type Props = {
	data: Array<{
		time: number
	}>,
	timezone: string,
	dateFormat?: string
}

const DailyWeatherGraph = (props: Props) => {
	const data = props.data.map(datum => ({
		...datum,
		time: formatDate({ time: datum.time, timezone: props.timezone, format: props.dateFormat}),
		High: datum.temperatureHigh,
		Low: datum.temperatureLow
	}))

	return (
		<ResponsiveContainer minWidth={100} minHeight={100} aspect={2}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="time" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="Low" fill="#82ca9d" />
				<Bar dataKey="High" fill="#8884d8" />
			</BarChart>
		</ResponsiveContainer>
	)
}

DailyWeatherGraph.defaultProps = {
	dateFormat: 'ddd, MMM D, YYYY'
}

export default DailyWeatherGraph
