import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Flights from '../src/components/Flights'

import absoluteUrl from 'next-absolute-url'

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
    width: '100%'
  }
}))

const Home = props => {
  
  const classes = useStyles()

  return (
    <Grid 
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid
        container
        direction="column"
        justify="center" 
        alignItems="center"
        className={classes.main}
      >
        {/* List of Itineraries */}
        <Flights 
          itineraries={props.itineraries}
          legs={props.legs}
        />
      </Grid>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </Grid>
  )
}

Home.getInitialProps = async ({ req }) => {

  const { origin } = absoluteUrl(req)
  const url = origin

  const it_res = await fetch(`${url}/api/itineraries`)
  const itineraries = await it_res.json()

  const lg_res = await fetch(`${url}/api/legs`)
  const legs = await lg_res.json()
  
  return { itineraries: itineraries.data, legs: legs.data, path: url }
}

export default Home