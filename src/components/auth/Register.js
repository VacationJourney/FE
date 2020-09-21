import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP, LOGIN } from '../../graphQl/Index';

// Styling imports
import { TextField, Typography, makeStyles, Button } from '@material-ui/core';
import LightBlue from '../../assets/lightBlue.jpg';

const useStyles = makeStyles(() => ({
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
}));
export default function App() {
	const classes = useStyles();
	const history = useHistory();
	const [signUp] = useMutation(SIGN_UP);
	const [login] = useMutation(LOGIN);
	const { register, handleSubmit } = useForm();

	const onSubmit = async data => {
		data = {
			...data,
			username: data.username.toLowerCase(),
			password: data.password.toLowerCase(),
		};
		await signUp({ variables: data });
		var credentials = {
			username: data.username,
			password: data.password,
		};
		await login({ variables: credentials }).then(res => {
			localStorage.setItem('token', res.data.login.token);
			history.push('/dashboard');
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
					// placeholder='username'
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
			<footer className={classes.footer2}>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
}
