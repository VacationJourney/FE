import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
import useDate from '../../../../hooks/useDate'
import Modal from '../../modal/Modal'
import { useMutation } from '@apollo/react-hooks'

import { CREATE_EVENT } from '../../../../graphQl/mutations/eventM'
import { DELETE_DAY } from '../../../../graphQl/mutations/vacationM'
import { GET_ONE_TRIP } from '../../../../graphQl/queries'
import CreateEventForm from './CreateEventForm'
import EventDrawer from './EventDrawer'
import { Paper, Typography, Card, Button, ListItemText } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useStyles } from '../../../Style/OneDayStyle'

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';



const OneDay = ({ selected, setSelected, trip, date, start, end, lastMonth, nextMonth, tripCal, deleteTrip }) => {
  const classes = useStyles()
  const modal = useRef(null)
  const deleteDateModal = useRef(null)
  // const [isOpen, setIsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState('')
  const [time, setTime] = useState('h:mma')
  // const [ active, setActive] = useState(null)

  const handleTime = (event, newTime) => {
    setTime(newTime);
  };
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

  // GraphQL 
  // Create an event
  const vacationId = localStorage.getItem('vacationId')
  const [createEvent] = useMutation(CREATE_EVENT, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: vacationId } },
    ],
  });

  // Delete a day
  const [deleteDay] = useMutation(DELETE_DAY, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: vacationId } },
    ],
  });

  // Create event form function
  const onSubmit = data => {
    data = {
      ...data,
      cost: parseInt(data.cost),
      date: tripCal[selected].id
    }
    createEvent({ variables: data });
    modal.current.close()
  }

  // Delete day function
  const deleteDate = () => {
    deleteDay({ variables: { id: tripCal[selected].id, tripId: vacationId } })
    if (selected === start) {
      setSelected(futureDate)
    } else if (selected === end) {
      setSelected(pastDate)
    }
    deleteDateModal.current.close()
  }

  // const toggleDrawer = (index) => {
  //   setActive(index)
  //   setIsOpen(!isOpen)
  // }
  // const day = []
  // const dayHours = [...Array(24).keys()]
  // const minutes = [...Array(60).keys()]

  // dayHours.forEach(hour => {
  //   minutes.forEach(min => {
  //     let minute = min
  //     if (min < 10) {
  //       minute = '0' + min
  //     }
  //     day.push(hour + ':' + minute)
  //   })
  // })

  // totalDays.map(day => {
  //   tripCal[day] = null
  //   trip.dates.map(trip => {
  //     if (trip.date === day) {
  //       return tripCal[day] = trip
  //     }
  //   })
  // })




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
      </div >
      <div className={ classes.eventsTopBox }>
        <div className={ classes.eventsTopBoxLeft }>
          <div className={ classes.dayCost }><span>Day Cost</span>
            <span>${ tripCal[selected].cost }</span>
          </div>
          <Button style={ selected === start || selected === end ? { display: 'flex' } : { display: 'none' } }
            className={ classes.deleteButton } onClick={ () => deleteDateModal.current.open() }>
            <DeleteIcon />
            <ListItemText primary='Date' />
          </Button>
        </div>
        <div className={ classes.eventsTopBoxRight }>
          <ToggleButtonGroup
            value={ time }
            exclusive
            onChange={ handleTime }
            aria-label="text alignment"
            
          >
            <ToggleButton value="h:mma" aria-label="left aligned" style={{padding: 8}}>
              12
      </ToggleButton>
            <ToggleButton value="H:mm" aria-label="left aligned" style={{padding: 8}}>
              24
      </ToggleButton>
          </ToggleButtonGroup>
          <AddBoxIcon fontSize="large" onClick={ () => modal.current.open() } />
        </div>
      </div>
      <Modal ref={ deleteDateModal }>
        <Typography variant='h6'>
          { tripDates.length > 1 ? 'Confirm deleting date?' : 'Confirm deleting trip?' }

        </Typography>
        <Button
          className={ classes.deleteButtonRed } onClick={ tripDates.length > 1 ? deleteDate : deleteTrip }>
          <DeleteIcon />
          <ListItemText primary={ tripDates.length > 1 ? dayjs(selected).format('MMM D') : trip.title } />
        </Button>
      </Modal>
      <Modal ref={ modal }>
        <CreateEventForm
          onSubmit={ onSubmit }
        />
      </Modal>
      <div className={ classes.eventsBox }>
        { tripCal[selected] && tripCal[selected].events.map((e, index) => {
          // 12 - 24 hour time manipulation
          const start = dayjs(selected + 'T' + e.startTime).format(`${time}`)
          const end = e.endTime ? dayjs(selected + 'T' + e.endTime).format(`${time}`) : ''
          return (
            <div key={ e.id }>
              <Card className={ classes.event } >
                <div>{ start }-{ end }</div>
                <div>{ e.title }</div>
                <div> ${ e.cost }
                <ArrowLeftIcon className='drawerButton' onClick={ () => setSelectedEvent(e.id) } /></div>
              </Card>
              <EventDrawer
                selectedEvent={ selectedEvent }
                setSelectedEvent={ setSelectedEvent }
                time={ time }
                event={ e }
                tripCal={ tripCal }
                vacationId={ vacationId }
                selected={ selected }
              />
            </div >
          )
        }) }
      </div>


    </Paper>
  )

}
export default OneDay

 // 


             // hour.test(minute)  ?
            //   <div className={ classes.hour } >{ dayjs(selected + 'T' + minute).format(`${time}`) }</div> 
            //   : <div></div>


          //   const start = dayjs(selected + 'T' + e.startTime).format(`${time}`)
          // const end = e.endTime ? dayjs(selected + 'T' + e.endTime).format(`${time}`) : ''