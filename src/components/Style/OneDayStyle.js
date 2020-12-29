import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  // One Day component
  date: {
    position: 'relative',
    width: '100%',
    height: '50vh',
    marginTop: '3%',
    background: 'rgb(255,255,255,0.6)'
  },
  dateTop: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgb(4,54,103)',
    color: 'white',
    borderRadius: '4px 4px 0 0'
  },
  arrows: {
    fontSize: '3rem'
  },
  eventBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
  },
  // Create Event Form
  createEvent: {
		display: 'flex',
		flexDirection: 'column',
		width: '70%',
		boxSizing: 'border-box',
	},
	eventInput: {
		width: '100%',
	},
	time: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		marginTop: '5%',
	},
  dayCost: {
    display: 'flex',
    flexDirection: 'column',
    background: 'red',
    padding: '.5% 2%',
  },
  event: {
    display: 'flex',
    justifyContent: 'space-evenly',
    background: 'rgb(5,100,155,0.6)',
    color: 'white'
  },
  deleteButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
		background: 'black',
		color: 'red',
    fontSize: '1rem',
    padding: '1%',
		// width: '20%',
		borderRadius: '0 4px 0 4px'
  },
  deleteButtonRed: {
		background: 'red',
		color: 'white',
    fontSize: '1rem',
    padding: '2%',
		// width: '20%',
		borderRadius: 4
	},

}))