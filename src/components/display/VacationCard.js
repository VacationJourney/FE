import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_VACATION } from '../../graphQl/mutations/vacationM';
import { GET_VACATIONS } from '../../graphQl/queries'
import { Grid, Card, Typography, Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '../display/modal/Modal'
import { useStyles } from '../Style/VacationsStyle'

const VacationCard = ({ data }) => {
	const classes = useStyles();
	const deleteTripModal = useRef(null)
	// GraphQL
	const [deleteVacation] = useMutation(DELETE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS }],
	});

	return (
		<div className={ classes.root }>
			<Grid container spacing={ 2 }>
				{ data.vacations.map(trip => (
					<Grid item key={ trip.id } xs={ 12 } sm={ 6 } md={ 3 } lg={ 3 }>

						<Card className={ classes.vacationCard }>
							<Link className={ classes.vLink } to={ `/vacation/${trip.id}` }>
								<Typography variant='h5'>
									{ trip.title }
								</Typography>
							</Link>
							<Button className={ classes.deleteButton } 
							onClick={ () => deleteTripModal.current.open() }>
								<DeleteIcon />
							</Button>
						</Card>
						<Modal ref={ deleteTripModal }>
							<Typography variant='h6'>
								Confirm deleting trip?
      				</Typography>
							<Button
								className={ classes.deleteButtonRed }
								onClick={ () => (deleteVacation({ variables: { id: trip.id } }), deleteTripModal.current.close()) }>
								<DeleteIcon />
								<ListItemText primary={ trip.title } />
							</Button>
						</Modal>
					</Grid>
				)) }
			</Grid>
		</div>
	);
};

export default VacationCard;
