export const SET_COORDS: ActionConst = 'SET_COORDS'
export const SET_ADDRESS: ActionConst = 'SET_ADDRESS'
export const SET_WEATHER: ActionConst = 'SET_WEATHER'
export const WEATHER_FETCH_ERROR: ActionConst = 'WEATHER_FETCH_ERROR'
export const SET_ACTIVE_TAB: ActionConst = 'SET_ACTIVE_TAB'
export const SET_FETCHING_WEATHER: ActionConst = 'SET_FETCHING_WEATHER'
export const SET_PREFERRED_UNITS: ActionConst = 'SET_PREFERRED_UNITS'

export function setCoords(coords: Object) {
	return {
		type: SET_COORDS,
		coords
	}
}

export function setAddress(address: string) {
	return {
		type: SET_ADDRESS,
		address
	}
}

export function setWeather(weather: CurrentWeather) {
	return {
		type: SET_WEATHER,
		weather
	}
}

export function setActiveTab(activeTab: number) {
	return {
		type: SET_ACTIVE_TAB,
		activeTab
	}
}

export function setFetchingWeather(fetchingWeather: boolean) {
	return {
		type: SET_FETCHING_WEATHER,
		fetchingWeather
	}
}

export function setPreferredUnits(preferredUnits: Unit) {
	return {
		type: SET_PREFERRED_UNITS,
		preferredUnits
	}
}
