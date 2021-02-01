import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff'
  },
  logo: {
    height: theme.spacing(6),
    verticalAlign: 'top'
  },
  link: {
    padding: theme.spacing(0, 1),
    color: theme.palette.primary.main,
    '& hover': {
      color: theme.palette.secondary.main
    }
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <Paper 
      className={classes.header} 
      elevation={3}
      square
    >
      <Link href="/">
        <img
          className={classes.logo}
          alt="Skyscanner"
          src="/logo.svg"
        />
      </Link>
      <Grid
        container
        justify="flex-end"
      >
        <Link href="/leg">
          <a className={classes.link}>Add Leg</a>
        </Link>
        <Link href="/itinerary">
          <a className={classes.link}>Add Itinerary</a>
        </Link>
      </Grid>
    </Paper>
  )
}

export default Header