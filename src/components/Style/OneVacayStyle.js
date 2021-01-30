import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles(() => ({
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
		fontSize: '1rem'
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
	},
	budget: {
		display: 'flex',
		background: 'green',
		color: 'white',
		flexDirection: 'column',
		padding: '1%',
		width: '33%',
	},
	balance: {
		display: 'flex',
		background: 'black',
		color: 'white',
		flexDirection: 'column',
		padding: '1%',
		width: '33%',
	},
	cost: {
		display: 'flex',
		flexDirection: 'column',
		width: '33%',
		padding: '1%',
		color: 'red',
	},
	notes: {
		padding: '0 2%'

	},
	topNotesBox: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	},
	addNote: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontSize: '3rem'

	}
}));

