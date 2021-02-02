import React, { useState } from 'react'
import dayjs from 'dayjs'
import useDate from '../../../hooks/useDate'
import Calendar from './Calendar/Index'
import OneDay from './Calendar/OneDay'
import Notes from './Notes'


import { Grid, Hidden } from '@material-ui/core';
import { useStyles } from '../../Style/OneVacayStyle'

const LogicHub = ({ trip }) => {
  const classes = useStyles();
  const datesLength = trip.dates.length
  const tripStart = trip.dates[0].date
  const tripEnd = trip.dates[datesLength - 1].date
  const start = dayjs(tripStart).format('YYYY-M-DD')
  const end = dayjs(tripEnd).format('YYYY-M-DD')
  const [selected, setSelected] = useState(start)
  const [date, setDate] = useState(dayjs(tripStart))

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
    let day = i < 9 ? "0" + (i + 1) : (i + 1)
    monthArray.push(yearString + '-' + monthString + '-' + day)
  })

  // next days
  const postMonth = date.add(1, 'Month')
  const nextYear = postMonth.$y.toString()
  const nextMth = (postMonth.$M + 1).toString()
  const nextDays = []
  for (let i = 0; i < 6 - lastWeekday; i++) {
    let day = i < 9 ? "0" + (i + 1) : (i + 1)
    nextDays.push(nextYear + '-' + nextMth + '-' + day)
  }

  const totalDays = [].concat(prevDays, monthArray, nextDays)
  const tripCal = {}

  // React arrow without Returns!!!!
  totalDays.forEach(day => tripCal[day] = null)
  totalDays.forEach(day => {
    trip.dates.forEach(trip => {
      if (trip.date === day) {
        return tripCal[day] = trip
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
    <Grid className={ classes.oneVacation } >
      <Grid item xs={ 12 } sm={ 12 } md={ 6 }>
        <div className={ classes.vacationCalendar }>
          <Calendar
            trip={ trip }
            tripStart={ tripStart }
            tripEnd={ tripEnd }
            start={ start }
            end={ end }
            selected={ selected }
            setSelected={ setSelected }
            lastMonth={ lastMonth }
            nextMonth={ nextMonth }
            date={ date }
            tripCal={ tripCal }
            totalDays={ totalDays }
            weekDays={ weekDays }
            tripMonth={tripMonth}
          />
          <OneDay
          selected={ selected }
          setSelected={ setSelected }
          trip={ trip }
          date={ date }
          lastMonth={ lastMonth }
          nextMonth={ nextMonth }
          tripCal={ tripCal }
          start={ start }
          end={ end }
        />
        </div>
        
      </Grid>
      <Hidden smDown>
        <Notes trip={ trip } selected={ selected } />
      </Hidden>
    </Grid>
  )
}

export default LogicHub
