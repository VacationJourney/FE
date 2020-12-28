import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  // One Day component
  date: {
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

}))