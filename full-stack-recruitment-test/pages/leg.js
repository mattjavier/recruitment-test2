import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import FlightLandIcon from '@material-ui/icons/FlightLand'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import StopIcon from '@material-ui/icons/Stop'

const getDuration = (dept, arrv) => {
  // format is 'YYYY-MM-DDTHH:MM'
  let ms = moment(arrv).diff(moment(dept), 'minutes')
  let d = moment.duration(ms)
  return d._milliseconds
}

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%'
  },
  section: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2, 0),
    },
    padding: theme.spacing(1, 0)
  },
  text: {
    padding: theme.spacing(0),
    width: '100%'
  },
  inputLabel: {
    color: theme.palette.secondary.main
  },
  input: {
    color: theme.palette.primary.main
  },
  outlined: {
    borderColor: theme.palette.primary.main
  },
  select: {
    width: '100%',
    margin: theme.spacing(2, 0)
  },
  button: {
    width: '100%'
  }
}))

const NewLeg = props => {

  const classes = useStyles()

  const [formState, setFormState] = useState({
    departureAirport: '',
    arrivalAirport: '',
    departureTime: '',
    arrivalTime: '',
    stops: 0,
    airlineName: '',
    airlineId: '',
    durationMins: 0
  })

  const [submitting, setSubmitting] = useState(false)
  const [errorState, setErrorState] = useState({})
  const router = useRouter()

  const addLeg = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/legs', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    let stops = parseInt(formState.stops)
    let airlineId = props.airlines.filter(airline => formState.airlineName === airline.name).map(airline => airline.airlineId)[0]
    let durationMins = getDuration(formState.departureTime, formState.arrivalTime)
    setFormState({
      ...formState,
      stops,
      airlineId,
      durationMins
    })

    // console.log(formState)
    addLeg()
    // setSubmitting(true)
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h2" component="h2" color="primary" className={classes.title}>Add Leg</Typography>
      <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
        <Grid container direction="column" justify="center" className={classes.section}>
          <TextField
            label="Departure Airport"
            name="departureAirport"
            value={formState.departureAirport}
            variant="outlined"
            onChange={handleInputChange}
            className={classes.text}
            InputLabelProps={{
              classes: {
                root: classes.inputLabel
              }
            }}
            InputProps={{
              classes: {
                root: classes.outlined
              },
              className: classes.input,
              endAdornment: <InputAdornment position="end"><FlightTakeoffIcon /></InputAdornment>
            }}
          />
          <TextField
            label="Arrival Airport"
            name="arrivalAirport"
            value={formState.arrivalAirport}
            variant="outlined"
            onChange={handleInputChange}
            className={classes.text}
            InputLabelProps={{
              classes: {
                root: classes.inputLabel
              }
            }}
            InputProps={{
              classes: {
                root: classes.outlined
              },
              className: classes.input,
              endAdornment: <InputAdornment position="end"><FlightLandIcon /></InputAdornment>
            }}
          />
        </Grid>
        <Grid container justify="center" direction="column" className={classes.section}>
          <TextField
            label="Departure Time"
            name="departureTime"
            value={formState.departureTime}
            variant="outlined"
            onChange={handleInputChange}
            className={classes.text}
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
              classes: {
                root: classes.inputLabel
              }
            }}
            InputProps={{
              step: 300,
              classes: {
                root: classes.outlined
              },
              className: classes.input
            }}
          />
          
          <TextField
            label="Arrival Time"
            name="arrivalTime"
            value={formState.arrivalTime}
            variant="outlined"
            onChange={handleInputChange}
            className={classes.text}
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
              classes: {
                root: classes.inputLabel
              }
            }}
            InputProps={{
              step:300,
              classes: {
                root: classes.outlined
              },
              className: classes.input
            }}
          />
        </Grid>
        <Grid container justify="center" direction="column" className={classes.section}>
          <TextField
            label="Stops"
            name="stops"
            value={formState.stops}
            variant="outlined"
            onChange={handleInputChange}
            className={classes.text}
            InputLabelProps={{
              classes: {
                root: classes.inputLabel
              }
            }}
            InputProps={{
              classes: {
                root: classes.outlined
              },
              className: classes.input,
              endAdornment: <InputAdornment position="end"><StopIcon /></InputAdornment>
            }}
          />
          <FormControl variant="outlined" className={classes.select}>
            <InputLabel id="airline" className={classes.inputLabel}>Airline</InputLabel>
            <Select 
              labelId="airline" 
              label="Airline" 
              name="airlineName"
              value={formState.airlineName}
              className={classes.input} 
              onChange={handleInputChange}
            >
            {
              props.airlines.map(airline => {
                return (
                  <MenuItem key={airline._id} value={airline.name} className={classes.input}>
                    {airline.name}
                  </MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        
        <Button variant="contained" type="submit" color="primary" className={classes.button}>Submit</Button>
      </form>
    </Grid>
  )
}

NewLeg.getInitialProps = async () => {
  const al_res = await fetch('http://localhost:3000/api/airlines')
  const airlines = await al_res.json()
  
  return { airlines: airlines.data }
}

export default NewLeg