import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeProvider from '../components/theme-provider'
import * as ThemeActions from '../actions/theme'
import colors from '../utils/colors'

function mapStateToProps(state) {
	return {
		theme: {
			palette: {
				type: state.theme.themePaletteType,
				primary: colors[state.theme.primaryColor],
				secondary: colors[state.theme.secondaryColor]
			}
		}
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ThemeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThemeProvider)
