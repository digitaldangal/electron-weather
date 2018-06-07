export const SET_WEATHER_API_KEY: ActionConst = 'SET_WEATHER_API_KEY'
export const SET_GOOGLE_API_KEY: ActionConst = 'SET_GOOGLE_API_KEY'
export const SET_RENDER_ICONS: ActionConst = 'RENDER_ICONS'

export function setWeatherApiKey(weatherApiKey: string) {
	return {
		type: SET_WEATHER_API_KEY,
		weatherApiKey
	}
}

export function setGoogleApiKey(googleApiKey: string) {
	return {
		type: SET_GOOGLE_API_KEY,
		googleApiKey
	}
}

export function setRenderIcons(renderIcons: boolean) {
	return {
		type: SET_RENDER_ICONS,
		renderIcons
	}
}
