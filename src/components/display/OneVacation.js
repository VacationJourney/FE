import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import NavBar from './NavBar';
import {
	GET_ONE_TRIP,
	DELETE_VACATION,
	// DELETE_DAY,
	GET_VACATIONS,
} from '../../graphQl/Index';
import { Card, Typography, Grid, Button, makeStyles } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
// import { useStyles } from '../../Style/Styles';
import dayjs from 'dayjs';
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
		display: 'flex',
		flexDirection: 'column',
		padding: '4%',
		justifyContent: 'center',
	},
	titleLink: {
		marginBottom: '4%',
		color: 'black',
		textDecoration: 'none',
	},
	eventConnect: {
		textDecoration: 'none',
		color: 'black',
	},
	grid: {
		marginBottom: '15%',
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
		width: '30%',
	},
	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		width: '30%',
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
	const [deleteVacation] = useMutation(DELETE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS }],
	});

	// const [deleteDay] = useMutation(DELETE_DAY, {
	// 	refetchQueries: mutationResult => [
	// 		{ query: GET_ONE_TRIP, variables: { id: vacay } },
	// 	],
	// });

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
		<div className={classes.oneVacay}>
			<NavBar />
			<div className={classes.OneVacation}>
				<Link className={classes.titleLink} to={`/vacationUpdate/${vacay}`}>
					<Typography variant='h2'>{data.vacation.title}</Typography>
				</Link>
				<Typography variant='h4'>{from === end  ? from: from + ' - ' + end}</Typography>
				<Grid container spacing={2} className={classes.grid}>
					{data.vacation.dates.map(e => (
						<Grid item xs={6} sm={3} md={2}>
							<Card className={classes.card} key={e.id}>
								<Link className={classes.eventConnect} to={`/day/${e.id}`}>
									<Typography variant='h6'>
										{dayjs(e.date).format('MMM DD ')}
									</Typography>
								</Link>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
			<footer className={classes.footer}>
				<Button className={classes.deleteButton} onClick={deleteTrip}>
					<DeleteIcon />
					<ListItemText primary='Trip' />
				</Button>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
};

export default OneVacation;
