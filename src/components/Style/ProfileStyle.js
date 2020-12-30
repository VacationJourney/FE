import { makeStyles } from '@material-ui/core'
import Above from '../../assets/Above.jpg';
export const useStyles = makeStyles((theme) => ({
	profile: {
		backgroundImage: `url(${Above})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
		width: '100%',
		textAlign: 'center',
	},
	editUser: {
		marginTop:'10%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
	editInput: {
		width: '50%',
		margin: '1%',
		fontSize: '1.2rem',
	},
	footer: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		bottom: 0,
	},
	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		width: '30%',
	},
	paper: {
    position: 'absolute',
		width: '60%',
		textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
	deleteButton: {
		background: 'red',
		color: 'white',
		fontSize: '1rem',
		width: '30%',
	},
	deleteButtonModal: {
		background: 'red',
		color: 'white',
    fontSize: '1rem',
    padding: '2%',
		borderRadius: 4
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		marginTop: '5%',
	},
}))