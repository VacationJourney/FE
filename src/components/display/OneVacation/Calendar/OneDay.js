import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import useDate from '../../../../hooks/useDate'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_DAY_COST, UPDATE_VACATION_COST } from '../../../../graphQl/mutations/vacationM'
import { GET_ONE_TRIP } from '../../../../graphQl/queries'
import { Paper, Typography, Card, Box } from '@material-ui/core'
import { useStyles } from '../../../Style/OneDayStyle'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddBoxIcon from '@material-ui/icons/AddBox';


const OneDay = ({ selected, setSelected, trip, date, start, end, lastMonth, nextMonth, tripCal }) => {
  const classes = useStyles()
  const vacationId = localStorage.getItem('vacationId')
  // console.log('vacationId', vacationId)
  // de-Structure from useDateHook
  const { firstDateOfMonth, lastDateOfMonth } = useDate(date)

  // vars to navigate dates
  const pastDate = dayjs(selected).subtract(1, 'Day').format('YYYY-M-D')
  const futureDate = dayjs(selected).add(1, 'Day').format('YYYY-M-D')
  // TripDates Array
  const tripDates = []
  trip.dates.forEach(d => tripDates.push(d.date))

  // fns to navigate dates jumping thru months
  const lastDate = () => {
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
      <div className={ classes.eventBox }>
        <div className={ classes.dayCost }><span>Day Cost</span>
          <span>${ tripCal[selected].cost }</span>
        </div>


        <AddBoxIcon fontSize="large" />
      </div>

      {tripCal[selected] && tripCal[selected].events.map((e) => {

        return (
          <Card className={ classes.event } key={ e.id }>

            <div>{ e.title }</div>
            <div></div>
            <div>${ e.cost }</div>
          </Card>
        )
      }) }

    </Paper>
  )

}
export default OneDay
