import React from 'react'
import { Typography, Grid, Paper, Box } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useStyles } from '../../Style/OneVacayStyle'

const Notes = () => {
  const classes = useStyles();
  return (
    <Grid item md={ 6 } className={ classes.notes } >
      <Paper >
        <Box className={ classes.topNotesBox }>
          <Typography variant="h3">Notes</Typography>
          <AddBoxIcon className={classes.addNote}/>
        </Box>
        <Box>

        </Box>
      </Paper>
    </Grid>
  )
}

export default Notes
