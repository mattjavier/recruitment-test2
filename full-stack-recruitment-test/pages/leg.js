import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Select from '@material-ui/core/Select'

const NewLeg = () => {
  const [formState, setFormState] = useState({
    departureAirport: '',
    arrivalAirport: '',
    departureTime: '',
    arrivalTime: '',
    stops: 0,
    airlineName: '',
    airlineId: '',
    durationMins: 0
  })

  const []
}

NewLeg.getInitialProps = async () => {
  const al_res = await fetch('http://localhost:3000/api/airlines')
  const airlines = await al_res.json()
  
  return { airlines: airlines.data }
}

export default NewLeg