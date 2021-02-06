import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  // One Day component
  date: {
    position: 'relative',
    width: '100%',
    height: '60vh',
    overflow: 'hidden',
    marginTop: '2%',
    background: 'rgb(255,255,255,0.6)',
    boxSizing: 'border-box',
    objectFit: 'contain'
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
    fontSize: '3rem',
    transition: '.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.5)',
      color: '#ff66c3',
    }

  },
  eventsTopBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white'
  },
  eventsTopBoxLeft: {
    display: 'flex',
  },
  eventsTopBoxRight: {
    display: 'flex',
    alignItems: 'center'
  },
  dayCost: {
    display: 'flex',
    flexDirection: 'column',
    background: 'red',
    padding: ' 1% 3%',
    whiteSpace: 'nowrap'
  },
  deleteButton: {
    color: 'black',
    padding: 10,
    borderRadius: 0,
    transition: '.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.4)',
      color: 'red',
    }
  },

  deleteButtonRed: {
    background: 'black',
    color: 'white',
    fontSize: '1rem',
    padding: '3%',
    borderRadius: 4,
    transition: '.3s ease-in-out',
    '&:hover': {
      background: 'red',
      transform: 'scale(1.1)'
    }
  },
  addEventButton: {
    margin: '0 5px',
    transition: '.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.2)',
      color: 'rgb(5,100,155)'
    }
  },
  // Create Event Form
  createEvent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 6
  },
  eventInput: {
    width: '100%',
  },
  time: {
    width: '45%'
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
    transition: '.3s ease-in-out',
    '&:hover':{
      transform: 'scale(1.05)',
      background: 'black',
    }
  },
  eventsBox: {
    position: 'relative',
    paddingBottom: '30%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    boxSizing: 'border-box',
    textAlign: 'left'
  },

  event: {
    marginLeft: 100,
    padding: '1%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgb(5,100,155)',
    color: 'white',
    zIndex: 2
  },
  eventLong: {
    padding: '1%',
    margin: '1px',
    border: '0.8px solid white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgb(5,100,155)',
    color: 'white',
    zIndex: 2
  },
  eventRight: {
    display: 'flex',
    alignItems: 'center'
  },
  hour: {
    padding: '3% 0'
  },

}))