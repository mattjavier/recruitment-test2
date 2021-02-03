import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
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
    width: '75%',
    paddingBottom: theme.spacing(4)
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

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const EditLeg = props => {

  const classes = useStyles()
  
  const [formState, setFormState] = useState({
    departureAirport: props.leg.departureAirport,
    arrivalAirport: props.leg.arrivalAirport,
    departureTime: props.leg.departureTime,
    arrivalTime: props.leg.arrivalTime,
    stops: props.leg.stops,
    airlineName: props.leg.airlineName,
    airlineId: props.leg.airlineId,
    durationMins: props.leg.durationMins
  })

  const [submitting, setSubmitting] = useState(false)
  const [errorState, setErrorState] = useState({})
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {

    let numErrors = Object.keys(errorState).length
    if (submitting) {
      if (numErrors === 0) {
        updateLeg()
      } else {
        setSubmitting(false)
      }
    }
  }, [errorState])

  
  const updateLeg = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/legs/${router.query.id}`, {
        method: 'PUT',
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
  
  const handleSnack = () => {
    setOpen(true)
  }
  const handleSnackClose = () => {
    setOpen(false)
  }
  
  const validation = () => {
    let errors = {}

    if (!formState.departureAirport) {
      errors.departureAirport = true
    }
    
    if (!formState.arrivalAirport) {
      errors.arrivalAirport = true
    }
    
    if (!formState.departureTime) {
      errors.departureTime = true
    } 
    
    if (!formState.arrivalTime) {
      errors.arrivalTime = true
    }
    
    if (formState.stops < 0 || formState.stops === 'NaN' || formState.stops === '') {
      errors.stops = true
    } 
    
    if (!formState.airlineName) {
      errors.airlineName = true
    }
    
    if (!formState.airlineId) {
      errors.airlineId = true
    } 
    
    if (formState.durationMins === '') {
      errors.durationMins = true
    }

    return errors
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
    
    let errors = validation()
    setErrorState(errors)
   
    if (Object.keys(errorState).length > 0) {
      handleSnack()
    }

    setSubmitting(true)
    
  }
  
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h2" component="h2" color="primary" className={classes.title}>Update Leg</Typography>
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
   
      <Snackbar
        open={open} 
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="error">
          Please fill out all fields
        </Alert>
      </Snackbar>
    </Grid>
  )
}

EditLeg.getInitialProps = async ({ query: { id } }) => {
  const al_res = await fetch('http://localhost:3000/api/airlines')
  const airlines = await al_res.json()
  
  const lg_res = await fetch(`http://localhost:3000/api/legs/${id}`)
  const leg = await lg_res.json()
  return { leg: leg.data, airlines: airlines.data }
}

export default EditLeg