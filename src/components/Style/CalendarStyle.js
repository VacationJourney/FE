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
    background: 'rgb(255,255,255, 0.6)',
  },
  monthDates: {
    fontSize: '1.2rem',
    color: '#056099',
    padding: '3px 0',
  },
  otherDates: {
    fontSize: '1.2rem',
    color: 'grey',
    padding: '2px',
  },
  trip: {
    background: 'rgb(5,100,155,0.6)',
    fontSize: '1.2rem',
    color: 'white',
    padding: '2px',
    // border: '0px solid'
  },
  tripDate: {
    background: 'white',
    color: '#056099',
    border: '2px solid #056099'
  },
  beyondDate: {
    background: 'rgb(5,100,155,0.6)',
    // color: 'fuchsia',
    padding: '2px',
    fontSize: '1.2rem',
  },
  date: {
    width: '100%',
    marginTop: '3%',
    background: 'rgb(255,255,255,0.6)'
  },
  dateTop: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgb(255,255,255,0.6)'
  },

}))