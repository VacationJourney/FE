import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
// import clsx from 'clsx';
import useDate from '../../../../hooks/useDate'
import Modal from '../../modal/Modal'
import { useMutation } from '@apollo/react-hooks'

import { CREATE_EVENT } from '../../../../graphQl/mutations/eventM'
import { DELETE_DAY } from '../../../../graphQl/mutations/vacationM'
import { GET_ONE_TRIP } from '../../../../graphQl/queries'
import { useForm } from 'react-hook-form';
import { Paper, Typography, Card, TextField, Button, ListItemText } from '@material-ui/core'
import { useStyles } from '../../../Style/OneDayStyle'
import EventDrawer from './EventDrawer'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';



const OneDay = ({ selected, setSelected, trip, date, start, end, lastMonth, nextMonth, tripCal, deleteTrip }) => {
  const classes = useStyles()
  const modal = useRef(null)

  const deleteDateModal = useRef(null)
  // const [state, setState] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit } = useForm();


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
    console.log('data', data)
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
    } else {
      setSelected(futureDate)
    }
    deleteDateModal.current.close()
  }

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
    console.log('isOpen', isOpen)
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
      <div className={ classes.eventsTopBox }>
        <div className={ classes.dayCost }><span>Day Cost</span>
          <span>${ tripCal[selected].cost }</span>
        </div>
        <AddBoxIcon fontSize="large" onClick={ () => modal.current.open() } />
      </div>
      <Modal ref={ modal }>
        <form className={ classes.createEvent } onSubmit={ handleSubmit(onSubmit) }>
          <div>

            <TextField
              className={ classes.eventInput }
              label='Title'
              type='text'
              name='title'
              inputRef={ register({ required: true }) }
            />
          </div>
          <div className={ classes.oneLine }>
            <TextField
              type='time'
              name='startTime'
              inputRef={ register() }
            />
						to
						<TextField
              type='time'
              name='endTime'
              inputRef={ register() }
            />
          </div>
          <div className={ classes.oneLine }>
            <TextField
              className={ classes.eventInput }
              type='text'
              label='location'
              name='location'
              inputRef={ register() }
            />
            <sp />
            <TextField
              className={ classes.eventInput }
              type='number'
              label='$'
              name='cost'
              inputRef={ register() }
            />
          </div>
          <div>
            <TextField
              className={ classes.eventInput }
              type='text'
              label='contact'
              name='contact'
              inputRef={ register() }
            />
          </div>

          <div>
            <TextField
              className={ classes.eventInput }
              type='text'
              label='description'
              name='description'
              inputRef={ register() }
            />
          </div>
          <Button type='submit' className={ classes.submit }>
            Create Event
					</Button>
        </form>
      </Modal>
      <div className={ classes.eventsBox }>
        { tripCal[selected] && tripCal[selected].events.map((e) => {

          return (
            <>
              <Card className={ classes.event } key={ e.id }>
                <div>{ e.title } ${ e.cost }</div>
                <ArrowLeftIcon className={ classes.drawerButton } onClick={ toggleDrawer } />
              </Card>
              { isOpen ? <EventDrawer
                toggleDrawer={ toggleDrawer }
                event={ e }
                tripCal={ tripCal }
                vacationId={ vacationId }
                selected={ selected }
              /> : '' }
            </>
          )
        }) }
      </div>
      <Button style={ selected === start || selected === end ? { display: 'flex' } : { display: 'none' } }
        className={ classes.deleteButton } onClick={ () => deleteDateModal.current.open() }>
        <DeleteIcon />
        <ListItemText primary='Date' />
      </Button>
      <Modal ref={ deleteDateModal }>
        <Typography variant='h6'>
          {tripDates.length > 1 ? 'Confirm deleting date?' : 'Confirm deleting trip?'}
          
      </Typography>
        <Button
          className={ classes.deleteButtonRed } onClick={ tripDates.length > 1 ?deleteDate : deleteTrip}>
          <DeleteIcon />
          <ListItemText primary={ tripDates.length > 1 ? dayjs(selected).format('MMM D') : trip.title } />
        </Button>
      </Modal>
    </Paper>
  )

}
export default OneDay
