import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  
  eventDrawer: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    height: '76%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: '0.3s',
    background: 'white',
    zIndex: 5,
  },
  editModalButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '1%',
    zIndex: 6,
  },
  eventDetails: {
    fontSize: '1.5rem'
  },
  detail: {
    listStyle: 'none'
  },
  editEventForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    boxSizing: 'border-box',
  },
  eventInput: {

  },
  oneLine: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  submit: {
    background: 'black',
    color: 'white',
    fontSize: '1rem',
    marginTop: '5%',
  },
  deleteEvent:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: '1%',
    color: 'red'
    // fontSize: 'large'
  },
  closeEventDetails: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '1%',
    fontSize: '2rem'
  }
}))