import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Header from '../src/components/Header'
import Flights from '../src/components/Flights'

import flights from '../public/flights.json'

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
      <Head>
        <title>Skyscanner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
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

export const getStaticProps = async () => {
  const json = flights

  return {
    props: { 
      itineraries: json.itineraries, 
      legs: json.legs
    }
  }
}

export default Home