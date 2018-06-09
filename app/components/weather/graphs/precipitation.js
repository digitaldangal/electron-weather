import React from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent'
import formatDate from '../lib/format-date'
import graphStyles from './styles'
import getUnits from '../lib/units'

const styles = (theme: MuiTheme) => ({
	root: {
		marginTop: theme.spacing.unit * 3
	}
})

type Props = {
	classes: Object,
	theme: MuiTheme,
	data: WeatherData,
	timezone: string,
	dateFormat?: string
}

const CustomTooltip = (props: { payload: Array<Object>, units: Units }) => {
	if (!!props && !!props.payload[0]) {
		const { units } = props
		const payload = props.payload.map(i => {
			switch (i.name) {
				case 'Precipitation Probability':
					return {
						...i,
						value: `${i.value.toFixed()}%`,
						name: `Chance of ${i.payload.type || 'Precipitation'}`
					}
				/* eslint-disable no-case-declarations */
				case 'Precipitation Intensity':
					let value
					if (i.value > 0 && !!i.payload.precipIntensityError) {
						value = `${i.value} (± ${i.payload.precipIntensityError}) ${
							units.precipIntensity
						}`
					} else {
						value = `${i.value} ${units.precipIntensity}`
					}
					return {
						...i,
						value
					}
				/* eslint-enable no-case-declarations */
				default:
					return i
			}
		})

		return (
			<Typography component="div">
				<DefaultTooltipContent {...props} payload={payload} />
			</Typography>
		)
	}

	return (
		<Typography component="div">
			<DefaultTooltipContent {...props} />
		</Typography>
	)
}

class PrecipitationGraph extends React.Component<Props> {
	static defaultProps = {
		dateFormat: 'h:mm a'
	}

	get weatherData() {
		const { data, timezone, dateFormat } = this.props

		return data.map(datum => ({
			time: formatDate({ time: datum.time, timezone, format: dateFormat }),
			'Precipitation Intensity': datum.precipIntensity,
			'Precipitation Probability': datum.precipProbability * 100,
			precipIntensityError: datum.precipIntensityError,
			type: datum.precipType
		}))
	}

	render() {
		const { classes, theme } = this.props

		const {
			responsiveContainer,
			lineChart,
			primaryLine,
			secondaryLine,
			xAxis,
			yAxis,
			tooltip,
			legend
		} = graphStyles(theme)

		const units = getUnits()

		return (
			<div className={classes.root}>
				<ResponsiveContainer {...responsiveContainer}>
					<LineChart data={this.weatherData} {...lineChart}>
						<Line
							type="monotone"
							dataKey="Precipitation Probability"
							{...primaryLine}
						/>
						<Line
							type="monotone"
							dataKey="Precipitation Intensity"
							{...secondaryLine}
							dot={false}
						/>
						<XAxis dataKey="time" {...xAxis} />
						<YAxis domain={[0, 100]} {...yAxis} />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip
							{...tooltip}
							content={props => <CustomTooltip {...props} units={units} />}
						/>
						<Legend {...legend} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(PrecipitationGraph)
