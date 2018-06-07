export const SET_THEME_PALETTE_TYPE: ActionConst = 'SET_THEME_PALETTE_TYPE'
export const SET_PRIMARY_COLOR: ActionConst = 'SET_PRIMARY_COLOR'
export const SET_SECONDARY_COLOR: ActionConst = 'SET_SECONDARY_COLOR'

export function setThemeType(themePaletteType: MuiThemePaletteType) {
	return {
		type: SET_THEME_PALETTE_TYPE,
		themePaletteType
	}
}

export function setPrimaryColor(primaryColor: string) {
	return {
		type: SET_PRIMARY_COLOR,
		primaryColor
	}
}

export function setSecondaryColor(secondaryColor: string) {
	return {
		type: SET_SECONDARY_COLOR,
		secondaryColor
	}
}
