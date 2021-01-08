import React, { useState } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'
import useDate from '../../../../hooks/useDate'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_DAY } from '../../../../graphQl/mutations/vacationM';
import { GET_ONE_TRIP } from '../../../../graphQl/queries';
import { Paper, Grid, Box, Typography } from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useStyles } from '../../../Style/CalendarStyle';
import OneDay from './OneDay'


const Index = ({ trip, deleteTrip }) => {
  const classes = useStyles()
  const datesLength = trip.dates.length
  const tripStart = trip.dates[0].date
  const tripEnd = trip.dates[datesLength - 1].date
  const start = dayjs(tripStart).format('YYYY-M-DD')
  const end = dayjs(tripEnd).format('YYYY-M-DD')
  const [date, setDate] = useState(dayjs(tripStart))
  const [selected, setSelected] = useState(start)
  const [addDays, setAddDays] = useState(false)

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
  for (let i = 1; i < 7 - lastWeekday; i++) {
    let day = i < 9 ? "0" + (i + 1) : (i + 1)
    nextDays.push(nextYear + '-' + nextMth + '-' + day)
  }
  const totalDays = [].concat(prevDays, monthArray, nextDays)
  const tripCal = {}

  // React arrow without Returns!!!!
  totalDays.map(day => {
    tripCal[day] = null
    trip.dates.map(trip => {
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

  // Queries & Mutations
  // Create Vacation
  const [createDay] = useMutation(CREATE_DAY, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: trip.id } },
    ],
  });
  // Variables to add dates to trip
  const yesterday = dayjs(tripStart).subtract(1, 'Day').format('YYYY-M-DD')
  const tomorrow = dayjs(tripEnd).add(1, 'Day').format('YYYY-M-DD')

  const addDateToTrip = (date) => {


    createDay({ variables: { tripId: trip.id, cost: 0, date: date } });
  }

  return (
    <>
      <Paper className={ classes.calendar }>
        <Box className={ classes.calTop }>
          <ArrowLeftIcon className={ classes.arrows } onClick={ lastMonth } />
          <div className={ classes.date }>
            <Typography variant='h5'>{ date.format('MMMM YYYY') }</Typography>
            <AddBoxIcon onClick={ () => setAddDays(!addDays)}/>
           </div>
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
                  addDays ?
                    d === yesterday || d === tomorrow ?
                      <Grid className={ classes.addDates } item key={ d }
                        onClick={ () => addDateToTrip(d) }
                      >
                        <div >add</div>
                        <div >{ date }</div>
                      </Grid>
                      :
                      <Grid className={ classes.monthDates } item key={ d }>
                        { date }
                      </Grid>
                    :
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
        deleteTrip={ deleteTrip }
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
    </>
  )
}

export default Index
