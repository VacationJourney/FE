import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { USER, USER_UPDATE } from '../../graphQl/Index';
import NavBar from './NavBar';

import { Typography, TextField, Button, makeStyles } from '@material-ui/core';
// import { useStyles } from '../../Style/Styles';
import Above from '../../assets/Above.jpg';

const useStyles = makeStyles(() => ({
	settings: {
		backgroundImage: `url(${Above})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
		width: '100%',
		textAlign: 'center',
	},
	editUser: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '90%',
	},
	editInput: {
		margin: '2%',
		padding: '3%',
		fontSize: '1.2rem',
	},
}))

const Settings = () => {
	const classes = useStyles();
	const history = useHistory();
	const [editForm, setEditForm] = useState(false);
	const { register, handleSubmit } = useForm();

	const { data, loading, error } = useQuery(USER);

	const [userUpdate] = useMutation(USER_UPDATE, {
		refetchQueries: mutationResult => [{ query: USER }],
	});

	// Grab User from token
	let token = localStorage.getItem('token');
	let tokenData = JSON.parse(atob(token.split('.')[1]));
	// console.log('tokenData', tokenData)
	let user = tokenData.id;

	const editUser = () => {
		setEditForm(!editForm);
	};

	const onSubmit = data => {
		data.id = user
		console.log(data);
		userUpdate({ variables: data });
		setEditForm(!editForm);
		// reset();
	};

	const goBack = () => {
		history.push(`/dashboard`);
	};

	if (loading) return <h4>Loading...</h4>;
	if (error) return <p>ERROR</p>;

	return (
		<div className={classes.settings}>
			<NavBar />
			<Typography key={data.currentUser.id} variant='h3'>
				{data.currentUser && data.currentUser.username}
			</Typography>
			<Typography>{data.currentUser.email}</Typography>
			{editForm === false ? (
				''
			) : (
				<form className={classes.editUser} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						type='text'
						label='username'
						defaultValue={data.currentUser.username}
						className={classes.editInput}
						name='username'
						inputRef={register}
					/>
					<TextField
						type='email'
						label='email'
						defaultValue={data.currentUser.email}
						className={classes.editInput}
						name='email'
						inputRef={register}
					/>
					<TextField
						type='password'
						label='password'
						className={classes.editInput}
						name='password'
						inputRef={register}
					/>
					<Button className={classes.submit} type='submit' >Create</Button>
				</form>
			)}
			<footer className={classes.footer}>
				<Button className={classes.editButton} onClick={editUser}>
					Edit
				</Button>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
};

export default Settings;
