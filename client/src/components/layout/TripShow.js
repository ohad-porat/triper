import React, { useState, useEffect } from "react"
import CommentTile from "./CommentTile.js"
<<<<<<< HEAD
import UpVotes from "./UpVotes.js"
=======
import CommentForm from "./CommentForm.js"

import translateServerErrors from "../../services/translateServerErrors.js"
>>>>>>> 10bfac66780f8a59b5c4f06a818119b71f18c82f

const TripShow = (props) => {
  const [trip, setTrip] = useState({
    comments: [],
  })

  const [errors, setErrors] = useState([])

  const tripId = props.match.params.id

  const showTrip = async () => {
    try {
      const response = await fetch(`/api/v1/trips/${tripId}`)
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

  const postComment = async (comment) => {
    try {
      const response = await fetch(`/api/v1/trips/${tripId}/comments`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(comment),
      })
      if (!response.ok) {
        if (response.status == 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      } else {
        const responseBody = await response.json()
        if (responseBody.serializedComment) {
          let newComments = trip.comments.concat(responseBody.serializedComment)
          setTrip({
            ...trip,
            comments: newComments,
          })
        }

        return true
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

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
<<<<<<< HEAD
      <UpVotes />
      <h3>Comments</h3>
=======
      <CommentForm
        tripId={trip.id}
        showTrip={showTrip}
        errors={errors}
        postComment={postComment}
      />
>>>>>>> 10bfac66780f8a59b5c4f06a818119b71f18c82f
      {commentTiles}
    </div>
  )
}

export default TripShow
