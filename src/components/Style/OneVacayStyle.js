import { makeStyles } from '@material-ui/core'
import Blue from '../../assets/Blue.jpg'

export const useStyles = makeStyles(() => ({
	oneVacay: {
		maxWidth: '100%',
		minHeight: '100vh',
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
	},
	top: {
		display: 'flex',
		justifyContent: 'center',
	},
	title: {
		fontSize: '2rem',
	},
	editLink: {
		color: 'black',
		textDecoration: 'none',
		fontSize: '1rem'
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
		borderBottom: '15px outset',
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
	}
}));

