import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import Time from './Time'

const hours = mins => {
  return Math.floor(mins / 60).toString()
}

const minutes = mins => {
  if (mins % 60 === 0) {
    return '00'
  } else {
    return (mins % 60).toString()
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2.5)
  },
  logo: {
    height: theme.spacing(8),
    paddingRight: theme.spacing(5)
  },
  icon: {
    paddingRight: theme.spacing(5)
  },
  right: {
    marginRight: theme.spacing(2.5)
  }
}))

const Leg = props => {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="space-between"
      alignItems="flex-start"
      wrap="nowrap"
      className={classes.root}
    >
      <Grid
        container
        alignItems="center"
        justify="space-between"
        wrap="nowrap"
      >
        {/* Airline Logo */}
        <img 
          src={`https://logos.skyscnr.com/images/airlines/favicon/${props.leg.airline_id}.png`} 
          alt="Airline Logo"
          className={classes.logo}
        />
        
        {/* Departure */}
        <Time 
          info={{ 
            airport: props.leg.departure_airport, 
            time: props.leg.departure_time
          }}
        />

        {/* Flight Icon  */}
        <div className={classes.icon}>
          <ArrowForwardIcon color="primary" />
        </div>

        {/* Arrival */}
        <Time 
          info={{ 
            airport: props.leg.arrival_airport, 
            time: props.leg.arrival_time
          }}
        />
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="flex-end"
        direction="column" 
        className={classes.right}
      >
        {/* Flight Duration */}
        <Typography
          color="secondary" 
        >
          {`${hours(props.leg.duration_mins)}h ${minutes(props.leg.duration_mins)}`}
        </Typography>
        
        {/* Potential Stops */}
        {
          props.leg.stops > 0 ? (
            <Typography
              color="error"
            >
              {props.leg.stops} {
                props.leg.stops > 1 ? ('Stops') : ('Stop')
              }
            </Typography>
          ) : (
            <Typography 
              color="success"
            >
              Direct
            </Typography>
          )
        }
      </Grid>
    </Grid>
  )
}

export default Leg