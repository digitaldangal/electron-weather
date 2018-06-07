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
import formatDate from './lib/format-date'

const styles = (theme: MuiTheme) => ({
	root: {
		marginTop: theme.spacing.unit * 3
	},
	chart: {}
})

type Props = {
	classes: Object,
	theme: MuiTheme,
	weather: MinutelyWeather,
	timezone: string,
	units: Units
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
				case 'Precipitation Intensity':
					return {
						...i,
						value: `${i.value} ${units.precipIntensity}`
					}
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

class MinuteGraph extends React.Component<Props> {
	get weatherData() {
		const { weather, timezone } = this.props

		return weather.data.map(datum => ({
			time: formatDate({ time: datum.time, timezone, format: 'h:mm a' }),
			'Precipitation Intensity': datum.precipIntensity,
			'Precipitation Probability': datum.precipProbability * 100,
			precipIntensityError: datum.precipIntensityError,
			type: datum.precipType
		}))
	}

	render() {
		const { classes, theme, units } = this.props

		return (
			<div className={classes.root}>
				<ResponsiveContainer minWidth={100} minHeight={100} aspect={3}>
					<LineChart data={this.weatherData} className={classes.chart}>
						<Line
							type="monotone"
							dataKey="Precipitation Probability"
							stroke={theme.palette.primary.main}
						/>
						<Line
							type="monotone"
							dataKey="Precipitation Intensity"
							stroke={theme.palette.secondary.main}
							dot={false}
						/>
						<XAxis dataKey="time" tick={{ fill: theme.palette.text.primary }} />
						<YAxis
							domain={[0, 100]}
							tick={{ fill: theme.palette.text.primary }}
						/>
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip
							wrapperStyle={{
								backgroundColor: theme.palette.background.paper,
								borderColor: theme.palette.background.paper,
								boxShadow: theme.shadows[5],
								borderRadius: 2
							}}
							content={props => <CustomTooltip {...props} units={units} />}
						/>
						<Legend
							wrapperStyle={{
								color: theme.palette.text.primary
							}}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(MinuteGraph)
