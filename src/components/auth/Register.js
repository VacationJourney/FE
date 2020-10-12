import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP} from '../../graphQl/mutations/userM';

// Styling imports
import {
	TextField,
	Typography,
	makeStyles,
	Button,
	Snackbar,
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import LightBlue from '../../assets/lightBlue.jpg';

function Alerts(props) {
	return <Alert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	register: {
		backgroundImage: `url(${LightBlue})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
		// textAlign: 'center',
	},
	regForm: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		// width: '70%',
	},
	regInput: {
		margin: '1%',
		fontSize: '1.5rem',
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
}));

export default function App() {
	const classes = useStyles();
	const history = useHistory();
	const [signUp] = useMutation(SIGN_UP, {errorPolicy: 'all'});
	const { register, handleSubmit, reset } = useForm();
	const [error, setError] = useState(null);
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const onSubmit = async data => {
		data = {
			...data,
			username: data.username.toLowerCase(),
			password: data.password.toLowerCase(),
		};

		await signUp({ variables: data }).then(response => {
			console.log('signup', response.data)
			var phrase = response.data.signUp.message;
			if (phrase) {
				var message = phrase.charAt(0).toUpperCase() + phrase.slice(1);
				setError(message);
				setOpen(true);
				reset();
				return;
			} else {
					localStorage.setItem('token', response.data.signUp.token);
					history.push('/dashboard');
			}
		});
	};

	const goBack = () => {
		history.push(`/`);
	};

	return (
		<div className={classes.register}>
			<form className={classes.regForm} onSubmit={handleSubmit(onSubmit)}>
				<Typography variant='h2'>Register</Typography>
				<TextField
					required
					type='text'
					label='username'
					className={classes.regInput}
					name='username'
					inputRef={register({ required: true })}
				/>
				<TextField
					type='text'
					label='email'
					className={classes.regInput}
					name='email'
					inputRef={register()}
				/>
				<TextField
					required
					type='password'
					label='password'
					className={classes.regInput}
					name='password'
					inputRef={register({ required: true })}
				/>

				<Button type='submit' className={classes.submit}>
					Register
				</Button>
			</form>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alerts severity="error" onClose={handleClose} >
					{error}
				</Alerts>
			</Snackbar>
			<footer className={classes.footer2}>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
}
