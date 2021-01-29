import React, { useState, useEffect } from "react"
import CommentTile from "./CommentTile.js"
import CommentForm from "./CommentForm.js"

const TripShow = (props) => {
  const [trip, setTrip] = useState({
    comments: []
  })

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
      setTrip(tripData.trip)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    showTrip()
  }, [])

  const commentTiles = trip.comments.map((comment) => {
    return <CommentTile key={comment.id} comment={comment} />
  })

  return (
    <div className="show">
      <h1 className="tripTitle">{trip.title}</h1>
      <h4>
        {trip.city}, {trip.country} {trip.numberOfDays} day trip
      </h4>
      <p>{trip.description}</p>
      <CommentForm tripId={trip.id} showTrip={showTrip} />
      {commentTiles}
    </div>
  )
}

export default TripShow
