import {
	SET_THEME_PALETTE_TYPE,
	SET_PRIMARY_COLOR,
	SET_SECONDARY_COLOR
} from '../actions/theme'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	themePaletteType: 'light',
	primaryColor: 'indigo',
	secondaryColor: 'pink'
}

export default function(state = defaultState, action: actionType) {
	switch (action.type) {
		case SET_THEME_PALETTE_TYPE:
			return { ...state, ...action }
		case SET_PRIMARY_COLOR:
			return { ...state, ...action }
		case SET_SECONDARY_COLOR:
			return { ...state, ...action }
		default:
			return state
	}
}
