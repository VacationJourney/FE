import React from 'react'
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core'
import '../../../Style/EventDrawer.css'

const EditEventForm = ({ editSubmit, event }) => {
  const { register, handleSubmit } = useForm();
  return (
    <form className='editEventForm' onSubmit={ handleSubmit(editSubmit) }>
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
        <span ></span>
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
      <Button type='submit' className='submitBtn '>
        Update Event
          </Button>
    </form>
  )
}

export default EditEventForm
