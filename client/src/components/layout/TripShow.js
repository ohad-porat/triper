import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const TripShow = (props) => {
  const [trip, setTrip] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

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

  const handleDeleteShowPage = async () => {
    try {
      const response = await fetch(`/api/v1/trips/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  if (shouldRedirect === true) {
    debugger
    return <Redirect to="/" />
  }

  const userButton = [
    <div key="delete-edit" className="submit-button-div">
      <button className="submit-button" onClick={handleDeleteShowPage}>Delete</button>
      <button className="submit-button">Edit</button>
    </div>
  ]

  const emptyPtag = [<p key="emptyP"></p>]

  return (
    <div className="show">
      <h1 className="tripTitle">{trip.title}</h1>
      <h4>
        {trip.city}, {trip.country} {trip.numberOfDays} day trip
      </h4>
      <p>{trip.description}</p>
      {trip.userId === trip.currentUserId ? userButton : emptyPtag}
    </div>
  )
}

export default TripShow