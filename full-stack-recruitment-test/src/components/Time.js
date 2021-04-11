import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(5)
  }
}))

const Time = props => {

  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justify="center" 
      className={classes.root}
    >
      <Typography
        color="primary" 
        m={0}
      >
        {props.info.time.substr(props.info.time.length - 5)}
      </Typography>
      <Typography
        color="secondary"
        m={0} 
      >
        {props.info.airport}
      </Typography>
    </Grid>
  )
}

export default Time