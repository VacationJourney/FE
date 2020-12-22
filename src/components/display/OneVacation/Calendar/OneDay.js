import React from 'react'
import dayjs from 'dayjs'
import useDate from '../../../../hooks/useDate'
import { Paper, Typography, Card } from '@material-ui/core'
import { useStyles } from '../../../Style/OneDayStyle'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddBoxIcon from '@material-ui/icons/AddBox';


const OneDay = ({ selected, setSelected, dates, date, start, end, lastMonth, nextMonth, tripCal }) => {
  const classes = useStyles()
  // de-Structure from useDateHook
  const { firstDateOfMonth, lastDateOfMonth } = useDate(date)

  // vars to navigate dates
  const pastDate = dayjs(selected).subtract(1, 'Day').format('YYYY-M-D')
  const futureDate = dayjs(selected).add(1, 'Day').format('YYYY-M-D')
  // TripDates Array
  const tripDates = []
  dates.forEach(d => tripDates.push(d.date))

  // fns to navigate dates jumping thru months
  const lastDate = () => {
    // console.log('pastDate', pastDate)
    if (!tripDates.includes(pastDate)) {
      setSelected(start)
    } else if (tripDates.includes(pastDate)) {
      if (parseInt(dayjs(pastDate).format('D')) === lastDateOfMonth.$D) {
        lastMonth()
        setSelected(pastDate)
      } else {
        setSelected(pastDate)
      }
    }
  }
  const nextDate = () => {
    if (!tripDates.includes(futureDate)) {
      setSelected(end)
    } else if (tripDates.includes(futureDate)) {
      if (parseInt(dayjs(futureDate).format('D')) === firstDateOfMonth.$D) {
        nextMonth()
        setSelected(futureDate)
      } else {
        setSelected(futureDate)
      }
    }
  }
  // console.log('tripCal[selected]', tripCal[selected])
  return (
    <Paper className={ classes.date }>
      <div className={ classes.dateTop }>
        <ArrowLeftIcon className={ classes.arrows }
          onClick={ lastDate }
        />
        <Typography variant='h5'>{ dayjs(selected).format('MMM D') }</Typography>
        <ArrowRightIcon className={ classes.arrows }
          onClick={ nextDate }
        />
      </div>
      <div>
        <AddBoxIcon />
      </div>
      {tripCal[selected] && tripCal[selected].events.map((e) => (
        <Card>{e.title} </Card>
      ))}
    </Paper>
  )
}

export default OneDay
