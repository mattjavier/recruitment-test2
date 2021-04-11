import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Itinerary from './Itinerary'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
  },
  form: {
    width: '100%',
    padding: theme.spacing(0, 3)
  },
  formControl: {
    width: '50%',
    padding: theme.spacing(3, 0),
  },
  button: {
    width: '25%',
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
    color: theme.palette.primary.main
  }
}))

const Flights = props => {
  
  const classes = useStyles()

  let agentChoices = Array.from(new Set(props.itineraries.map(itinerary => itinerary.agent)))
  
  const [flightsState, setFlightsState] = useState({
    selected: props.itineraries,
    agent: 'all',
    totalPrice: props.itineraries.map(itinerary => itinerary.price).reduce((sum, current) => sum + current, 0).toFixed(2),
    avgPrice: (props.itineraries.map(itinerary => itinerary.price).reduce((sum, current) => sum + current, 0) / props.itineraries.length).toFixed(2)
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
        ...flightsState,
        selected: selectedFlights,
        totalPrice: 0,
        avgPrice: 0
      })
    } else {
      setFlightsState({
        ...flightsState,
        selected: selectedFlights,
        totalPrice: selectedFlights.map(itinerary => itinerary.price).reduce((sum, current) => sum + current, 0).toFixed(2),
        avgPrice: (selectedFlights.map(itinerary => itinerary.price).reduce((sum, current) => sum + current, 0) / selectedFlights.length).toFixed(2),
      })
    }
  }


  return (
    <Grid
      container
      direction="column"
      justify="center" 
      alignItems="center"
      className={classes.container}
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.form}
      >
        <FormControl className={classes.formControl}>
          <Select
            id="select"
            labelId="agent-label"
            value={flightsState.agent}
            onChange={handleAgentChange}
            name="agent"
            className={classes.formText}
          >
            <MenuItem key="all" value="all" className={classes.formText}>All</MenuItem>
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
          <FormHelperText className={classes.formText}>Filter by Flight Agent</FormHelperText>
        </FormControl>
        <Button 
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleFilter}
        >
          Filter
        </Button>
      </Grid>
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
                access={true}
              />
            )
          })
        }
      </Grid>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        className={classes.bottom}
      >
        <Typography variant="button" color="secondary">
          Total Price: <span className={classes.prices}>&pound;{flightsState.totalPrice}</span>
        </Typography>
        <Typography variant="button" color="secondary">
          Average Price: <span className={classes.prices}>&pound;{flightsState.avgPrice}</span>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Flights