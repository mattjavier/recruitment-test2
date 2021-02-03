import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
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

import Leg from '../src/components/Leg'

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
      margin: theme.spacing(2, 0)
    },
    padding: theme.spacing(1, 0)
  },
  card: {
    margin: theme.spacing(2, 0)
  },
  cardActions: {
    padding: 0,
    borderTop: 'solid',
    borderColor: theme.palette.secondary.main,
    borderTopWidth: theme.spacing(0.1)
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

const NewItinerary = props => {

  const classes = useStyles()

  const [formState, setFormState] = useState({
    legs: [],
    price: 0, 
    agent: '',
    agentRating: 0
  })


  const legKeys = props.legs.map(leg => leg._id).reduce((accumulator, curr) => (accumulator[curr]=false, accumulator),{})

  const [checked, setChecked] = useState(legKeys)
  const [submitting, setSubmitting] = useState(false)
  const [errorState, setErrorState] = useState({})
  const [open, setOpen] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    let numErrors = Object.keys(errorState).length
    if (submitting) {
      if (numErrors === 0) {
        addItinerary()
      } else {
        setSubmitting(false)
      }
    }
  }, [errorState])

  const addItinerary = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/itineraries', {
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

  const handleChange = event => {
    setChecked({ ...checked, [event.target.name]: event.target.checked })
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

    if (!formState.legs || formState.legs.length !== 2) {
      errors.legs = true
    }
    
    if (formState.price < 0 || formState.price === '') {
      errors.price = true
    }
    if (!formState.agent) {
      errors.agent = true
    } 
    
    if (!formState.agentRating ) {
      errors.agentRating = true
    }
    
    return errors
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    const keys = Object.keys(checked)
    const legs = keys.filter(val => checked[val])
    
    const price = parseInt(formState.price)
    const agentRating = props.agents.filter(agent => formState.agent === agent.name).map(agent => agent.rating)[0]
    setFormState({ ...formState, legs, price, agentRating })

    const errors = validation()
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
      <Typography variant="h2" component="h2" color="primary" className={classes.title}>
        Add Itinerary
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
        <Grid container direction="column" justify="center" className={classes.section}>
          <FormLabel className={classes.input}>Select 2 Flights</FormLabel>
          {
            props.legs.map(leg => {
              return (
                <Card className={classes.card}>
                  <CardContent>
                    <Leg key={leg._id} leg={leg} access={false} />
                  </CardContent>
                  <CardActions disableSpacing className={classes.cardActions}>
                    <Checkbox 
                      onChange={handleChange}
                      name={`${leg._id}`}
                      checked={checked[leg._id]}
                    />
                  </CardActions>
                </Card>
              )
            })
          }
        </Grid>
        <Grid container direction="column" justify="center" className={classes.section}>
          <TextField
            label="Price"
            name="price"
            value={formState.price}
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
              startAdornment: <InputAdornment positiion="start" className={classes.input}>&pound;&nbsp;</InputAdornment> 
            }}
          />
          <FormControl variant="outlined" className={classes.select}>
            <InputLabel id="agent" className={classes.inputLabel}>Agent</InputLabel>
            <Select
              labelId="agent"
              label="Agent"
              name="agent"
              value={formState.agent}
              className={classes.input}
              onChange={handleInputChange}
            >
              {
                props.agents.map(agent => {
                  return (
                    <MenuItem key={agent._id} value={agent.name} className={classes.input}>
                      {agent.name}
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
          Please fill out all fields or make sure only 2 Flights are selected
        </Alert>
      </Snackbar>
    </Grid>
  )
}

NewItinerary.getInitialProps = async () => {
  const lg_res = await fetch('http://localhost:3000/api/legs')
  const legs = await lg_res.json()

  const ag_res = await fetch('http://localhost:3000/api/agents')
  const agents = await ag_res.json()

  return { legs: legs.data, agents: agents.data }
}

export default NewItinerary