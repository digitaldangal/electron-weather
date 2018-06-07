// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, Icon } from '@material-ui/core'
import OpenInBrowser from '@material-ui/icons/OpenInBrowser'
import { shell } from 'electron'
import HideableInput from '../hideable-input'
import AdvancedSettings from './advanced-settings'
import ThemeSettings from './theme-settings'

const styles = (theme: MuiTheme) => ({
	gridItem: {
		paddingBottom: theme.spacing.unit
	},
	advancedSettingsWrapper: {
		marginTop: theme.spacing.unit * 3
	}
})

type Props = {
	classes: Object,
	weatherApiKey: string,
	setWeatherApiKey: (key: string) => void,
	googleApiKey: string,
	setGoogleApiKey: (key: string) => void
}

class Settings extends React.Component<Props> {
	render() {
		const {
			classes,
			weatherApiKey,
			setWeatherApiKey,
			googleApiKey,
			setGoogleApiKey
		} = this.props
		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
						<HideableInput
							value={weatherApiKey}
							onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
								setWeatherApiKey(e.target.value)
							}}
							label="Weather API Key"
							helperText={
								<Button
									color="secondary"
									onClick={shell.openExternal.bind(
										null,
										'https://darksky.net/dev/account'
									)}
								>
									Get a Key
									<Icon>
										<OpenInBrowser />
									</Icon>
								</Button>
							}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
						<HideableInput
							value={googleApiKey}
							onChange={e => {
								setGoogleApiKey(e.target.value)
							}}
							label="Google API Key"
							helperText={
								<Button
									color="secondary"
									onClick={shell.openExternal.bind(
										null,
										'https://developers.google.com/places/web-service/get-api-key'
									)}
								>
									Get a Key
									<Icon>
										<OpenInBrowser />
									</Icon>
								</Button>
							}
							fullWidth
						/>
					</Grid>
				</Grid>
				<div className={classes.advancedSettingsWrapper}>
					<ThemeSettings />
				</div>
				<div className={classes.advancedSettingsWrapper}>
					<AdvancedSettings />
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Settings)
