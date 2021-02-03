import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

import Leg from '../../../src/components/Leg'

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
      const deletedLeg = await fetch(`http://localhost:3000/api/legs/${router.query.id}`, {
        method: 'DELETE'
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async() => {
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

DeleteLeg.getInitialProps = async ({ query: { id }}) => {
  const res = await fetch(`http://localhost:3000/api/legs/${id}`)
  const leg = await res.json()

  return { leg: leg.data }
}

export default DeleteLeg