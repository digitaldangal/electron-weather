// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import * as Units from './lib/units'
import Summary from './summary'
import PrecipitationIntensity from './field/precipitation-intensity'
import PrecipitationProbability from './field/precipitation-probability'
import Temperature from './field/temperature'
import ApparentTemperature from './field/apparent-temperature'
import DewPoint from './field/dew-point'
import Humidity from './field/humidity'
import WindSpeed from './field/wind-speed'
import WindGust from './field/wind-gust'
import WindBearing from './field/wind-bearing'
import CloudCover from './field/cloud-cover'
import UVIndex from './field/uv-index'
import Visibility from './field/visibility'
import Ozone from './field/ozone'

type Props = {
	classes: Object,
	timezone: string,
	units: Unit,
	weather: HourlyWeather
}

const styles = (theme: MuiTheme) => ({
	hour: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&:not(:first-of-type)': {
			paddingTop: theme.spacing.unit * 2
		},
		'&:not(:last-of-type)': {
			paddingBottom: theme.spacing.unit * 2
		},
		'&:last-of-type': {
			borderBottom: 'none'
		}
	}
})

class Hourly extends React.Component<Props> {
	render() {
		const { weather, classes, timezone } = this.props
		const units = Units[this.props.units]

		return (
			<div className={classes.root}>
				{weather.data.map(hour => (
					<div key={`hour-${hour.time}`} className={classes.hour}>
						<Summary
							icon={hour.icon}
							time={hour.time}
							summary={hour.summary}
							timezone={timezone}
						/>
						<Temperature value={hour.temperature} units={units} />
						<ApparentTemperature
							value={hour.apparentTemperature}
							units={units}
						/>
						<PrecipitationProbability
							value={hour.precipProbability}
							units={units}
						/>
						<PrecipitationIntensity
							value={hour.precipIntensity}
							units={units}
						/>
						<DewPoint value={hour.dewPoint} units={units} />
						<Humidity value={hour.humidity} units={units} />
						<WindSpeed value={hour.windSpeed} units={units} />
						<WindGust value={hour.windGust} units={units} />
						<WindBearing value={hour.windBearing} units={units} />
						<CloudCover value={hour.cloudCover} units={units} />
						<UVIndex value={hour.uvIndex} />
						<Visibility value={hour.visibility} units={units} />
						<Ozone value={hour.ozone} units={units} />
					</div>
				))}
			</div>
		)
	}
}

export default withStyles(styles)(Hourly)
