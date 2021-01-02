import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  // One Day component
  date: {
    position: 'relative',
    width: '100%',
    height: '50vh',
    overflow: 'hidden',
    marginTop: '3%',
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
    background: 'rgb(5,100,155,0.3)',
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
    padding: ' 2%',
    whiteSpace: 'nowrap'
  },
  deleteButton: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    background: 'black',
    color: 'red',
    fontSize: '1rem',
    // padding: '0 2%',
    width: '50%',
    borderRadius: '0 '
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
    width: '70%',
    boxSizing: 'border-box',
    zIndex: 6
  },

  eventInput: {
    width: '100%',
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
    overflow: 'auto',
    boxSizing: 'border-box',
    textAlign: 'left'
    // zIndex: 3
  },
  hour: {
    padding: '1%'
  },
  event: {
    padding: '1%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgb(5,100,155,0.6)',
    color: 'white',
    zIndex: 2
  },
  eventTime: {
    width: '45%'
  },


}))