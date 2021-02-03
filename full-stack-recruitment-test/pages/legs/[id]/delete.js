import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

import { makeStyles } from '@material-ui/core/styles'

import Leg from '../../../src/components/Leg'

const useStyles = makeStyles((theme) => ({

}))

const DeleteLeg = props => {
  console.log(props)
  const classes = useStyles()

  return (
    <>
      <Leg leg={props.leg} access={false} />
    </>
  )

}

DeleteLeg.getInitialProps = async ({ query: { id }}) => {
  const res = await fetch(`http://localhost:3000/api/legs/${id}`)
  const leg = await res.json()

  return { leg: leg.data }
}

export default DeleteLeg