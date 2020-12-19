import React, { useState } from 'react'
import dayjs from 'dayjs'
import useDate from '../../hooks/useDate'
import { Paper, Grid, Box, Typography } from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useStyles } from '../Style/CalStyle'


const Index = ({ dates }) => {
  const classes = useStyles()
  // const datesLength = dates.length
  const tripStart = dates[0].date
  // const tripEnd = dates[datesLength- 1].date
  // console.log('trip', tripStart, tripEnd)
  console.log('dates', dates)
  const [date, setDate] = useState(dayjs(tripStart))
  const [selected, setSelected] = useState(dayjs(date).format('YYYY-MM-DD'))
  // console.log('date', selected)
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

  // create Arrays for: previousDays
  // Vars for time complexity
  const prevMonth = date.subtract(1, 'Month')
  const prevYear = prevMonth.$y.toString()
  const prevMth = (prevMonth.$M + 1).toString()
  const previousMonthDays = prevMonth.daysInMonth()
  const prevDays = []
  for (let i = previousMonthDays; prevDays.length < firstWeekday; i--) {
    prevDays.unshift(prevYear + '-' + prevMth + '-' + i)
  }
  // Current Month
  const yearString = tripYear.toString()
  const monthString = (tripMonth + 1).toString()
  const month = [...Array(daysInMonth).keys()]
  const monthArray = []
  month.forEach(i => {
    monthArray.push(yearString + '-' + monthString + '-' + (i + 1))
  })
  // next days
  const postMonth = date.add(1, 'Month')
  const nextYear = postMonth.$y.toString()
  const nextMth = (postMonth.$M + 1).toString()
  const nextDays = []
  for (let i = 1; i < 7 - lastWeekday; i++) {
    nextDays.push(nextYear + '-' + nextMth + '-' + i)
  }
  const totalDays = [].concat(prevDays, monthArray, nextDays)
  const tripCal = {}
  totalDays.map(day => {
    tripCal[day] = null
    dates.map(trip => {
      if(trip.date === day){
        tripCal[day] = trip
      }
    })
    
  })
  console.log('tripCal', tripCal, dates)
  // fns to navigate months
  const lastMonth = () => {
    setDate(date.subtract(1, 'Month'))
  }
  const nextMonth = () => {
    setDate(date.add(1, 'Month'))
  }

  return (
    <Paper className={ classes.calendar }>
      <Box className={ classes.calTop }>
        <ArrowLeftIcon className={ classes.arrows } onClick={ lastMonth } />
        <Typography variant='h5'>{ date.format('MMMM YYYY') }</Typography>
        <ArrowRightIcon className={ classes.arrows } onClick={ nextMonth } />
      </Box>
      <Grid container className={ classes.grid }>
        { weekDays.map(day => (
          <Grid className={ classes.weekdays } item key={ day }>
            {day }
          </Grid>
        )) }
      </Grid>
      <Grid container className={ classes.datesGrid }>


        { totalDays.map(date => {
          let month = dayjs(date).format('M')
          let trpMth = (tripMonth + 1).toString()
          return (
            month === trpMth ? 

            tripCal[date] !== null ?
            <Grid className={ classes.trip } item key={ date }>
                { dayjs(date).format('D') }
              </Grid> :
              <Grid className={ classes.monthDates } item key={ date }>
                { dayjs(date).format('D') }
              </Grid>
              :
              tripCal[date] !== null ?
              <Grid className={ classes.trip } item key={ date }>
                { dayjs(date).format('D') }
              </Grid> :
              <Grid className={ classes.otherDates } item key={ date }>
                { dayjs(date).format('D') }
              </Grid>

          )
        })
        }

      </Grid>
    </Paper>
  )
}

export default Index
