import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

import Itinerary from '../../../src/components/Itinerary'

const url = process.env.NODE_ENV === 'production' ? 'https://recruitment-test2.vercel.app' : 'http://localhost:3000'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6),
    width: '80%'
  },
  button: {
    width: '80%'
  }
}))

const DeleteItinerary = props => {

  const classes = useStyles()
  
  const [deleted, setDeleted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (deleted) {
      deleteItinerary()
    }
  }, [deleted])

  const deleteItinerary = async () => {
    try {
      const deletedItinerary = await fetch(`${url}/api/itineraries/${router.query.id}`, {
        method: 'DELETE'
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    setDeleted(true)
  }

  return (
    <Grid container justify="center" alignItems="center">
      <div className={classes.root}>
        <Itinerary itinerary={props.itinerary} legs={props.legs} access={false} />
      </div>
      <Button 
        variant="contained"
        color="primary"
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
        className={classes.button}
      >
        Delete
      </Button>
    </Grid>
  )
}

DeleteItinerary.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${url}/api/itineraries/${id}`)
  const itinerary = await res.json()

  const lg_res = await fetch(`${url}/api/legs`)
  const legs = await lg_res.json()

  return { itinerary: itinerary.data, legs: legs.data }
}

export default DeleteItinerary