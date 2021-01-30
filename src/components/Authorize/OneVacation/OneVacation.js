import React, { useState, useEffect } from 'react'
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { CalendarContext } from '../../../context/CalendarContext'
import { useQuery } from '@apollo/react-hooks';
import dayjs from 'dayjs'
import Calendar from './Calendar/Index'
import Notes from './Notes'


// GraphQL
import { GET_ONE_TRIP } from '../../../graphQl/queries';

import { Typography, Grid, Paper, Hidden, Box } from '@material-ui/core';
import { useStyles } from '../../Style/OneVacayStyle'
import EditIcon from '@material-ui/icons/Edit';

const OneVacation = ({ userId }) => {
	const classes = useStyles();
	let { url } = useRouteMatch();
	let params = useParams();
	let vacationId = params.id;

	localStorage.setItem('vacationId', vacationId);
	const [balance, setBalance] = useState(0)
	const [selected, setSelected] = useState('')

	// GraphQL Hooks
	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: vacationId },
	});

	useEffect(() => {
		data && setSelected(data.vacation.dates[0].date)
	}, [data])

	useEffect(() => {
		if (data && data.vacation) {
			setBalance(data.vacation.budget + data.vacation.cost)
		}
	}, [data])

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	return (
		<CalendarContext.Provider value={ { userId, selected, setSelected } }>
			<div className={ classes.top }>
				<Typography variant='h3'>{ data.vacation.title }
				</Typography>
				<Link className={ classes.editLink } to={ `${url}/update` }>
					<EditIcon style={ { fontSize: 18 } } />
				</Link>
			</div>
			<Grid className={ classes.oneVacation } >
				<Grid item xs={ 12 } sm={ 12 } md={ 6 }>
					<div className={ classes.vacationCalendar }>
						<Calendar
							trip={ data.vacation }
						/>
					</div>
					<footer className={ classes.footer }>
						<div className={ classes.budget }><span>Budget</span>
							<span>${ data.vacation && data.vacation.budget }</span></div>
						<div className={ classes.cost }><span>Cost</span>
							<span>${ data.vacation && data.vacation.cost }</span></div>
						<div style={ balance >= 0 ? { background: 'black' } : { background: 'red' } } className={ classes.balance }><span>Balance</span>
							<span>${ balance }</span></div>
					</footer>
				</Grid>
				<Hidden smDown>
					<Notes />
				</Hidden>
			</Grid>
		</CalendarContext.Provider>
	)
}

export default OneVacation
