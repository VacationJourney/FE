import React from 'react';
import { useForm } from 'react-hook-form';

import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_ONE_TRIP, EDIT_VACATION } from '../../graphQl/Index';
import NavBar from './NavBar'
// import { useStyles } from '../../Style/Styles';
import { Button, TextField, makeStyles } from '@material-ui/core';
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
	editForm: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '70vh',
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		// width: '40%',
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
	let params = useParams();

	let trip = params.id;

	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: trip },
	});
	const [updateVacation] = useMutation(EDIT_VACATION);
	const { register, handleSubmit } = useForm();

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	// Grab User from token
	let token = localStorage.getItem('token');
	let tokenData = JSON.parse(atob(token.split('.')[1]));
	let user = tokenData.id;

	const onSubmit = data => {
		data = {
			...data,
			id: trip,
			traveler: user,
		};
		console.log(data);
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
			{/* <Typography variant="h3" className={classes.title2}>Edit</Typography> */}
			<form className={classes.editForm} onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={classes.input}
					type='text'
					label='title'
					defaultValue={data.vacation.title}
					name='title'
					inputRef={register}
				/>

				<Button className={classes.submit} type='submit' >Edit</Button>
			</form>

			<footer className={classes.footer2}>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
};

export default UpdateVacation;
