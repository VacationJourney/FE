import React, { useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_EVENT, UPDATE_EVENT } from '../../../../graphQl/mutations/eventM'
import { GET_ONE_TRIP } from '../../../../graphQl/queries'
import { useForm } from 'react-hook-form';
import Modal from '../../modal/Modal'
import { TextField, Button } from '@material-ui/core'
import { useStyles } from '../../../Style/EventDrawerStyle'

import EditIcon from '@material-ui/icons/Edit';
import { AiFillCloseCircle } from 'react-icons/ai'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const EventDrawer = ({ event, tripCal, vacationId, selected, toggleDrawer }) => {
  const classes = useStyles()
  const editModal = useRef(null)
  const { register, handleSubmit } = useForm();

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
      
      <div className={classes.eventDrawer} >
        <EditIcon className={ classes.editModalButton } onClick={ () => editModal.current.open() } />
        <ul className={ classes.eventDetails }>
          <li className={ classes.detail }>{ event.title }</li>
          <li className={ classes.detail }>${ event.cost }</li>
          <li className={ classes.detail }>{ event.startTime } - { event.endTime } </li>
          <li className={ classes.detail }>{ event.location }</li>
          <li className={ classes.detail }>{ event.contact }</li>
          <li className={ classes.detail }>{ event.description }</li>
        </ul>

        <DeleteForeverIcon
          className={ classes.deleteEvent }
          fontSize='large'
          onClick={ deleteActivity } />
        <AiFillCloseCircle className={ classes.closeEventDetails } onClick={toggleDrawer} />


        <Modal ref={ editModal }>
          <form className={ classes.editEventForm } onSubmit={ handleSubmit(editSubmit) }>

            <TextField
              type='hidden'
              name='id'
              value={ event.id }
              inputRef={ register({ required: true }) }
            />
            <TextField
              className={ classes.eventInput }
              label='Title'
              type='text'
              name='title'
              defaultValue={ event.title }
              inputRef={ register({ required: true }) }
            />
            <div className={ classes.oneLine }>
              <TextField
                className={ classes.eventInput }
                type='time'
                name='startTime'
                defaultValue={ event.startTime }
                inputRef={ register() }
              />
            to
            <TextField
                className={ classes.eventInput }
                type='time'
                name='endTime'
                defaultValue={ event.endTime }
                inputRef={ register() }
              />
            </div>
            <div className={ classes.oneLine }>
              <TextField
                className={ classes.eventInput }
                type='text'
                label='location'
                name='location'
                defaultValue={ event.location }
                inputRef={ register() }
              />
              <sp />
              <TextField
                className={ classes.eventInput }
                type='number'
                label='$'
                name='cost'
                defaultValue={ event.cost }
                inputRef={ register() }
              />
            </div>
            <TextField
              className={ classes.eventInput }
              type='text'
              label='contact'
              name='contact'
              defaultValue={ event.contact }
              inputRef={ register() }
            />
            <TextField
              className={ classes.eventInput }
              type='text'
              label='description'
              name='description'
              defaultValue={ event.description }
              inputRef={ register() }
            />
            <Button type='submit' className={ classes.submit }>
              Update Event
          </Button>
          </form>
        </Modal>
      </div>
    </>
  )
}

export default EventDrawer
