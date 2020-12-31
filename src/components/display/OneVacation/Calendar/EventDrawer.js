import React, { useRef } from 'react'
import dayjs from 'dayjs'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_EVENT, UPDATE_EVENT } from '../../../../graphQl/mutations/eventM'
import { GET_ONE_TRIP } from '../../../../graphQl/queries'
import Modal from '../../modal/Modal'
import EditEventForm from './EditEventForm'

import '../../../Style/EventDrawer.css'
import EditIcon from '@material-ui/icons/Edit';
import { AiFillCloseCircle } from 'react-icons/ai'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const EventDrawer = ({ isOpen, event, tripCal, vacationId, selected, toggleDrawer }) => {
  const editModal = useRef(null)
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
          <li className='detail'>{ event.title } <span /> ${ event.cost }</li>
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
          <EditEventForm
            event={ event }
            editSubmit={ editSubmit }
          />
        </Modal>
      </div>
    </>
  )
}

export default EventDrawer
