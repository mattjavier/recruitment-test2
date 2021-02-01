import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
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
}))

const Flights = props => {

  const classes = useStyles()

  const router = useRouter()

  let agentChoices = props.itineraries.map(itinerary => itinerary.agent)

  const [flightsState, setFlightsState] = useState({
    selected: [],
    agent: '',
    totalPrice: 0,
    avgPrice: 0
  })
  
  useEffect(() => {
    
    let selected
    if (flightsState.agent !== '') {
      selected = props.itineraries.filter(itinerary => itinerary.agent === flightsState.agent)
    } else {
      selected = props.itineraries 
    }

    let totalPrice = 0
    for (let i = 0; i < flightsState.selected.length; i++) {
      totalPrice += flightsState.selected[i].price
    }

    let avgPrice = totalPrice / flightsState.selected.length
    setFlightsState({ ...flightsState, selected, totalPrice, avgPrice })
    
  }, [])
  
  const handleAgentChange = event => {
    setFlightsState({ ...flightsState, [event.target.name]: event.target.value })
  }

  const handleFilter = event => {
    event.preventDefault()
    if (flightsState.agent !== '') {
      setFlightsState({ ...flightsState, selected: props.itineraries.filter(itinerary => itinerary.agent === flightsState.agent) })
    } else {
      setFlightsState({ ...flightsState, selected: props.itineraries })
    }

    let totalPrice = 0
    for (let i = 0; i < flightsState.selected.length; i++) {
      totalPrice += flightsState.selected[i].price
    }

    let avgPrice = totalPrice / flightsState.selected.length
    setFlightsState({ ...flightsState, totalPrice, avgPrice })
    
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
      </Grid>
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
          Total Itinerary Price: &pound;{flightsState.totalPrice}
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          color="primary"
        >
          Average Itinerary Price: &pound;{flightsState.avgPrice}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Flights