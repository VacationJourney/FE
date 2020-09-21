import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Typography, makeStyles } from '@material-ui/core';
// import { useStyles } from '../../Style/Styles';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},

	vLink: {
		textDecoration: 'none',
		color: 'black',
	},
}));

const VacationCard = ({ data }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				{data.vacations.map(trip => (
					<Grid item key={trip.id} xs={12} sm={6} md={3} lg={3}>
						<Link className={classes.vLink} to={`/vacation/${trip.id}`}>
							<Card >
								<Typography className={classes.vTitle} variant='h5'>
									{trip.title}
								</Typography>
							</Card>
						</Link>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default VacationCard;
