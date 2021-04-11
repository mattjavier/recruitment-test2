import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'

import Leg from '../../../src/components/Leg'

import absoluteUrl from 'next-absolute-url'

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

const EditItinerary = props => {

  const classes = useStyles()
  
  const [formState, setFormState] = useState({
    legs: props.itineraries.legs,
    price: props.itineraries.price, 
    agent: props.itineraries.agent,
    agentRating: props.itineraries.agentRating
  })

  const legKeys = props.legs.map(leg => leg._id).reduce((accumulator, curr) => (accumulator[curr]=false, accumulator),{})
  
  legKeys[props.itineraries.legs[0]] = true
  legKeys[props.itineraries.legs[1]] = true

  const [checked, setChecked] = useState(legKeys)
  const [submitting, setSubmitting] = useState(false)
  const [errorState, setErrorState] = useState({})
  const router = useRouter()

  const checkboxError = Object.keys(legKeys).filter((item) => checked[item]).length !== 2
  
  useEffect(() => {
    let numErrors = Object.keys(errorState).length
    if (submitting) {
      if (numErrors === 0) {
        updateItinerary()
      } else {
        setSubmitting(false)
      }
    }
  }, [errorState])

  const updateItinerary = async () => {
    try {
      const res = await fetch(`${props.path}/api/itineraries/${router.query.id}`, {
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

  const handleChange = event => {
    setChecked({ ...checked, [event.target.name]: event.target.checked })
  }

  const handleInputChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const validation = () => {
    let errors = {}

    if (!formState.legs || formState.legs.length !== 2) {
      errors.legs = checkboxError
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
        Update Itinerary
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
        <Grid container direction="column" justify="center" className={classes.section}>
          <FormControl required error={checkboxError}>
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
            {
              checkboxError ? <FormHelperText>Please select 2 flights</FormHelperText> : null
            }
          </FormControl>
        </Grid>
        <Grid container direction="column" justify="center" className={classes.section}>
          <TextField
            error={errorState.price}
            helperText={errorState.price ? 'Please input a price' : null }
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
          <FormControl variant="outlined" className={classes.select} error={errorState.agentRating}>
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
            {
              errorState.agent ? <FormHelperText>Please select an agent</FormHelperText> : null
            }
          </FormControl>
        </Grid>
        <Button variant="contained" type="submit" color="primary" className={classes.button}>Submit</Button>
      </form>
    </Grid>
  )
}

EditItinerary.getInitialProps = async ({ req, query: { id } }) => {

  const { origin } = absoluteUrl(req)
  const url = origin

  const lg_res = await fetch(`${url}/api/legs`)
  const legs = await lg_res.json()

  const ag_res = await fetch(`${url}/api/agents`)
  const agents = await ag_res.json()

  const it_res = await fetch(`${url}/api/itineraries/${id}`)
  const itineraries = await it_res.json()
  return { itineraries: itineraries.data, legs: legs.data, agents: agents.data, path: url }
}

export default EditItinerary