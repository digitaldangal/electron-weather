// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography,
	Grid,
	Button,
	FormControlLabel,
	Switch
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SettingsActions from '../../actions/settings'
import { persistor } from '../../store/configureStore'
import Snackbar from '../snackbar'
import HelpPopover from '../help-popover'

const styles = (theme: MuiTheme) => ({
	root: {},
	heading: {
		color: theme.palette.error.main
	},
	switchLabelWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
})

type Props = {
	classes: Object,
	/* eslint-disable react/no-unused-prop-types */
	googleApiKey: string,
	setGoogleApiKey: (googleApiKey: string) => void,
	weatherApiKey: string,
	setWeatherApiKey: (weatherApiKey: string) => void,
	/* eslint-enable react/no-unused-prop-types */
	renderIcons: boolean,
	setRenderIcons: (renderIcons: boolean) => void
}

type State = {
	showTodoMessage: boolean
}

class AdvancedSettings extends React.Component<Props, State> {
	state = {
		showTodoMessage: false
	}

	clearSettings = () => {
		persistor
			.purge()
			.then(() => window.location.reload())
			.catch(() => {
				// do nothing
			})
	}

	toggleTodoMessage(showTodoMessage) {
		this.setState({
			showTodoMessage
		})
	}

	showTodo = () => {
		this.toggleTodoMessage(true)
	}

	/**
	 * @todo fixme
	 */
	clearSettingsExceptKeys() {
		// const {
		// 	googleApiKey,
		// 	setGoogleApiKey,
		// 	weatherApiKey,
		// 	setWeatherApiKey
		// } = this.props
		// persistor
		// 	.purge()
		// 	.then(() => setGoogleApiKey(googleApiKey))
		// 	.then(() => setWeatherApiKey(weatherApiKey))
		// 	.then(() => window.location.reload())
		// 	.catch(() => {
		// 		// do nothing
		// 	})
		this.showTodo()
	}

	onRenderIconsChange = (e, renderIcons: boolean) => {
		this.props.setRenderIcons(renderIcons)
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<ExpansionPanel defaultExpanded={process.env.NODE_ENV !== 'production'}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="error" />}>
						<Typography className={classes.heading} variant="subheading">
							Advanced Settings
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid container spacing={16}>
							<Grid item xs={12} sm={6}>
								<Button
									color="secondary"
									variant="raised"
									onClick={this.clearSettings}
								>
									Clear All Data
								</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button
									color="secondary"
									onClick={this.clearSettingsExceptKeys.bind(this)}
								>
									Clear All Data except API Keys
								</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControlLabel
									control={
										<Switch
											checked={this.props.renderIcons}
											onChange={this.onRenderIconsChange}
										/>
									}
									label={
										<div className={classes.switchLabelWrapper}>
											<Typography style={{ marginRight: 10 }}>
												Render Icons?
											</Typography>
											<HelpPopover size="sm" style={{ maxWidth: 400 }}>
												The weather icons in the app use an HTML5 canvas for
												animations. Rendering a lot at once can cause
												performance hits.
											</HelpPopover>
										</div>
									}
								/>
							</Grid>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<Snackbar
					onClose={this.toggleTodoMessage.bind(this, false)}
					open={this.state.showTodoMessage}
					message="This has not been implemented yet"
					closeOnClickaway
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		weatherApiKey: state.settings.weatherApiKey,
		googleApiKey: state.settings.googleApiKey,
		renderIcons: state.settings.renderIcons
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(SettingsActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AdvancedSettings))
