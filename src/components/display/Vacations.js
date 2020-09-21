import React, { useState } from 'react';
// dependencies
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import dayjs from 'dayjs';
// graphql queries
import {
	CREATE_VACATION,
	GET_VACATIONS,
	// DELETE_VACATION,
} from '../../graphQl/Index';
// imported component
import VCard from './VacationCard';
// styles
import { Container, TextField, Button, makeStyles } from '@material-ui/core';
// import { useStyles } from '../../Style/Styles';
import LightFlight from '../../assets/flight1.png';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	vacations: {
		backgroundImage: `url(${LightFlight})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
	},

	page: {
		width: '100%',
	},
	picker: {
		background: 'white',
		marginTop: '2%',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '1%',
	},

	vLink: {
		textDecoration: 'none',
		color: 'black',
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		// width: '40%',
		marginTop: '5%',
	},
	
	edit: {
		textDecoration: 'none',
		color: 'orange',
		fontSize: '1.5rem',
	},
}))


const Vacations = () => {
	const classes = useStyles();
	const { register, handleSubmit, reset } = useForm();
	const [value, onChange] = useState([new Date(), new Date()]);
	const range = [];

	// establish Date variables
	var from = new Date(value[0]);
	var to = new Date(value[1]);

	// // loop for every day
	for (from; from <= to; from.setDate(from.getDate() + 1)) {
		var date = dayjs(from).format('YYYY-MM-DD');
		// var date = from.toISOString();
		range.push({ date });
	}

	// Queries & Mutations
	// Create Vacation
	const [createVacation] = useMutation(CREATE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS }],
	});
	// Read Vacation
	const { data, loading, error } = useQuery(GET_VACATIONS);
	// Delete Vacation
	// const [deleteVacation] = useMutation(DELETE_VACATION, {
	// 	refetchQueries: mutationResult => [{ query: GET_VACATIONS }],
	// });

	// Grab User from token
	let token = localStorage.getItem('token');
	let tokenData = JSON.parse(atob(token.split('.')[1]));
	// console.log('tokenData', tokenData)
	let user = tokenData.id;

	const onSubmit = data => {
		data = {
			...data,
			traveler: user,
			dates: { create: range },
		};
		console.log('data', data);
		createVacation({ variables: data });
		reset();
	};

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	return (
		<div className={classes.root}>
			<Container className={classes.page} spacing={2}>
				<DateRangePicker
					onChange={onChange}
					value={value}
					className={classes.picker}
				/>

				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						required
						type='text'
						label='destination'
						name='title'
						// variant='outlined'
						inputRef={register({ required: true })}
					/>

					<Button type='submit' className={classes.submit}>
						Create
					</Button>
				</form>
				<VCard data={data} />
			</Container>
		</div>
	);
};

export default Vacations;
