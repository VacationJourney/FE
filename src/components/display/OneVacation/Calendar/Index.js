import React, { useState } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'
import useDate from '../../../../hooks/useDate'
import { Paper, Grid, Box, Typography } from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useStyles } from '../../../Style/CalendarStyle';
import OneDay from './OneDay'


const Index = ({ trip, deleteTrip }) => {
  const classes = useStyles()
  const datesLength = trip.dates.length
  const tripStart = trip.dates[0].date
  const start = dayjs(tripStart).format('YYYY-M-D')
  const end = dayjs(trip.dates[datesLength - 1].date).format('YYYY-M-D')
  const [date, setDate] = useState(dayjs(tripStart))
  const [selected, setSelected] = useState(start)
// console.log('tripStart', date)
  // de-Structure from useDateHook
  const {
    tripMonth,
    tripYear,
    daysInMonth,
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
    trip.dates.map(trip => {

      if (trip.date === day) {
        tripCal[day] = trip
      }
    })
  })

  // fns to navigate months
  const lastMonth = () => {
    setDate(date.subtract(1, 'Month'))
  }
  const nextMonth = () => {
    setDate(date.add(1, 'Month'))
  }

  return (
    <>
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
        <Grid className={ classes.datesGrid }>
          { totalDays.map(d => {
            // console.log('d', tripCal[d])
            let month = dayjs(d).format('M')
            let trpMth = (tripMonth + 1).toString()
            let date = dayjs(d).format('D')

            return (
              month === trpMth ?

                tripCal[d] !== null ?
                  <Grid className={ clsx(classes.trip, {
                    [classes.tripDate]: selected === d
                  }) } item onClick={ () => setSelected(d) } key={ d }>
                    { date }
                  </Grid> :
                  <Grid className={ classes.monthDates } item key={ d }>
                    { date }
                  </Grid>
                :
                tripCal[d] !== null ?
                  // nest onclick fns to move months
                  trpMth > month ?
                    <Grid className={ classes.beyondDate }
                      onClick={ () => { nextMonth(); setSelected(d) } }
                      item key={ d }>
                      { date }
                    </Grid>
                    :
                    <Grid className={ classes.beyondDate }
                      onClick={ () => { lastMonth(); setSelected(d) } }
                      item key={ d }>
                      { date }
                    </Grid>
                  :
                  <Grid className={ classes.otherDates } item key={ d }>
                    { date }
                  </Grid>
            )
          })
          }

        </Grid>
      </Paper>
      <OneDay
      deleteTrip={deleteTrip}
        selected={ selected }
        setSelected={ setSelected }
        trip={ trip }
        date={date}
        lastMonth={lastMonth}
        nextMonth={nextMonth}
        tripCal={tripCal}
        start={ start }
        end={ end }
      />
    </>
  )
}

export default Index
