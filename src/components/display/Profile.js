import React, { useState } from 'react';
import { clear } from '../../index';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {  UPDATE_USER, DELETE_USER } from '../../graphQl/mutations/userM';
import { USER} from '../../graphQl/queries'
import NavBar from './NavBar';

import { Typography, Modal, TextField, Button, makeStyles } from '@material-ui/core';

import Above from '../../assets/Above.jpg';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
	profile: {
		backgroundImage: `url(${Above})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
		width: '100%',
		textAlign: 'center',
	},
	editUser: {
		marginTop:'10%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
	editInput: {
		width: '50%',
		margin: '1%',
		fontSize: '1.2rem',
	},
	footer: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		bottom: 0,
	},
	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		width: '30%',
	},
	paper: {
    position: 'absolute',
		width: '60%',
		textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
	deleteButton: {
		background: 'red',
		color: 'white',
		fontSize: '1rem',
		width: '30%',
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		marginTop: '5%',
	},
}))

const Profile = () => {
	const classes = useStyles();
	const history = useHistory();
	// const [editForm, setEditForm] = useState(false);
	const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
	const { register, handleSubmit } = useForm();

	const { data, loading, error } = useQuery(USER);

	const [userUpdate] = useMutation(UPDATE_USER, {
		refetchQueries: mutationResult => [{ query: USER }],
	});

	const [ deleteUser] = useMutation(DELETE_USER)

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

	// For Deleting User Modal
	const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
	};
	
	const goBack = () => {
		history.push(`/dashboard`);
	};

	const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Confirm Delete User</h2>
      <Button className={classes.deleteButton} onClick={() => deleteMe()}>Delete</Button>
    </div>
	);

	const deleteMe = () => {
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
		<div className={classes.profile}>
			<NavBar />
			
			<Typography key={data.currentUser.id} variant='h3'>
				{data.currentUser && name}
			</Typography>
			<Typography>{data.currentUser.email}</Typography>
				<form className={classes.editUser} xs={12} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						type='text'
						label='username'
						defaultValue={name}
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
						defaultValue={data.currentUser.password}
						name='password'
						inputRef={register}
					/>
					<Button className={classes.submit} type='submit' >Edit</Button>
				</form>
				<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
		
			<footer className={classes.footer}>
				<Button className={classes.deleteButton} onClick={handleOpen}>
					Delete
				</Button>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
};

export default Profile;
