import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles((theme) => ({
	top: {
		position: 'absolute',
		top: '1%',
		left: '50%',
		transform: 'translate(-50%, -1%)',
		display: 'flex',
	},
	editLink: {
		color: 'black',
		textDecoration: 'none',
		fontSize: '1rem',
		transition: '.3s ease-in-out',
		'&:hover': {
			transform: 'scale(1.2)',
			color: '#ff66c3'
		}

	},
	oneVacation: {
		display: 'flex',
	},
	vacationCalendar: {
		padding: '0 2%',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '80vh',
		[theme.breakpoints.up("md")]: {
			height: '75vh',
		}
	},
	calculations: {
		width: '80%',
		display: 'flex',
		background: 'white',
		fontSize: '1rem',
	},
	footer: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		background: 'white',
		borderBottom: '5px solid',
		fontSize: '1rem',
		bottom: 0,
		[theme.breakpoints.up("md")]: {
			fontSize: '2rem',
		}
	},
	budget: {
		display: 'flex',
		background: 'green',
		color: 'white',
		flexDirection: 'column',
		padding: '1%',
		width: '33%',
		[theme.breakpoints.up("md")]: {
			padding: '0.5%',
		}
		
	},
	balance: {
		display: 'flex',
		background: 'black',
		color: 'white',
		flexDirection: 'column',
		padding: '1%',
		width: '33%',
		[theme.breakpoints.up("md")]: {
			padding: '0.5%',
		}
		
	},
	cost: {
		display: 'flex',
		flexDirection: 'column',
		width: '33%',
		padding: '1%',
		color: 'red',
		[theme.breakpoints.up("md")]: {
			padding: '0.5%',
		}
	},
	
}));

