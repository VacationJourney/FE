import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../../graphQl/Index';

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
	const { register, handleSubmit } = useForm();

	const onSubmit = data => {
		console.log(data);
		signUp({ variables: data });
		history.push('/');
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
				required
					type='text'
					label='email'
					className={classes.regInput}
					name='email'
					inputRef={register({ required: true })}
				/>
				<TextField
				required
					type='password'
					label='password'
					className={classes.regInput}
					name='password'
					inputRef={register({ required: true })}
				/>

				<Button type='submit' className={classes.submit}>Register</Button>
			</form>
			<footer className={classes.footer2}>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
}
