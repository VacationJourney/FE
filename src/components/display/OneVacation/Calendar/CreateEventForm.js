import React from 'react'
import { useForm } from 'react-hook-form';
import { useStyles } from '../../../Style/OneDayStyle'
import {TextField, Button} from '@material-ui/core'
const CreateEventForm = ({onSubmit}) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm();
  return (
    <form className={ classes.createEvent } onSubmit={ handleSubmit(onSubmit) }>
          <div>
            <TextField
            required
              className={ classes.eventInput }
              label='Title'
              type='text'
              name='title'
              inputRef={ register({ required: true }) }
            />
          </div>
          <div className={ classes.oneLine }>
            <TextField
            required
              type='time'
              name='startTime'
              inputRef={ register({ required: true }) }
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
            <span ></span>
            <TextField
            required
              className={ classes.eventInput }
              type='number'
              label='$'
              name='cost'
              inputRef={ register({ required: true }) }
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
  )
}

export default CreateEventForm
