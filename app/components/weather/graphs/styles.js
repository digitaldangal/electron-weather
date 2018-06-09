export default (theme: MuiTheme) => {
	const chartMargins = {
		left: -(theme.spacing.unit * 3),
		right: theme.spacing.unit * 3,
		top: theme.spacing.unit * 3
	}

	return {
		legend: {
			wrapperStyle: {
				color: theme.palette.text.primary
			}
		},
		tooltip: {
			wrapperStyle: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.background.paper,
				borderColor: theme.palette.background.paper,
				boxShadow: theme.shadows[5],
				borderRadius: 2
			}
		},
		yAxis: {
			tick: {
				fill: theme.palette.text.primary
			}
		},
		xAxis: {
			tick: {
				fill: theme.palette.text.primary
			}
		},
		barChart: {
			margin: chartMargins
		},
		lineChart: {
			margin: { ...chartMargins, top: 0 }
		},
		responsiveContainer: {
			minWidth: 300,
			minHeight: 100,
			aspect: 3
		},
		primaryLine: {
			stroke: theme.palette.primary.main,
			dot: false,
			activeDot: {
				stroke: theme.palette.primary.main
			}
		},
		secondaryLine: {
			stroke: theme.palette.secondary.main,
			dot: false,
			activeDot: {
				stroke: theme.palette.secondary.main
			}
		}
	}
}
