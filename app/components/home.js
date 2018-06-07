// @flow
import React, { Component } from 'react'
import {
	TextField,
	Paper,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Grid
} from '@material-ui/core'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from 'react-places-autocomplete'
import Script from 'react-load-script'
import WeatherTabs from './weather'

type Props = {
	activeTab: number,
	classes: Object,
	googleApiKey: string,
	address: string,
	coords: Coords,
	setCoords: (coords: Coords) => void,
	fetchWeather: (
		coords: Coords,
		weatherApiKey: string,
		preferredUnits: Unit
	) => void,
	weatherApiKey: string,
	setAddress: (address: string) => void,
	setActiveTab: (activeTab: number) => void,
	weather: Weather,
	fetchingWeather: boolean,
	preferredUnits: Unit,
	setPreferredUnits: (
		preferredUnits: Unit,
		coords: Coords,
		weatherApiKey: string
	) => void
}

type State = {
	loaded: boolean
}

const styles = (theme: MuiTheme) => ({
	root: {},
	hidden: {
		display: 'none'
	},
	suggestions: {
		width: '100%'
	},
	suggestion: {
		padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
		cursor: 'pointer'
	},
	activeSuggestion: {
		backgroundColor: theme.palette.action.selected
	},
	autocompleteWrapper: {
		marginBottom: theme.spacing.unit * 2
	},
	unitsSelectWrapper: {
		marginBottom: theme.spacing.unit * 2,
		maxWidth: 300
	}
})

class Home extends Component<Props, State> {
	static defaultProps = {
		preferredUnits: 'us'
	}

	state = {
		loaded: false
	}

	isLoaded(loaded) {
		this.setState({ loaded })
	}

	handleSelect(address) {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(coords => {
				this.props.setCoords(coords)
				return coords
			})
			.then(coords =>
				this.props.fetchWeather(
					coords,
					this.props.weatherApiKey,
					this.props.preferredUnits
				)
			)
			/* eslint-disable no-console */
			.catch(error => console.error('Error', error))
		/* eslint-enable no-console */
	}

	handleUnitChange(e) {
		const preferredUnits = e.target.value
		this.props.setPreferredUnits(
			preferredUnits,
			this.props.coords,
			this.props.weatherApiKey
		)
	}

	render() {
		const {
			classes,
			googleApiKey,
			address,
			coords,
			weatherApiKey,
			weather,
			activeTab,
			setActiveTab,
			fetchingWeather,
			preferredUnits
		} = this.props
		const hasPlacesKey = googleApiKey.length > 0

		return (
			<React.Fragment>
				{hasPlacesKey && (
					<Script
						onError={this.isLoaded.bind(this, false)}
						onLoad={this.isLoaded.bind(this, true)}
						url={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
					/>
				)}
				<div className={classes.root}>
					{hasPlacesKey &&
						this.state.loaded && (
						<div className={classes.autocompleteWrapper}>
							<Grid container spacing={8}>
								<Grid item xs={12} md={6}>
									<PlacesAutocomplete
										value={address}
										onChange={this.props.setAddress}
										onSelect={this.handleSelect.bind(this)}
									>
										{({
											getInputProps,
											suggestions,
											getSuggestionItemProps
										}) => (
											<div>
												<TextField
													fullWidth
													{...getInputProps({
														label: 'Location',
														className: 'location-search-input'
													})}
												/>
												<Paper
													className={classnames(classes.suggestions, {
														[classes.hidden]: !suggestions.length
													})}
												>
													{suggestions.map(suggestion => {
														const className = classnames(classes.suggestion, {
															[classes.activeSuggestion]: suggestion.active
														})

														return (
															<div
																{...getSuggestionItemProps(suggestion, {
																	className
																})}
															>
																<Typography>
																	{suggestion.description}
																</Typography>
															</div>
														)
													})}
												</Paper>
											</div>
										)}
									</PlacesAutocomplete>
								</Grid>
								<Grid item xs={12} md={6}>
									<FormControl fullWidth>
										<InputLabel>Preferred Units</InputLabel>
										<Select
											value={preferredUnits}
											onChange={this.handleUnitChange.bind(this)}
										>
											<MenuItem value="us">USA</MenuItem>
											<MenuItem value="ca">Canada</MenuItem>
											<MenuItem value="uk2">United Kingdom</MenuItem>
											<MenuItem value="si">SI</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</div>
					)}
					{!!coords.lat &&
						!!coords.lng &&
						!!weather &&
						!!weather.timezone && (
						<WeatherTabs
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							weather={weather}
							coords={coords}
							fetchWeather={this.props.fetchWeather.bind(
								this,
								coords,
								weatherApiKey,
								this.props.preferredUnits
							)}
							fetchingWeather={fetchingWeather}
						/>
					)}
				</div>
			</React.Fragment>
		)
	}
}

export default withStyles(styles)(Home)
