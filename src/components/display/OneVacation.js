import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import NavBar from './NavBar';
import {
	GET_ONE_TRIP,
	GET_VACATIONS
} from '../../graphQl/queries';
import { DELETE_VACATION } from '../../graphQl/mutations/vacationM'
import dayjs from 'dayjs';

import { Card, Typography, Grid, Button, makeStyles } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

import Blue from '../../assets/Blue.jpg';

const useStyles = makeStyles(() => ({

	oneVacay: {
		maxWidth: '100%',
		minHeight: '100vh',
		background: '#45a7bcba',
		backgroundImage: `url(${Blue})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
	},
	OneVacation: {
		maxWidth: '100%',
		height: '35vh',
		marginTop: '-9%',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// border: '1px solid red'
	},
	top: {
		// background: 'red',
		display: 'flex',
		justifyContent: 'center',
		padding: '1%',
		marginBottom: '5%',
	},
	budget: {
		position: 'absolute',
		top: '0%',
		left: ' 0%',
		display: 'flex',
		flexDirection: 'column',
		padding: '1%',
		background: 'black',
		color: 'white',
		fontSize: '1.4rem',
		borderRadius: '0 0 4px 0'
	},

	titleLink: {
		color: 'black',
		textDecoration: 'none',
		// marginBottom: '10%',
	},
	title: {
		fontSize: '2rem',
	},
	eventConnect: {
		textDecoration: 'none',
		color: 'black',
	},
	grid: {
		height: '30vh',
		width: '98%',
		background: 'rgb(255,255,255, 0.7)',
		overflow: 'hidden',
		overflowY: 'scroll',
		boxShadow: '0 3px 3px ',
		borderRadius: '4px'
	},
	calculations: {
		position: 'absolute',
		bottom: '0%',
		left: '50%',
		transform: 'translateX(-50%)',
		width: '60%',

		display: 'flex',
		justifyContent: 'center',
		justifyContent: 'space-around',
		fontSize: '1rem',
		border: '1px solid orange'
	},
	balance: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1%',
		background: 'rgb(0,0,0, 0.7)',
		color: 'white',
		borderRadius: '4px'
	},
	cost: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1%',
		background: 'red',
		color: 'white',
		borderRadius: '4px'
	},
	footer: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		bottom: 0,
	},
	xButton: {
		color: 'red',
		fontSize: '1rem',
	},
	deleteButton: {
		background: 'red',
		color: 'white',
		fontSize: '1rem',
		// width: '20%',
	},
	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		// width: '20%',
	},
}));

const OneVacation = () => {
	const classes = useStyles();

	const history = useHistory();
	let params = useParams();
	let vacay = params.id;
	localStorage.setItem('vacay', vacay);

	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: vacay },
	});

	console.log('OneVacation -> data', data)

	const [deleteVacation] = useMutation(DELETE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS }],
	});

	const deleteTrip = () => {
		deleteVacation({ variables: { id: vacay } });
		history.push(`/dashboard`);
	};
	const goBack = () => {
		localStorage.removeItem('vacay');
		history.push(`/dashboard`);
	};

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	var lastDate = (data.vacation.dates.length) - 1;

	var from = dayjs(data.vacation.dates[0].date).format('YYYY');
	var end = dayjs(data.vacation.dates[lastDate].date).format('YYYY')

	return (
		<div className={ classes.oneVacay }>
			<NavBar />
			<div className={ classes.OneVacation }>
				<div className={ classes.top }>
					<div className={ classes.budget }>
						<span>Budget</span>
						<span>$ { data.vacation && data.vacation.budget }</span>
					</div>
					<Link className={ classes.titleLink } to={ `/vacationUpdate/${vacay}` }>
						<Typography className={ classes.title }>{ data.vacation.title } { from === end ? from : from + ' - ' + end }</Typography>
					</Link>
				</div>

				<Grid container spacing={ 2 } className={ classes.grid }>
					Calendar
					{/* { data.vacation.dates.map(e => (
						<Grid item xs={ 6 } sm={ 3 } md={ 2 }>
							<Card className={ classes.card } key={ e.id }>
								<Link className={ classes.eventConnect } to={ `/day/${e.id}` }>
									<Typography variant='h6'>
										{ dayjs(e.date).format('MMM DD ') }
									</Typography>
								</Link>
							</Card>
						</Grid>
					)) } */}
				</Grid>
			</div>
			<div className={ classes.calculations }>
				<div className={ classes.cost }><span>Cost</span>
					<span>${ data.vacation && data.vacation.budget }</span></div>
				<div className={ classes.balance }><span>Balance</span>
					<span>${ data.vacation && data.vacation.budget }</span></div>
			</div>
			<footer className={ classes.footer }>
				<Button className={ classes.deleteButton } onClick={ deleteTrip }>
					<DeleteIcon />
					<ListItemText primary='Trip' />
				</Button>
				<Button className={ classes.backButton } onClick={ goBack }>
					Back
				</Button>
			</footer>
		</div>
	);
};

export default OneVacation;
