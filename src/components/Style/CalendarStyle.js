import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  calendar: {
    width: '100%',
    background: 'rgb(255,255,255, 0.2)',
    color: '#01386a',
    boxShadow: '0 3px 3px'
  },
  calTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgb(4,54,103)',
    color: 'white',
    borderRadius: '4px 4px 0 0'
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '80%'
  },
  addDateIcon: {
    fontSize: '1.5rem',
    transition: '.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      color: '#ff66c3',
    }
  },
  addDateButton: {
    color: 'grey',
    padding: 0
  },
  addDateText: {
    fontSize: '0.8rem'
  },
  arrows: {
    fontSize: '3rem',
    transition: '.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.5)',
      color: '#ff66c3',
    }

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
    transition: '.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      background: '#056099'
    }
  },
  tripDate: {
    background: 'white',
    color: '#056099',
    border: '2px solid #056099',
    transition: '.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      background: 'white',
    }
  },
  beyondDate: {
    background: 'rgb(5,100,155,0.6)',
    padding: '2px',
    fontSize: '1.2rem',
  },
  addDates: {
    background: '#ff66c3',
    color: 'black',
    border: '1px solid black',
    transition: '.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  },
  add: {
    fontSize: '10px'
  },
  dateTop: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgb(255,255,255,0.6)'
  },
  calculations: {
    marginTop: '2%',
    width: '100%',
    display: 'flex',
    background: 'white',
    fontSize: '1rem',
  },
  budget: {
    display: 'flex',
    background: 'green',
    color: 'white',
    flexDirection: 'column',
    padding: '1%',
    width: '33%',
  },
  money: {
    display: 'flex',
    background: 'black',
    color: 'white',
    flexDirection: 'column',
    padding: '1%',
    width: '33%',
  },
  cost: {
    display: 'flex',
    flexDirection: 'column',
    width: '33%',
    padding: '1%',
    color: 'red',
  },

}))