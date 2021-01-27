import React, { useState, useEffect } from "react"
import TripTile from "./TripTile"

const TripsList = (props) => {
  const [trips, setTrips] = useState([])

  const fetchTrips = async () => {
    try {
      const response = await fetch("/api/v1/trips")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setTrips(responseBody.trips)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  const tripTiles = trips.map((trip) => {
    return <TripTile key={trip.id} trip={trip} />
  })

  return (
    <>
      <h1>Find Your Trip</h1>
      {tripTiles}
    </>
  )
}

export default TripsList
