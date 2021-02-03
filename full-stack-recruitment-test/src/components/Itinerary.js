import Link from 'next/link'
import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import Leg from './Leg'

const formatString = rating => {
  let str = rating.toString()
  let num = parseFloat(str).toFixed(1)
  return num.toString()
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    backgroundColor: '#ffffff',
    width: '100%'
  },
  section: {
    width: '100%'
  },
  price: {
    fontSize: theme.spacing(6),
    margin: 0
  },
  agent: {
    fontSize: theme.spacing(3),
    margin: 0,
    "& span": {
      color: theme.palette.text.secondary
    }
  },
  buttonGroup: {
    height: theme.spacing(5),
    padding: theme.spacing(1, 0)
  },
  button: {
    color: theme.palette.secondary.main,
    padding: theme.spacing(0, 1)
  }
}))

const Itinerary = props => {
  
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Grid 
        item
        className={classes.section}
      >
        {/* Leg 1 */}
        <Leg 
          leg={props.legs.find(leg => leg._id === props.itinerary.legs[0])}
          access={props.access}
        />
        <hr/>
        {/* Leg 2 */}
        <Leg
          leg={props.legs.find(leg => leg._id === props.itinerary.legs[1])}
          access={props.access}
        />
      </Grid>
      <Grid 
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          {/* Flight Price */}
          <Typography
            color="primary" 
            className={classes.price}
          >
            &pound;{props.itinerary.price}
          </Typography>

          {/* Flight Agent and Rating */}
          <Typography 
            component="p"
            color="textPrimary"
            className={classes.agent}
          >
            {props.itinerary.agent}
            <span>
              &nbsp;({formatString(props.itinerary.agentRating)})
            </span>
          </Typography>
        </Grid>
        {
          props.access ? (
            <ButtonGroup variant="text" className={classes.buttonGroup}>
              <Link href={`itineraries/${props.itinerary._id}/edit`}>
                <a className={classes.button}>
                  <EditIcon color="primary" />
                </a>
              </Link>
              <Link href={`itineraries/${props.itinerary._id}/delete`}>
                <a className={classes.button}>
                  <DeleteIcon color="error" />
                </a>
              </Link>
            </ButtonGroup>
          ) : null
        }
      </Grid>
    </Card>
  )
}

export default Itinerary