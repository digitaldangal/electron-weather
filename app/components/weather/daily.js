// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import * as Units from './lib/units'
import Summary from './summary'
import PrecipitationIntensity from './field/precipitation-intensity'
import PrecipitationProbability from './field/precipitation-probability'
import TemperatureRange from './field/temperature-range'
import DewPoint from './field/dew-point'
import Humidity from './field/humidity'
import WindSpeed from './field/wind-speed'
import WindGust from './field/wind-gust'
import WindBearing from './field/wind-bearing'
import CloudCover from './field/cloud-cover'
import UVIndex from './field/uv-index'
import Visibility from './field/visibility'
import Ozone from './field/ozone'
import GeneralSummary from './general-summary'
import DailyWeatherGraph from '../weather-graphs/daily-weather-graph'

type Props = {
	classes: Object,
	timezone: string,
	units: Unit,
	weather: DailyWeather
}

const styles = (theme: MuiTheme) => ({
	day: {
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

class Daily extends React.Component<Props> {
	render() {
		const { weather, classes, timezone } = this.props
		const units = Units[this.props.units]

		return (
			<div className={classes.root}>
				<DailyWeatherGraph data={weather.data} timezone={timezone} />
				<GeneralSummary summary={weather.summary} />
				{weather.data.map(day => (
					<div key={`day-${day.time}`} className={classes.day}>
						<Summary
							icon={day.icon}
							time={day.time}
							summary={day.summary}
							timezone={timezone}
							dateFormat="ddd, MMM D, YYYY"
						/>
						<TemperatureRange
							min={day.temperatureLow}
							max={day.temperatureHigh}
							units={units}
						/>
						<PrecipitationProbability
							value={day.precipProbability}
							units={units}
						/>
						<PrecipitationIntensity
							value={day.precipIntensity}
							units={units}
						/>
						<DewPoint value={day.dewPoint} units={units} />
						<Humidity value={day.humidity} units={units} />
						<WindSpeed value={day.windSpeed} units={units} />
						<WindGust value={day.windGust} units={units} />
						<WindBearing value={day.windBearing} units={units} />
						<CloudCover value={day.cloudCover} units={units} />
						<UVIndex value={day.uvIndex} />
						<Visibility value={day.visibility} units={units} />
						<Ozone value={day.ozone} units={units} />
					</div>
				))}
			</div>
		)
	}
}

export default withStyles(styles)(Daily)
