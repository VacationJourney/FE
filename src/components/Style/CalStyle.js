import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  calendar: {
    width: '100%',
    background: 'rgb(255,255,255, 0.2)',
    color: '#01386a',
    boxShadow: '0 3px 3px'
    // border: '1px solid orange'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    width: '100%',
    borderRadius: '4px',
    marginBottom: '2%',

  },
  weekdays: {
    display: 'flex',
    justifyContent: 'center',
    color: '#056099',
    padding: '1%',
    margin: '2%',
    height: 'auto',
    fontSize: '1.1rem'
   
  },
  datesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridRowGap: '3%',
    height: '25vh',
    background: 'rgb(255,255,255, 0.6)',
  },
  dates:{
    fontSize: '1.2rem',
    color: '#056099',
  },
  otherMonth: {
    fontSize: '1.2rem',
    color: 'grey'
  }
}))