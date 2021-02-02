import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  notesEdge: {
		padding: '0 2%',
	},
	notesBox: {
		position: 'relative',
		background: 'rgb(255,255,255, 0.6)',
		height: '80vh',
		[theme.breakpoints.up("md")]: {
			height: '75vh',
		},
	},
	topNotesBox: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		background: 'rgb(4,54,103)',
		color: 'white',
		borderRadius: '4px 4px 0 0'
	},
	addNoteBtn: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontSize: '2.5rem'
	},
	notes: {

	},
	noteForm: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	input: {
		margin: '1%',
		width: '90%',
		borderRadius: 4,
		fontSize: '2rem'
	},
	createNoteBtn: {
		background: 'rgb(5,100,155)',
		color: 'white',
		width: '60%',
		fontSize: '2rem',
		borderRadius: '0 0 4px 4px ',
		margin: '1%',
	},
	noteBox: {
		margin: '1% ',
		borderRadius: '4px ',
		color: 'rgb(5,100,155)',
		background: 'white',
		border: '1px solid rgb(5,100,155)'
	},
	noteTop: {
		background: 'rgb(5,100,155)',
		color: 'white',
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: '4px 4px 0 0'
	},
	noteIdea: {
		fontSize: '1.3rem',
		color: 'rgb(5,100,155)'
	},
	deleteNote: {
		color: 'white'
	},
	deleteButtonRed: {
		background: 'red',
		color: 'white',
		fontSize: '1rem',
		padding: '2%',
	},
	updateForm: {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	},
	updateInput: {
		margin: '1% 0',
		borderRadius: 4,
		border: '2px solid rgb(5,100,155)',
		fontSize: '2rem',
		color: 'rgb(5,100,155)'
	},
	updateNoteBtn: {
		background: 'rgb(5,100,155)',
		color: 'white',
		width: '60%',
		fontSize: '2rem',
		borderRadius: 4,
		margin: '1%',
	},
}))