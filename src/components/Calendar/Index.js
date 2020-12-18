import React, { useState } from 'react'
import dayjs from 'dayjs'
// import "./calendar.css"
import useDate from '../../hooks/useDate'
import { Paper, Grid, Typography } from '@material-ui/core'
import { useStyles } from '../Style/CalStyle'

const Index = ({ dates }) => {
  const classes = useStyles()
  const tripStart = dates[0].date
  const [date, setDate] = useState(dayjs(tripStart))

  // de-Structure from useDateHook
  const {
    currentDay,
    tripMonth,
    tripYear,
    daysInMonth,
    firstDateOfMonth,
    lastDateOfMonth,
    firstWeekday,
    lastWeekday,
    weekDays
  } = useDate(date)

  const prevMonth = date.subtract(1, 'Month')
  const nextMonth = date.add(1, 'Month')

  // first weekday is length of previousMonth Array
  // create Arrays for previousDays, Month, nextDays
  const previousMonthDays = prevMonth.daysInMonth()
  const prevDays = []
  for (let i = previousMonthDays; prevDays.length < firstWeekday; i--) {
    prevDays.unshift(i)
  }
  const month = [...Array(daysInMonth).keys()]
  const monthArray = []
  month.forEach(i => monthArray.push(i + 1))

  const nextDays = []
  for (let i = 1; i < 7 - lastWeekday; i++) {
    nextDays.push(i)
  }

  // const totalDays = prevDays.concat(monthArray, nextDays)




  // fns to navigate months
  // const prevMonth = () => {
  //   setDate(date.subtract(1, 'Month'))
  // }
  // const nextMonth = () => {
  //   setDate(date.add(1, 'Month'))
  // }

  return (
    <Paper className={ classes.calendar }>
      <Typography variant='h5'>{ date.format('MMMM YYYY') }</Typography>
      <Grid container className={ classes.grid }>
        { weekDays.map(day => (
          <Grid className={ classes.weekdays } item key={ day }>
            {day }
          </Grid>
        )) }
      </Grid>
      <Grid container className={ classes.datesGrid }>
        { prevDays.map(date => (
          <Grid className={ classes.otherMonth} item key={ date }>
            {date }
          </Grid>
        )) }
        { monthArray.map(date => (
          <Grid className={ classes.dates } item key={ date }>
            {date }
          </Grid>
        )) }
        { nextDays.map(date => (
          <Grid className={ classes.otherMonth } item key={ date }>
            {date }
          </Grid>
        )) }

      </Grid>
    </Paper>
  )
}

export default Index
