import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  // One Day component
  date: {
    position: 'relative',
    width: '100%',
    height: '45vh',
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
    fontSize: '3rem'
  },
  eventsTopBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white'
  },
  eventsTopBoxLeft: {
    display: 'flex',
    width: '40%',
  },
  eventsTopBoxRight: {
    display: 'flex'
  },
  dayCost: {
    display: 'flex',
    flexDirection: 'column',
    background: 'red',
    padding: ' 1% 3%',
    whiteSpace: 'nowrap'
  },
  deleteButton: {
    background: 'black',
    color: 'red',
    fontSize: '1rem',
    // width: '30%',
    borderRadius: 0
  },
  deleteButtonRed: {
    background: 'red',
    color: 'white',
    fontSize: '1rem',
    padding: '2%',
    borderRadius: 4
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
    marginLeft:100,
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