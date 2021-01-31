import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

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

  const router = useRouter()

  const [itineraryState, setItineraryState] = useState({
    totalPrice: '',
    avgPrice: ''
  })

  useEffect(() => {
    let totalPrice = 0
    for (let i = 0; i < props.itineraries.length; i++) {
      totalPrice += props.itineraries[i].price
    }

    let avgPrice = totalPrice / props.itineraries.length

    setItineraryState({ ...itineraryState, totalPrice, avgPrice })
    router.push('/')
  }, [])

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
              key={itinerary._id}
              itinerary={itinerary}
              legs={props.legs}
            />
          )
        })
      }
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography
          variant="h5"
          component="h5"
          color="primary"
        >
          Total Itinerary Price: &pound;{itineraryState.totalPrice}
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          color="primary"
        >
          Average Itinerary Price: &pound;{itineraryState.avgPrice}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Flights