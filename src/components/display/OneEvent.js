import React from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ONE_EVENT, DELETE_EVENT, GET_ONE_DATE } from '../../graphQl/Index';
import NavBar from './NavBar';
// Styling imports
import { Card, Typography, makeStyles, Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
// import { useStyles } from '../../Style/Styles';
import dayjs from 'dayjs';
import White from '../../assets/White.jpg';

const useStyles = makeStyles(() => ({
	activity: {
		maxWidth: '100%',
		minHeight: '100vh',
		background: '#d6928f',
		backgroundImage: `url(${White})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
	},
	event: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	title: {
		paddingTop: '10%',
		color: 'white',
	},
	activityCard: {
		background: '#003f75',
		color: 'white',
		// marginTop: '20%',
		// width: '80%',
		padding: '2%',
		opacity: '.4',
	},
	footer: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		bottom: 0,
	},
	footer2: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		bottom: 0,
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

const OneEvent = () => {
	const classes = useStyles();
	const history = useHistory();

	let params = useParams();
	let event = params.id;

	const date = localStorage.getItem('day');

	// Query One Event
	const { data, loading, error } = useQuery(GET_ONE_EVENT, {
		variables: { id: event },
	});


	// Delete an event
	const [deleteEvent] = useMutation(DELETE_EVENT, {
		refetchQueries: mutationResult => [
			{ query: GET_ONE_DATE, variables: { id: date } },
		],
	});
	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	const removeEvent = () => {
		deleteEvent({ variables: { id: event } });
		history.push(`/day/${date}`);
	};
	const goBack = () => {
		history.push(`/day/${date}`);
	};

	var { startTime } = data.event;
	var { endTime } = data.event;
	var day = dayjs(startTime).format('MMM D');

	var from = dayjs(startTime).format('h:mm a');
	var to = dayjs(endTime).format('h:mm a');

	// logic for open ended events
	if (to === 'Invalid Date') {
		to = '';
	}

	return (
		<div className={classes.activity}>
			<NavBar />
			<div className={classes.event}>
				<Typography variant='h4' className={classes.title}>
					{day}
				</Typography>
				<Card className={classes.activityCard}>
					<h2>{data.event.title}</h2>
					<h4>
						{from} - {to}
					</h4>
					<h3>Location: {data.event.location}</h3>
					<h3>Contact: {data.event.contact}</h3>
					<h4>Description: {data.event.description}</h4>
				</Card>
				<footer className={classes.footer}>
					<Button className={classes.deleteButton} onClick={removeEvent}>
						<DeleteIcon />
						<ListItemText primary='Event' />
					</Button>
					<Button className={classes.backButton} onClick={goBack}>
						Back
					</Button>
				</footer>
			</div>
		</div>
	);
};

export default OneEvent;
