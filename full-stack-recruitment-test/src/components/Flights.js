import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Itinerary from './Itinerary'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
  },
  formControl: {
    minWidth: 120,
    width: '90%',
    margin: theme.spacing(1),
    padding: 0,
  },
  button: {
    width: '15%',
    margin: theme.spacing(1, 0)
  },
  formText: {
    color: theme.palette.primary.main
  },
  display: {
    padding: theme.spacing(3),
    width: '100%'
  },
  bottom: {
    padding: theme.spacing(0, 3)
  },
  prices: {
    color: theme.palette.success.main
  }
}))

const Flights = props => {

  const classes = useStyles()

  const router = useRouter()

  let agentChoices = props.itineraries.map(itinerary => itinerary.agent)

  const [flightsState, setFlightsState] = useState({
    selected: props.itineraries,
    agent: '',
    totalPrice: props.itineraries.map(itinerary => itinerary.price).reduce((sum, current) => sum + current, 0),
    avgPrice: props.itineraries.map(itinerary => itinerary.price).reduce((sum, current) => sum + current, 0) / props.itineraries.length
  })
  
  const handleAgentChange = event => {
    setFlightsState({ ...flightsState, [event.target.name]: event.target.value })
  }

  const handleFilter = event => {
    event.preventDefault()
    
    let selectedFlights = (
      flightsState.agent === ('' || 'all') ? props.itineraries : (props.itineraries.filter(itinerary => itinerary.agent === flightsState.agent))
    )

    if (selectedFlights === []) {
      setFlightsState({
        selected: selectedFlights,
        totalPrice: 0,
        avgPrice: 0
      })
    } else {
      setFlightsState({
        selected: selectedFlights,
        totalPrice: selectedFlights.map(itinerary => itinerary.price).reduce((sum, current) => sum + current, 0),
        avgPrice: selectedFlights.map(itinerary => itinerary.price).reduce((sum, current) => sum + current, 0) / selectedFlights.length,
      })
    }
    
    // console.log(flightsState)    
  }


  return (
    <Grid
      container
      direction="column"
      justify="center" 
      alignItems="center"
      className={classes.container}
    >
      <FormControl className={classes.formControl}>
        <InputLabel id="agent-label" className={classes.formText}>Agent</InputLabel>
        <Select
          id="select"
          labelId="agent-label"
          value={flightsState.agent}
          onChange={handleAgentChange}
          name="agent"
          className={classes.formText}
        >
          <MenuItem
            key="all"
            value="all"
            className={classes.formText}
          >
            Agent
          </MenuItem>
          {
            agentChoices.map(agent => {
              return (
                <MenuItem
                  key={agent}
                  value={agent}
                  className={classes.formText}
                >
                  {agent}
                </MenuItem>
              )
            })
          }
        </Select>
        <FormHelperText className={classes.formText}>Filter by agent</FormHelperText>
        <Button 
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleFilter}
        >
          Filter
        </Button>
      </FormControl>
      <Grid
        className={classes.display}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {
          flightsState.selected.map(itinerary => {
            return (
              <Itinerary 
                key={itinerary._id}
                itinerary={itinerary}
                legs={props.legs}
              />
            )
          })
        }
      </Grid>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.bottom}
      >
        <Typography
          variant="button"
          color="primary"
        >
          Total Price: <span className={classes.prices}>&pound;{flightsState.totalPrice}</span>
        </Typography>
        <Typography
          variant="button"
          color="primary"
        >
          Average Price: <span className={classes.prices}>&pound;{flightsState.avgPrice}</span>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Flights