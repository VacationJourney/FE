import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({

	title2: {
		paddingTop: '10%',
		color: 'black',
	},
	edit: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '15%',
		alignItems: 'center',
		width: '100%',
		height: '70vh',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},

	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		marginTop: '5%',
	},
	footer2: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		bottom: 0,
	},
	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		width: '30%',
	},
}))