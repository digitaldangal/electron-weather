import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from '../components/home'
import * as HomeActions from '../actions/home'
import fetchWeather from '../lib/fetch-weather'

function mapStateToProps(state) {
	return {
		router: state.router,
		googleApiKey: state.settings.googleApiKey,
		weatherApiKey: state.settings.weatherApiKey,
		coords: state.home.coords,
		address: state.home.address,
		weather: state.home.weather,
		activeTab: state.home.activeTab,
		fetchingWeather: state.home.fetchingWeather,
		preferredUnits: state.home.preferredUnits
	}
}

function updateWeather(dispatch, { lat, lng }, weatherApiKey, preferredUnits) {
	dispatch({
		type: HomeActions.SET_FETCHING_WEATHER,
		fetchingWeather: true
	})
	fetchWeather({ lat, lng }, weatherApiKey, preferredUnits)
		.then(weather =>
			dispatch({
				type: HomeActions.SET_WEATHER,
				weather: {
					fetched: Date.now(),
					...weather
				}
			})
		)
		.then(() =>
			dispatch({
				type: HomeActions.SET_FETCHING_WEATHER,
				fetchingWeather: false
			})
		)
		.catch(() => {
			dispatch({ type: HomeActions.WEATHER_FETCH_ERROR })
			dispatch({
				type: HomeActions.SET_FETCHING_WEATHER,
				fetchingWeather: false
			})
		})
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators(HomeActions, dispatch),
		fetchWeather: (coords, weatherApiKey, preferredUnits) => {
			updateWeather(dispatch, coords, weatherApiKey, preferredUnits)
		},
		setPreferredUnits: (preferredUnits, coords, weatherApiKey) => {
			dispatch({
				type: HomeActions.SET_PREFERRED_UNITS,
				preferredUnits
			})
			updateWeather(dispatch, coords, weatherApiKey, preferredUnits)
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
