import { makeStyles } from '@material-ui/core'
import LightFlight from '../../assets/flight1.png';
export const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	vacations: {
		backgroundImage: `url(${LightFlight})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
	},
	page: {
		width: '100%',
	},
	picker: {
		background: 'white',
		marginTop: '2%',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '1%',
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		marginTop: '5%',
	},
	edit: {
		textDecoration: 'none',
		color: 'orange',
		fontSize: '1.5rem',
	},
	// VacationCard
	vLink: {
		textDecoration: 'none',
		color: 'black',
		width: '100%',
		'&:hover': {
			color: 'pink',
		}
	},
	vacationCard: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		transition: '0.3s ease-in-out',
		'&:hover': {
			transform: 'scale(1.1)',
			background: 'black',
			boxShadow: '0 3px 3px'
		}
	},
	deleteButton: {
		position: 'absolute',
		color: 'red',
		left: '0%',
	
	},
	deleteButtonRed: {
    background: 'black',
    color: 'white',
    fontSize: '1rem',
    padding: '3%',
    borderRadius: 4,
    transition: '.3s ease-in-out',
    '&:hover': {
      background: 'red',
      transform: 'scale(1.1)'
    }
  },
}))