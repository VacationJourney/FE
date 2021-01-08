import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import dayjs from 'dayjs';
// graphql 
import { CREATE_VACATION } from '../../graphQl/mutations/vacationM';
import { GET_VACATIONS } from '../../graphQl/queries'
// imported component
import VacationCard from './VacationCard';
// styles
import { Container, TextField, Button } from '@material-ui/core';
import { useStyles } from '../Style/VacationsStyle'

const Vacations = () => {
	const classes = useStyles();
	const { register, handleSubmit, reset } = useForm();
	const [value, onChange] = useState([new Date(), new Date()]);

	// Queries & Mutations
	// Create Vacation
	const [createVacation] = useMutation(CREATE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS }],
	});
	// Read Vacation
	const { data, loading, error } = useQuery(GET_VACATIONS);

	const onSubmit = data => {
		const range = [];
		// establish Date variables
		var from = new Date(value[0]);
		var to = new Date(value[1]);
		// // loop for every day
		for (from; from <= to; from.setDate(from.getDate() + 1)) {
			var date = dayjs(from).format('YYYY-M-DD');
			range.push({ date });
		}

		range.forEach(d => d.cost = 0)

		data = {
			...data,
			budget: parseInt(data.budget),
			dates: range,
		};

		createVacation({ variables: data });
		reset();
	};

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	return (
		<div className={ classes.root }>
			<Container className={ classes.page } spacing={ 2 }>
				<DateRangePicker
					onChange={ onChange }
					value={ value }
					className={ classes.picker }
				/>
				<form className={ classes.form } onSubmit={ handleSubmit(onSubmit) }>
					<TextField
						required
						type='text'
						label='destination'
						name='title'
						inputRef={ register({ required: true }) }
					/>
					<TextField
						id="standard-number"
						label="Budget"
						type="number"
						name="budget"
						InputLabelProps={ {
							shrink: true,
						} }
						inputRef={ register({ required: true }) }
					/>
					<Button type='submit' className={ classes.submit }>
						Create
					</Button>
				</form>
				<VacationCard data={ data } />
			</Container>
		</div>
	);
};

export default Vacations;
