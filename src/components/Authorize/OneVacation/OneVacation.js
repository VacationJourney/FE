import React, { useState, useEffect } from 'react'
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext'
import { useQuery } from '@apollo/react-hooks';
import LogicHub from './LogicHub'

// GraphQL
import { GET_ONE_TRIP } from '../../../graphQl/queries';

import { Typography } from '@material-ui/core';
import { useStyles } from '../../Style/OneVacayStyle'
import EditIcon from '@material-ui/icons/Edit';

const OneVacation = ({ userId }) => {
	const classes = useStyles();
	let { url } = useRouteMatch();
	let params = useParams();
	let vacationId = params.id;

	const [balance, setBalance] = useState(0)

	// GraphQL Hooks
	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: vacationId },
	});

	useEffect(() => {
		if (data && data.vacation) {
			setBalance(data.vacation.budget + data.vacation.cost)
		}
	}, [data])

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	return (
		<UserContext.Provider value={ { userId } }>
			<div className={ classes.top }>
				<Typography variant='h3'>{ data.vacation.title }
				</Typography>
				<Link className={ classes.editLink } to={ `${url}/update` }>
					<EditIcon style={ { fontSize: 18 } } />
				</Link>
			</div>
			<LogicHub trip={data.vacation} />
			<footer className={ classes.footer }>
				<div className={ classes.budget }><span>Budget</span>
					<span>${ data.vacation && data.vacation.budget }</span></div>
				<div className={ classes.cost }><span>Cost</span>
					<span>${ data.vacation && data.vacation.cost }</span></div>
				<div style={ balance >= 0 ? { background: 'black' } : { background: 'red' } } className={ classes.balance }><span>Balance</span>
					<span>${ balance }</span></div>
			</footer>
		</UserContext.Provider>
	)
}

export default OneVacation
