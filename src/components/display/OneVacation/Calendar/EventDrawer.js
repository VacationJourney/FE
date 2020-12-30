import React, { useRef } from 'react'
import dayjs from 'dayjs'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_EVENT, UPDATE_EVENT } from '../../../../graphQl/mutations/eventM'
import { GET_ONE_TRIP } from '../../../../graphQl/queries'
import { useForm } from 'react-hook-form';
import Modal from '../../modal/Modal'
import { TextField, Button } from '@material-ui/core'

import '../../../Style/EventDrawer.css'
import EditIcon from '@material-ui/icons/Edit';
import { AiFillCloseCircle } from 'react-icons/ai'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const EventDrawer = ({ isOpen, event, tripCal, vacationId, selected, toggleDrawer }) => {
  const editModal = useRef(null)
  const { register, handleSubmit } = useForm();
  const start = dayjs(selected + 'T' + event.startTime).format('H:mm a')
  const end = event.endTime ? dayjs(selected + 'T' + event.endTime).format('H:mm a') : ''

  // Update an event
  const [updateEvent] = useMutation(UPDATE_EVENT, {
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

  const deleteActivity = () => {
    deleteEvent({ variables: { id: event.id, dayId: tripCal[selected].id, tripId: vacationId } })
    toggleDrawer()
  }
  return (
    <>
      <div className={ `eventDrawer ${isOpen ? 'eventDrawer__open' : ''}` } >
        <EditIcon className='editModalButton' onClick={ () => editModal.current.open() } />
        <ul className='eventDetails'>
          <li className='detail'>{ event.title } <sp /> ${ event.cost }</li>
          <li className='detail'></li>
          <li className='detail'>{ start } - { end } </li>
          <li className='detail'>{ event.location }</li>
          <li className='detail'>{ event.contact }</li>
          <li className='detail'>{ event.description }</li>
        </ul>
        <DeleteForeverIcon
          className='deleteEvent'
          fontSize='large'
          onClick={ deleteActivity } />
        <AiFillCloseCircle className='closeEventDetails' onClick={ toggleDrawer } />
        <Modal ref={ editModal }>
          <form className='editEventForm' onSubmit={ handleSubmit(editSubmit) }>

            <TextField
              type='hidden'
              name='id'
              value={ event.id }
              inputRef={ register({ required: true }) }
            />
            <TextField
              className='eventInput'
              label='Title'
              type='text'
              name='title'
              defaultValue={ event.title }
              inputRef={ register({ required: true }) }
            />
            <div className='oneLine'>
              <TextField
                className='eventInput'
                type='time'
                name='startTime'
                defaultValue={ event.startTime }
                inputRef={ register() }
              />
            to
            <TextField
                className='eventInput'
                type='time'
                name='endTime'
                defaultValue={ event.endTime }
                inputRef={ register() }
              />
            </div>
            <div className='oneLine'>
              <TextField
                className='eventInput'
                type='text'
                label='location'
                name='location'
                defaultValue={ event.location }
                inputRef={ register() }
              />
              <sp />
              <TextField
                className='eventInput '
                type='number'
                label='$'
                name='cost'
                defaultValue={ event.cost }
                inputRef={ register() }
              />
            </div>
            <TextField
              className='eventInput '
              type='text'
              label='contact'
              name='contact'
              defaultValue={ event.contact }
              inputRef={ register() }
            />
            <TextField
              className='eventInput '
              type='text'
              label='description'
              name='description'
              defaultValue={ event.description }
              inputRef={ register() }
            />
            <Button type='submit' className='submit '>
              Update Event
          </Button>
          </form>
        </Modal>
      </div>
    </>
  )
}

export default EventDrawer
