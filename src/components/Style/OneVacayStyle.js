import {makeStyles} from '@material-ui/core'
import Blue from '../../assets/Blue.jpg'

export const useStyles = makeStyles(() => ({
	oneVacay: {
		maxWidth: '100%',
		minHeight: '100vh',
		background: '#45a7bcba',
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
		padding: '1%',
		marginBottom: '4%',
	},
	budget: {
		position: 'absolute',
		top: '0%',
		left: ' 0%',
		display: 'flex',
		flexDirection: 'column',
		padding: '1%',
		background: 'black',
		color: 'white',
		fontSize: '1.4rem',
		borderRadius: '0 0 4px 0'
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
		position: 'absolute',
		bottom: '0%',
		left: '50%',
		transform: 'translateX(-50%)',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		background: 'white',
		fontSize: '1rem',

	},
	balance: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1%',
		width: '25%',

	},
	cost: {
		display: 'flex',
		flexDirection: 'column',
		width: '25%',
		padding: '1%',
		color: 'red',

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
	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		width: '20%',
		borderRadius: 0
	},
}));

