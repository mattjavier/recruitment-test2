import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {

  },
}))

const ItineraryForm = () => {

  const classes = useStyles()
  return (
    <form
      className={classes.root}
      onSubmit={event => event.preventDefault()} 
    >
      {/* Input Price */}
      <TextField
        name="price"
        placeholder="price"
      />
    </form>
  )
}

export default ItineraryForm