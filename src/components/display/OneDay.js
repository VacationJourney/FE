import React, { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import dayjs from 'dayjs';

import NavBar from './Nav/Index';
import { CREATE_EVENT, DELETE_EVENT } from '../../graphQl/mutations/eventM';
import { GET_ONE_DATE} from '../../graphQl/queries'

import {TextField, Typography, Grid, Button, Card, makeStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Lavendar from '../../assets/Lavendar.jpg';

const useStyles = makeStyles(() => ({
	oneDay: {
		maxWidth: '100%',
		minHeight: '100vh',
		backgroundImage: `url(${Lavendar})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
	},
	day: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	createEvent: {
		display: 'flex',
		flexDirection: 'column',
		width: '70%',
		boxSizing: 'border-box',
	},
	eventInput: {
		width: '100%',
	},
	time: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		marginTop: '5%',
	},
	events: {
		width: '100%',
		padding: '2%',
		marginBottom: '12%',
	},
	eventCard: {
		opacity: '.7',
		background: 'white',
	},
	eventText: {
		color: 'black',
	},
	eventConnect: {
		textDecoration: 'none',
		color: 'black',
	},
		vLink: {
		textDecoration: 'none',
		color: 'black',
	},
	footer2: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		bottom: 0,
	},
	
	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		width: '30%',
	},
}));


const OneDay = () => {
	const classes = useStyles();
	const history = useHistory();

	// acquire the params and set to localStorage
	let params = useParams();
	let day = params.id;
	localStorage.setItem('day', day);

	const [eventData, setEventData] = useState({
		title: '',
		startTime: '',
		endTime: '',
		location: '',
		contact: '',
		cost: null,
		description: '',
		date: day,
	});

	// Query a single Date with all the events
	const { data, loading, error } = useQuery(GET_ONE_DATE, {
		variables: { id: day },
	});

	// Create an event
	const [createEvent] = useMutation(CREATE_EVENT, {
		refetchQueries: mutationResult => [
			{ query: GET_ONE_DATE, variables: { id: day } },
		],
	});

	// Delete an event
	const [deleteEvent] = useMutation(DELETE_EVENT, {
		refetchQueries: mutationResult => [
			{ query: GET_ONE_DATE, variables: { id: day } },
		],
	});

	const handleChange = e => {
		setEventData({
			...eventData,
			[e.target.name]: e.target.value,
		});
	};

	const numberChange = e => {
		setEventData({
			...eventData,
			[e.target.name]: e.target.valueAsNumber,
		});
	};

	const createFun = e => {
		e.preventDefault();
		var from = data.day.date + 'T' + eventData.startTime;
		if (eventData.endTime !== '') {
			var to = data.day.date + 'T' + eventData.endTime;
			eventData.endTime = to;
		} else {
			eventData.endTime = '';
		}
		eventData.startTime = from;

		createEvent({ variables: eventData });
	};

	const goBack = () => {
		localStorage.removeItem('day');
		const vacay = localStorage.getItem('vacay');
		history.push(`/vacation/${vacay}`);
	};

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;
	// console.log(data.day.date);
	return (
		<div className={classes.oneDay}>
			<NavBar />
			<Typography variant='h3'>
				{dayjs(data.day.date).format('MMM DD, YYYY')}
			</Typography>
			<div className={classes.day}>
				<form className={classes.createEvent} onSubmit={createFun}>
					<div>
						<TextField
							className={classes.eventInput}
							label='Title'
							type='text'
							name='title'
							value={eventData.title}
							onChange={handleChange}
						/>
					</div>
					<div className={classes.time}>
						<TextField
							type='time'
							name='startTime'
							value={eventData.startTime}
							onChange={handleChange}
						/>
						to
						<TextField
							type='time'
							name='endTime'
							value={eventData.endTime}
							onChange={handleChange}
						/>
					</div>

					<div className={classes.time}>
						<TextField
							className={classes.eventInput}
							type='text'
							label='location'
							name='location'
							value={eventData.location}
							onChange={handleChange}
						/>
						<sp />
						<TextField
							className={classes.eventInput}
							type='number'
							label='$'
							name='cost'
							value={eventData.cost}
							onChange={numberChange}
						/>
					</div>
					<div>
						<TextField
							className={classes.eventInput}
							type='text'
							label='contact'
							name='contact'
							value={eventData.contact}
							onChange={handleChange}
						/>
					</div>

					<div>
						<TextField
							className={classes.eventInput}
							type='text'
							label='description'
							name='description'
							value={eventData.description}
							onChange={handleChange}
						/>
					</div>
					<Button type='submit' className={classes.submit}>
						Create
					</Button>
				</form>

				<Grid container className={classes.events} spacing={2}>
					{data.day.events.map(event => (
						<Grid item xs={6} sm={3} md={2}>
							<Card key={event.id} className={classes.eventCard}>
								<Link className={classes.vLink} to={`/event/${event.id}`}>
									<Typography className={classes.eventText} variant='h5'>
										{event.title}
									</Typography>
									<Typography className={classes.eventText} variant='h6'>
										{dayjs(event.startTime).format('h:mm a')}
									</Typography>
								</Link>
								<DeleteIcon
									className={classes.xButton}
									onClick={() => deleteEvent({ variables: { id: event.id } })}
								/>
							</Card>
						</Grid>
					))}
				</Grid>
				<footer className={classes.footer2}>
					<Button className={classes.backButton} onClick={goBack}>
						Back
					</Button>
				</footer>
			</div>
		</div>
	);
};

export default OneDay;
