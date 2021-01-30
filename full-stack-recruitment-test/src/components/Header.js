import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    padding: theme.spacing(3),
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff'
  },
  logo: {
    height: theme.spacing(6),
    verticalAlign: 'top'
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
      <a href="/">
        <img
          className={classes.logo}
          alt="Skyscanner"
          src="/logo.svg"
        />
      </a>
    </Paper>
  )
}

export default Header