import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_NOTE } from '../../../graphQl/mutations/noteM'
import { GET_ONE_TRIP } from '../../../graphQl/queries'
import NoteCard from './NoteCard'
import { Typography, Grid, Paper, Box } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { useStyles } from '../../Style/NotesStyle'

const Notes = ({ trip, selected }) => {
  const classes = useStyles();
  const [isAddingNote, setIsAddingNote] = useState(false)
  const { register, handleSubmit } = useForm();

  const dateNotes = {}
  trip.dates.map(day => dateNotes[day.date] = day)

  // Queries & Mutations
  const [createNote] = useMutation(CREATE_NOTE, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: trip.id } },
    ],
  })

  const onSubmit = data => {
    data = {
      ...data,
      date: dateNotes[selected].id,
      vacation: trip.id,
    }
    createNote({ variables: data })
    setIsAddingNote(!isAddingNote)
  };


  return (
    <Grid item md={ 6 } className={ classes.notesEdge }>
      <Paper className={ classes.notesBox }>
        <Box className={ classes.topNotesBox }>
          <Typography variant="h4">Notes</Typography>
          <AddBoxIcon className={ classes.addNoteBtn } onClick={() => setIsAddingNote(!isAddingNote)} />
        </Box>
        <Box className={ classes.notes }>
          { dateNotes[selected] && <NoteCard trip={trip} date={ dateNotes[selected] } /> }
        </Box>
        { isAddingNote ? (
          <form className={ classes.noteForm } onSubmit={ handleSubmit(onSubmit) }>
            <input type="text" className={classes.input} placeholder="title" name="title" ref={ register({ required: true }) } />
            <textarea name="idea" className={classes.input} placeholder="idea" ref={ register } />
            <input className={ classes.createNoteBtn } type="submit" />
          </form>)
          : null }

      </Paper>
    </Grid>
  )
}

export default Notes
