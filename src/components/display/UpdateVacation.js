import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

import { useParams, useHistory } from 'react-router-dom';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import dayjs from 'dayjs';
// graphql 
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_VACATION } from '../../graphQl/mutations/vacationM';
import {GET_ONE_TRIP} from '../../graphQl/queries'
import NavBar from './NavBar'
// styles
import { Container, Button, TextField, makeStyles, Typography } from '@material-ui/core';
import Airy from '../../assets/Airy.jpg';

const useStyles = makeStyles(() => ({
	updateVacation: {
		maxWidth: '100%',
		minHeight: '100vh',
		backgroundImage: `url(${Airy})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
	},
	title2: {
		paddingTop: '10%',
		color: 'black',
	},
	edit: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '15%',
		alignItems: 'center',
		width: '100%',
		height: '70vh',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},

	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		marginTop: '5%',
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
}))

const UpdateVacation = () => {
	const history = useHistory();
	const classes = useStyles();

	const { register, handleSubmit } = useForm();
	const [value, onChange] = useState([new Date(), new Date()]);
	const range = [];

	// establish Date variables
	var from = new Date(value[0]);
	var to = new Date(value[1]);

	// loop for every day
	for (from; from <= to; from.setDate(from.getDate() + 1)) {
		var date = dayjs(from).format('YYYY-MM-DD');
		// var date = from.toISOString();
		range.push({ date });
	}

	let params = useParams();
	let trip = params.id;

	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: trip },
	});
	const [updateVacation] = useMutation(UPDATE_VACATION, {
		refetchQueries: mutationResult => [{query: GET_ONE_TRIP, variables: {id: trip}}]
	});
	

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	var lastDate = (data.vacation.dates.length) - 1;
	
	var from = dayjs(data.vacation.dates[0].date).format('MMM DD');
	var end = dayjs(data.vacation.dates[lastDate].date).format('MMM DD')

	const onSubmit = data => {
		data = {
			...data,
			id: trip,
			dates: range,
		};
		// console.log('updateInfo',data);
		updateVacation({ variables: data });
		history.push(`/vacation/${trip}`);
	};

	const goBack = () => {
		const vacay = localStorage.getItem('vacay');
		history.push(`/vacation/${vacay}`);
	};

	return (
		<div className={classes.updateVacation}>
			<NavBar />
			<Typography variant='h3'>{data.vacation.title}</Typography>
	<Typography variant='h6'>{from+ ' - ' + end}</Typography>
			<Container className={classes.edit} spacing={2}>
			<DateRangePicker
					onChange={onChange}
					value={value}
					className={classes.picker}
				/>
			<form  className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<TextField
					
					type='text'
					label='title'
					defaultValue={data.vacation.title}
					name='title'
					inputRef={register}
				/>

				<Button className={classes.submit} type='submit' >Edit</Button>
			</form>
			</Container>
			<footer className={classes.footer2}>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
};

export default UpdateVacation;
