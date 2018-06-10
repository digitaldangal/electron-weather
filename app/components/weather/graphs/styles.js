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
		chart: {
			margin: chartMargins
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
			dot: {
				stroke: theme.palette.primary.main,
				fill: theme.palette.primary.main
			},
			activeDot: {
				stroke: theme.palette.secondary.main,
				fill: theme.palette.secondary.main
			}
		},
		secondaryLine: {
			stroke: theme.palette.secondary.main,
			dot: {
				stroke: theme.palette.secondary.main,
				fill: theme.palette.secondary.main
			},
			activeDot: {
				stroke: theme.palette.primary.main,
				fill: theme.palette.primary.main
			}
		},
		primaryArea: {
			stroke: theme.palette.primary.main,
			dot: {
				stroke: theme.palette.primary.light,
				fill: theme.palette.primary.light
			},
			activeDot: {
				stroke: theme.palette.secondary.light,
				fill: theme.palette.secondary.light
			}
		},
		secondaryArea: {
			stroke: theme.palette.secondary.main,
			dot: {
				stroke: theme.palette.secondary.light,
				fill: theme.palette.secondary.light
			},
			activeDot: {
				stroke: theme.palette.primary.light,
				fill: theme.palette.primary.light
			}
		}
	}
}
