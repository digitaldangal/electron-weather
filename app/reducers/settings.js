import {
	SET_GOOGLE_API_KEY,
	SET_WEATHER_API_KEY,
	SET_RENDER_ICONS
} from '../actions/settings'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	weatherApiKey: '',
	googleApiKey: '',
	renderIcons: true
}

export default function setApiKey(state = defaultState, action: actionType) {
	switch (action.type) {
		case SET_WEATHER_API_KEY:
			return { ...state, ...action }
		case SET_GOOGLE_API_KEY:
			return { ...state, ...action }
		case SET_RENDER_ICONS:
			return { ...state, ...action }
		default:
			return state
	}
}
