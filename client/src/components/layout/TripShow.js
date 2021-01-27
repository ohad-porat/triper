import React, { useState, useEffect } from "react"

const TripShow = (props) => {
  const [trip, setTrip] = useState({})
  const id = props.match.params.id

  const showTrip = async () => {
    try {
      const response = await fetch(`/api/v1/trips/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const tripData = await response.json()
      setTrip(tripData.trips)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    showTrip()
  }, [])
  return (
    <div>
      <h1>{trip.title}</h1>
      <h4>
        {trip.city}, {trip.country} {trip.numberOfDays} day trip
      </h4>
      <p>{trip.description}</p>
    </div>
  )
}

export default TripShow
