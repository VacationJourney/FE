import React from 'react';
// import { Link } from 'react-router-dom';

import Login from '../auth/Login';

// import { useStyles } from '../../Style/Styles';
import { Typography, makeStyles } from '@material-ui/core';
import Flight from '../../assets/flight.jpg';

const useStyles = makeStyles(() => ({
	splash: {
		backgroundImage: `url(${Flight})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
	},
	appName: {
		marginTop: 100,
		color: 'white',
		fontWeight: 'bold'
	},
}));

const Splash = () => {
	const classes = useStyles();
	return (
		<div className={classes.splash}>
			<Login />
			<Typography className={classes.appName} variant='h2'>Journey 2</Typography>
		</div>
	);
};

export default Splash;
