import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { clear } from '../../index';
import { LOGIN } from '../../graphQl/Index';

// import { useStyles } from '../../Style/Styles';
import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	login: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		margin: '1%',
	},
	regLink: {
		textDecoration: 'none',
		color: 'white',
		fontSize: '1.2rem'
	},
	loginForm: {
		// color: 'black',
		margin: 10,
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
	},
}));

const Login = () => {
	const classes = useStyles();
	const history = useHistory();
	const [login] = useMutation(LOGIN);
	const { register, handleSubmit } = useForm();
	const token = localStorage.getItem('token');
	const currentTime = Date.now().valueOf() / 1000;

	useEffect(() => {
		if (token) {
			const tokenData = JSON.parse(atob(token.split('.')[1]));
			if (tokenData.exp > currentTime) {
				/* check if token is expired */
				return history.push('/dashboard');
			} else {
				return localStorage.removeItem('token');
			}
		}
	});

	const onSubmit = data => {
		clear();
		data = {
			username: data.username.toLowerCase(),
			password: data.password.toLowerCase(),
		};
		console.log(data)
		login({ variables: data }).then(res => {
			localStorage.setItem('token', res.data.login.token);
			history.push('/dashboard');
		});
	};

	return (
		<div className={classes.login}>
			<div className={classes.loginBox}>
			<form onSubmit={handleSubmit(onSubmit)} xs={12} lg={3}>
				<TextField
					required
					label='username'
					className={classes.loginForm}
					type='text'
					name='username'
					inputRef={register({ required: true })}
				/>
				<TextField
					required
					label='password'
					className={classes.loginForm}
					type='password'
					name='password'
					inputRef={register({ required: true })}
				/>
				<Button type='submit' className={classes.submit}>
					Login
				</Button>
				
			</form>
			<Link  className={classes.regLink} to='/register'>
				Register
			</Link>
			</div >
		</div>
	);
};

export default Login;
