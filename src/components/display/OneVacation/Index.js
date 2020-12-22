import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import NavBar from '../Nav/Index';
import {
	GET_ONE_TRIP,
	GET_VACATIONS
} from '../../../graphQl/queries';
import { DELETE_VACATION } from '../../../graphQl/mutations/vacationM'
// import dayjs from 'dayjs';

import { Typography, Button } from '@material-ui/core';
import { useStyles } from '../../Style/OneVacayStyle'
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Calendar from './Calendar/Index'


const Index = () => {
	const classes = useStyles();
	const history = useHistory();
	let params = useParams();
	let vacay = params.id;
	localStorage.setItem('vacay', vacay);

	const [cost, setCost] = useState(0)
	const [balance, setBalance] = useState(0)

	// GraphQL Hooks
	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: vacay },
	});

	const [deleteVacation] = useMutation(DELETE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS }],
	});

	useEffect(() => {
		if (data && data.vacation) {
			setBalance(data.vacation.budget - cost)
		}
	}, [data])

	// component functions
	const deleteTrip = () => {
		deleteVacation({ variables: { id: vacay } });
		history.push(`/dashboard`);
	};
	const goBack = () => {
		localStorage.removeItem('vacay');
		history.push(`/dashboard`);
	};

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	return (
		<div className={ classes.oneVacay }>
			<NavBar />
			<div className={ classes.OneVacation }>
				<div className={ classes.top }>
					<Link className={ classes.titleLink } to={ `/vacationUpdate/${vacay}` }>
						<Typography className={ classes.title }>{ data.vacation.title }
						</Typography>
					</Link>
				</div>
				<Calendar dates={ data.vacation.dates } />

			</div>
			
			<footer className={ classes.footer }>
				<Button className={ classes.deleteButton } onClick={ deleteTrip }>
					<DeleteIcon />
					<ListItemText primary='Trip' />
				</Button>
				<div className={ classes.calculations }>
				<div className={ classes.money }><span>Budget</span>
					<span>${ data.vacation && data.vacation.budget }</span></div>
				<div className={ classes.cost }><span>Cost</span>
					<span>${ cost }</span></div>
				<div className={ classes.money }><span>Balance</span>
					<span>${ balance }</span></div>
			</div>
				{/* <Button className={ classes.backButton } onClick={ goBack }>
					Back
				</Button> */}
			</footer>
		</div>
	);
};

export default Index;
