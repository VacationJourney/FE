import React, { useRef } from 'react'
import dayjs from 'dayjs'
import useDate from '../../../../hooks/useDate'
import Modal from '../../modal/Modal'
import { useMutation } from '@apollo/react-hooks'

import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from '../../../../graphQl/mutations/eventM'
import { DELETE_DAY } from '../../../../graphQl/mutations/vacationM'
import { GET_ONE_TRIP } from '../../../../graphQl/queries'
import { useForm } from 'react-hook-form';
import { Paper, Typography, Card, TextField, Button, ListItemText } from '@material-ui/core'
import { useStyles } from '../../../Style/OneDayStyle'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { MdEdit } from 'react-icons/md'


const OneDay = ({ selected, setSelected, trip, date, start, end, lastMonth, nextMonth, tripCal }) => {
  const classes = useStyles()
  const modal = useRef(null)
  const editModal = useRef(null)
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
  // Delete an event
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: vacationId } },
    ],
  });
  // Update an event
  const [updateEvent] = useMutation(UPDATE_EVENT, {
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
  // Update event form function
  const editSubmit = data => {
    data = {
      ...data,
      cost: parseInt(data.cost),
      dateId: tripCal[selected].id,
      tripId: vacationId
    }
    console.log('editData', data)
    updateEvent({ variables: data })
    editModal.current.close()
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
          <div className={ classes.time }>
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
          <div className={ classes.time }>
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
            Create
					</Button>
        </form>
      </Modal>

      {tripCal[selected] && tripCal[selected].events.map((e) => {

        return (
          <>
            <Card className={ classes.event } key={ e.id }>
              <DeleteForeverIcon
                fontSize='small'
                onClick={ () => deleteEvent({ variables: { id: e.id, dayId: tripCal[selected].id, tripId: vacationId } }) } />
              <div>{ e.title }</div>
              <div></div>
              <div>${ e.cost }</div>
              <MdEdit style={ { color: 'white' } } onClick={ () => editModal.current.open() } />
            </Card>
            <Modal ref={ editModal }>
              <form className={ classes.createEvent } onSubmit={ handleSubmit(editSubmit) }>
                <div>
                  <TextField
                    type='hidden'
                    name='id'
                    value={ e.id }
                    inputRef={ register({ required: true }) }
                  />
                  <TextField
                    className={ classes.eventInput }
                    label='Title'
                    type='text'
                    name='title'
                    defaultValue={ e.title }
                    inputRef={ register({ required: true }) }
                  />
                </div>
                <div className={ classes.time }>
                  <TextField
                    type='time'
                    name='startTime'
                    defaultValue={ e.startTime }
                    inputRef={ register() }
                  />
						      to
						      <TextField
                    type='time'
                    name='endTime'
                    defaultValue={ e.endTime }
                    inputRef={ register() }
                  />
                </div>
                <div className={ classes.time }>
                  <TextField
                    className={ classes.eventInput }
                    type='text'
                    label='location'
                    name='location'
                    defaultValue={ e.location }
                    inputRef={ register() }
                  />
                  <sp />
                  <TextField
                    className={ classes.eventInput }
                    type='number'
                    label='$'
                    name='cost'
                    defaultValue={ e.cost }
                    inputRef={ register() }
                  />
                </div>
                <div>
                  <TextField
                    className={ classes.eventInput }
                    type='text'
                    label='contact'
                    name='contact'
                    defaultValue={ e.contact }
                    inputRef={ register() }
                  />
                </div>

                <div>
                  <TextField
                    className={ classes.eventInput }
                    type='text'
                    label='description'
                    name='description'
                    defaultValue={ e.description }
                    inputRef={ register() }
                  />
                </div>
                <Button type='submit' className={ classes.submit }>
                  Update
					</Button>
              </form>
            </Modal>
          </>
        )
      }) }
      <Button className={ classes.deleteButton } onClick={ deleteDate }>
        <DeleteIcon />
        <ListItemText primary='Date' />
      </Button>
    </Paper>
  )

}
export default OneDay
