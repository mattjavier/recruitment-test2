import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

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
import { FlightLandIcon, FlightTakeoffIcon, StopIcon } from '@material-ui/icons/'


const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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

  // const addLeg = async () => {
  //   try {
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleInputChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()


    console.log(formState)
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
      <div>
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
              type="time"
              defaultValue="08:00"
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
              type="time"
              defaultValue="08:00"
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
          <Grid container justify="center" className={classes.section}>
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
          </Grid>
          
          <Button variant="contained" type="submit" color="primary">Submit</Button>
        </form>
      </div>
    </Grid>
  )
}

NewLeg.getInitialProps = async () => {
  const al_res = await fetch('http://localhost:3000/api/airlines')
  const airlines = await al_res.json()
  
  return { airlines: airlines.data }
}

export default NewLeg