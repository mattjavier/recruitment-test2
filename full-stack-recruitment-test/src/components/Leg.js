import Link from 'next/link'
import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

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
    marginRight: theme.spacing(0)
  },
  success: {
    color: theme.palette.success.main
  },
  error: {
    color: theme.palette.error.main 
  },
  buttonGroup: {
    height: theme.spacing(2),
    marginRight: theme.spacing(1.5)
  },
}))

const Leg = (props) => {
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
          src={`https://logos.skyscnr.com/images/airlines/favicon/${props.leg.airlineId}.png`} 
          alt="Airline Logo"
          className={classes.logo}
        />
        
        {/* Departure */}
        <Time 
          info={{ 
            airport: props.leg.departureAirport, 
            time: props.leg.departureTime
          }}
        />

        {/* Flight Icon  */}
        <div className={classes.icon}>
          <ArrowForwardIcon color="primary" />
        </div>

        {/* Arrival */}
        <Time 
          info={{ 
            airport: props.leg.arrivalAirport, 
            time: props.leg.arrivalTime
          }}
        />
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column" 
        className={classes.right}
      >
        {/* Flight Duration */}
        <Typography
          color="secondary" 
        >
          {`${hours(props.leg.durationMins)}h ${minutes(props.leg.durationMins)}`}
        </Typography>
        
        {/* Potential Stops */}
        {
          props.leg.stops > 0 ? (
            <Typography
              className={classes.error}
            >
              {props.leg.stops} {
                props.leg.stops > 1 ? ('Stops') : ('Stop')
              }
            </Typography>
          ) : (
            <Typography 
              className={classes.success}
            >
              Direct
            </Typography>
          )
        }
      </Grid>
      {
        props.access === true ? (
          <ButtonGroup orientation="vertical" variant="text" className={classes.buttonGroup}>
            <Link href={`legs/${props.leg._id}/edit`}>
              <a className={classes.button}>
                <EditIcon color="secondary" fontSize="small" />
              </a>
            </Link>
            <Link href={`legs/${props.leg._id}/delete`}>
              <a className={classes.button}>
                <DeleteIcon color="error" fontSize="small" />
              </a>
            </Link>
          </ButtonGroup>
        ) : null
      }
    </Grid>
  )
}

export default Leg