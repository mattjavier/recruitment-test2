import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
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
  formText: {
    color: theme.palette.primary.main
  },
  display: {
    padding: theme.spacing(3),
    width: '100%'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}))

const Flights = props => {

  const classes = useStyles()

  const router = useRouter()

  let agentChoices = props.itineraries.map(itinerary => itinerary.agent)
  
  const [agentState, setAgents] = useState([])
  const [selectedState, setSelected] = useState({
    selected: []
  })
  const [itineraryState, setItineraryState] = useState({
    totalPrice: '',
    avgPrice: ''
  })
  
  const getSelection = () => {
    let selected = props.itineraries.filter(itinerary => itinerary.agent === agentState)
    console.log(selected)
    setSelected({...selectedState, selected })
  }

  useEffect(() => {
    getSelection()

    let totalPrice = 0
    for (let i = 0; i < selectedState.selected.length; i++) {
      totalPrice += selectedState.selected[i].price
    }

    let avgPrice = totalPrice / selectedState.selected.length

    setItineraryState({ ...itineraryState, totalPrice, avgPrice })
    router.push('/')
  }, [])
  
  const handleAgentChange = (event) => {
    setAgents(event.target.value)
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
          name="agents"
          id="select"
          labelId="agent-label"
          value={agentState}
          onChange={handleAgentChange}
          input={<Input />}
        >
          <MenuItem
            key="default"
            value="default"
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
      </FormControl>
      <Grid
        className={classes.display}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {
          selectedState.selected.map(itinerary => {
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