import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import NavBar from '../Nav/Index';
import {
	GET_ONE_TRIP,
	GET_VACATIONS
} from '../../../graphQl/queries';
import { DELETE_VACATION } from '../../../graphQl/mutations/vacationM'
// import dayjs from 'dayjs';
import Modal from '../modal/Modal'
import { Typography, Button } from '@material-ui/core';
import { useStyles } from '../../Style/OneVacayStyle'
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Calendar from './Calendar/Index'


const Index = () => {
	const classes = useStyles();
	const deleteTripModal = useRef(null)
	const history = useHistory();
	let params = useParams();
	let vacationId = params.id;
	localStorage.setItem('vacationId', vacationId);

	const [balance, setBalance] = useState(0)

	// GraphQL Hooks
	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: vacationId },
	});

	const [deleteVacation] = useMutation(DELETE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS }],
	});

	useEffect(() => {
		if (data && data.vacation) {
			console.log('OneVacation -> data.vacation', data.vacation)
			setBalance(data.vacation.budget + data.vacation.cost)
		}
	}, [data])

	// component functions
	const deleteTrip = () => {
		deleteVacation({ variables: { id: vacationId } });
		history.push(`/dashboard`);
	};
	// const goBack = () => {
	// 	localStorage.removeItem('vacationId');
	// 	history.push(`/dashboard`);
	// };

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	return (
		<>
		<div className={ classes.oneVacay }>
			<NavBar />
			<div className={ classes.OneVacation }>
				<div className={ classes.top }>
					<Link className={ classes.titleLink } to={ `/vacationUpdate/${vacationId}` }>
						<Typography className={ classes.title }>{ data.vacation.title }
						</Typography>
					</Link>
				</div>
				<Calendar 
				trip={ data.vacation }
				deleteTrip={deleteTrip} />

			</div>
			
			<footer className={ classes.footer }>
				<Button className={ classes.deleteButton } onClick={ () => deleteTripModal.current.open() }>
					<DeleteIcon />
					<ListItemText primary='Trip' />
				</Button>
				
				<div className={ classes.calculations }>
				<div className={ classes.money }><span>Budget</span>
					<span>${ data.vacation && data.vacation.budget }</span></div>
				<div className={ classes.cost }><span>Cost</span>
					<span>${ data.vacation && data.vacation.cost }</span></div>
				<div className={ classes.money }><span>Balance</span>
					<span>${ balance }</span></div>
			</div>
				{/* <Button className={ classes.backButton } onClick={ goBack }>
					Back
				</Button> */}
			</footer>
		</div>
		<Modal ref={ deleteTripModal }>
        <Typography variant='h6'>
          Confirm deleting trip?
      </Typography>
        <Button
          className={ classes.deleteButtonModal } onClick={ deleteTrip }>
          <DeleteIcon />
          <ListItemText primary={data.vacation.title} />
        </Button>
      </Modal>
		</>
	);
};

export default Index;

