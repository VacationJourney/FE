import React from 'react';

// import User from './User';
import Vacations from './Vacations';
import NavBar from './Nav/Index'

import {  makeStyles } from '@material-ui/core';
import LightFlight from '../../assets/flight1.png';

const useStyles = makeStyles(() => ({
	vacations: {
		backgroundImage: `url(${LightFlight})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
	},
}));

const Dashboard = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.vacations}>
				<NavBar />
				{/* <User /> */}
				<Vacations />
			</div>
		</>
	);
};

export default Dashboard;
