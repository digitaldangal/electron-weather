// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Select, MenuItem } from '@material-ui/core'
import Precipitation from './precipitation'
import TemperatureRange from './temperature-range'
import Temperature from './temperature'

export const PrecipitationGraph = Precipitation
export const TemperatureRangeGraph = TemperatureRange

const styles = (theme: MuiTheme) => ({
	root: {
		marginBottom: theme.spacing.unit * 2
	}
})

const graphOptions = {
	tempRange: 'Temperature Range',
	temp: 'Temperature',
	precip: 'Precipitation'
}

type GraphOptions = $Keys<typeof graphOptions>

type Props = {
	classes: Object,
	data: WeatherData,
	timezone: string,
	defaultGraph?: GraphOptions,
	exclude?: Array<GraphOptions>,
	tempRangeDateFormat?: string,
	tempDateFormat?: string,
	precipDateFormat?: string
}

type State = {
	graph: GraphOptions
}

class Graphs extends React.Component<Props, State> {
	static defaultProps = {
		defaultGraph: 'tempRange',
		exclude: [],
		tempRangeDateFormat: undefined,
		tempDateFormat: undefined,
		precipDateFormat: 'ddd, MMM D, YYYY'
	}

	constructor(props) {
		super(props)

		this.state = {
			graph: props.defaultGraph
		}
	}

	handleSelectChange = (e: SyntheticEvent<HTMLElement>) => {
		// $FlowFixMe
		this.setState({ graph: e.target.value })
	}

	render() {
		const {
			classes,
			timezone,
			data,
			exclude,
			tempRangeDateFormat,
			tempDateFormat,
			precipDateFormat
		} = this.props
		const { graph } = this.state
		const options = { ...graphOptions }
		// $FlowFixMe
		exclude.forEach(exclusion => {
			delete options[exclusion]
		})

		return (
			<div className={classes.root}>
				<Grid container>
					<Grid item xs={12} sm={6}>
						<Select value={this.state.graph} onChange={this.handleSelectChange}>
							{Object.keys(options).map(key => (
								<MenuItem key={`graph-option-${key}`} value={key}>
									{options[key]}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item xs={12}>
						{graph === 'tempRange' && (
							<TemperatureRange
								timezone={timezone}
								data={data}
								dateFormat={tempRangeDateFormat}
							/>
						)}
						{graph === 'temp' && (
							<Temperature
								timezone={timezone}
								data={data}
								dateFormat={tempDateFormat}
							/>
						)}
						{graph === 'precip' && (
							<Precipitation
								data={data}
								timezone={timezone}
								dateFormat={precipDateFormat}
							/>
						)}
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(Graphs)
