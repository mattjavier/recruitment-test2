import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Leg from './Leg'

const formatString = numStr => {
  let num = parseFloat(numStr).toFixed(1)
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
          leg={props.legs.find(item => item.id === props.itinerary.legs[0])}
        />

        {/* Leg 2 */}
        <Leg
          leg={props.legs.find(item => item.id === props.itinerary.legs[1])}
        />
      </Grid>
      <Grid 
        item
        lg={12}
      >
        {/* Flight Price */}
        <Typography
          color="primary" 
          className={classes.price}
        >
          {props.itinerary.price}
        </Typography>

        {/* Flight Agent and Rating */}
        <Typography 
          component="p"
          color="textPrimary"
          className={classes.agent}
        >
          {props.itinerary.agent}
          <span>
            &nbsp;({formatString(props.itinerary.agent_rating)})
          </span>
        </Typography>
      </Grid>
    </Card>
  )
}

export default Itinerary