import React, { useRef } from 'react';
import { clear } from '../../index';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_USER, DELETE_USER } from '../../graphQl/mutations/userM';
import { USER } from '../../graphQl/queries'

import NavBar from './Nav/Index';
import Modal from '../display/modal/Modal'
import { Typography, TextField, Button, ListItemText } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
import { useStyles } from '../Style/ProfileStyle'

const Profile = () => {
	const classes = useStyles();
	const deleteProfileModal = useRef(null)
	const history = useHistory();
	const { register, handleSubmit } = useForm();

	const { data, loading, error } = useQuery(USER);

	const [userUpdate] = useMutation(UPDATE_USER, {
		refetchQueries: mutationResult => [{ query: USER }],
	});

	const [deleteUser] = useMutation(DELETE_USER)

	// Grab User from token
	let token = localStorage.getItem('token');
	let tokenData = JSON.parse(atob(token.split('.')[1]));
	let user = tokenData.id;

	const onSubmit = data => {
		data = {
			...data,
			id: user,
			username: data.username.toLowerCase(),
			password: data.password.toLowerCase(),
		};
		userUpdate({ variables: data });
		history.push(`/dashboard`)
	};

	const goBack = () => {
		history.push(`/dashboard`);
	};

	const deleteProfile = () => {
		deleteUser({ variables: { id: user } });
		localStorage.removeItem('token');
		clear();
		history.push(`/`);
	};

	if (loading) return <h4>Loading...</h4>;
	if (error) return <p>ERROR</p>;

	// Uppercase the username
	var lowName = data.currentUser.username.toLowerCase()
	var name = lowName.charAt(0).toUpperCase() + lowName.slice(1)

	return (
		<>
		<div className={ classes.profile }>
			<NavBar />

			<Typography key={ data.currentUser.id } variant='h3'>
				{ data.currentUser && name }
			</Typography>
			<Typography>{ data.currentUser.email }</Typography>
			<form className={ classes.editUser } xs={ 12 } onSubmit={ handleSubmit(onSubmit) }>
				<TextField
					type='text'
					label='username'
					defaultValue={ name }
					className={ classes.editInput }
					name='username'
					inputRef={ register }
				/>
				<TextField
					type='email'
					label='email'
					defaultValue={ data.currentUser.email }
					className={ classes.editInput }
					name='email'
					inputRef={ register }
				/>
				<TextField
					type='password'
					label='password'
					className={ classes.editInput }
					defaultValue={ data.currentUser.password }
					name='password'
					inputRef={ register }
				/>
				<Button className={ classes.submit } type='submit' >Edit</Button>
			</form>
			<footer className={ classes.footer }>
				<Button className={ classes.deleteButton } onClick={ () => deleteProfileModal.current.open() }>
					<DeleteForeverIcon />
					<PersonIcon />
				</Button>
				<Button className={ classes.backButton } onClick={ goBack }>
					Back
				</Button>
			</footer>
		</div>
		<Modal ref={ deleteProfileModal }>
        <Typography variant='h6'>
          Confirm deleting profile?
      </Typography>
        <Button
          className={ classes.deleteButtonModal } onClick={ deleteProfile }>
          <DeleteForeverIcon />
          <ListItemText primary={ data.currentUser.username } />
        </Button>
      </Modal>
		</>
	);
};

export default Profile;
