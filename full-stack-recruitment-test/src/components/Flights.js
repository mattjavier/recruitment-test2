import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Itinerary from './Itinerary'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    width: '100%'
  }
}))

const Flights = props => {

  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center" 
      className={classes.container}
    >
      {
        props.itineraries.map(itinerary => {
          return (
            <Itinerary 
              key={itinerary.id}
              itinerary={itinerary}
              legs={props.legs}
            />
          )
        })
      }
    </Grid>
  )
}

export default Flights