import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  calendar: {
    width: '100%',
    background: 'rgb(255,255,255, 0.2)',
    color: '#01386a',
    boxShadow: '0 3px 3px'
    // border: '1px solid orange'
  },
  calTop: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  arrows: {
    fontSize: '2rem'
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
    gridRowGap: '2%',
    height: '28vh',
    background: 'rgb(255,255,255, 0.6)',
  },
  monthDates: {
    fontSize: '1.2rem',
    color: '#056099',
  },
  otherDates: {
    fontSize: '1.2rem',
    color: 'grey'
  },
  trip: {
    background: 'rgb(5,100,155,0.8)',
    fontSize: '1.2rem',
    color: 'white'
  }
}))