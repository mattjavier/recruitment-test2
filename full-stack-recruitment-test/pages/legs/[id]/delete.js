import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

import Leg from '../../../src/components/Leg'

import absoluteUrl from 'next-absolute-url'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(6),
    width: '75%'
  },
  content: {
    padding: theme.spacing(8)
  },
  actions: {
    padding: theme.spacing(4)
  }
}))

const DeleteLeg = props => {
  
  const classes = useStyles()

  const [deleted, setDeleted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (deleted) {
      deleteLeg()
    } 
  }, [deleted])

  const deleteLeg = async () => {
    try {
      let legId = router.query.id

      let references = props.itineraries.filter(itinerary => itinerary.legs.includes(legId))
      let ids = references.map(reference => reference._id)
      
      for (let i = 0; i < ids.length; i++) {
        const deletedIt = await fetch(`${props.path}/api/itineraries/${ids[i]}`, {
          method: 'DELETE'
        })
      }

      const deletedLeg = await fetch(`${props.path}/api/legs/${router.query.id}`, {
        method: 'DELETE',
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
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Leg leg={props.leg} access={false} />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button 
            size="small" 
            variant="contained" 
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

DeleteLeg.getInitialProps = async ({ req, query: { id } }) => {

  const { origin } = absoluteUrl(req)
  const url = origin

  const res = await fetch(`${url}/api/legs/${id}`)
  const leg = await res.json()

  const it_res = await fetch(`${url}/api/itineraries`)
  const itineraries = await it_res.json()
 
  return { leg: leg.data, itineraries: itineraries.data, path: url }
}

export default DeleteLeg