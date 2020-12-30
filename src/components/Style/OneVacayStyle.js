import { makeStyles } from '@material-ui/core'
import Blue from '../../assets/Blue.jpg'

export const useStyles = makeStyles(() => ({
	oneVacay: {
		maxWidth: '100%',
		minHeight: '100vh',
		// background: '#45a7bcba',
		backgroundImage: `url(${Blue})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
	},
	OneVacation: {
		width: '100%',
		padding: '0 2%',
		marginTop: '-9%',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// border: '1px solid red'
	},
	top: {
		display: 'flex',
		justifyContent: 'center',
		// padding: '1%',
		// marginBottom: '2%',
	},
	titleLink: {
		color: 'black',
		textDecoration: 'none',
	},
	title: {
		fontSize: '2rem',
	},
	// eventConnect: {
	// 	textDecoration: 'none',
	// 	color: 'black',
	// },

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
		bottom: 0,
	},
	xButton: {
		color: 'red',
		fontSize: '1rem',
	},
	deleteButton: {
		background: 'red',
		color: 'white',
		fontSize: '1rem',
		width: '20%',
		borderRadius: 0
	},
	deleteButtonModal: {
		background: 'red',
		color: 'white',
    fontSize: '1rem',
    padding: '2%',
		borderRadius: 4
	},
	money: {
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

	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		width: '20%',
		borderRadius: 0
	},

}));

