import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

type Props = {
	value?: any,
	label?: string,
	units?: string,
	spaceBeforeUnits?: boolean
}

const Field = ({ value, label, units, spaceBeforeUnits, ...props }: Props) => {
	if (!value) return null
	return (
		<div {...props}>
			<Grid container>
				<Grid item xs={12} sm={6} md={3}>
					{!!label && <Typography>{label}: </Typography>}
				</Grid>
				<Grid item xs={12} sm={6} md={9}>
					<Typography>
						{value}
						{!!units && `${spaceBeforeUnits ? ' ' : ''}${units}`}
					</Typography>
				</Grid>
			</Grid>
		</div>
	)
}

Field.defaultProps = {
	value: undefined,
	label: undefined,
	units: undefined,
	spaceBeforeUnits: false
}

export default Field
