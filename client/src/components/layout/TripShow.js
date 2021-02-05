import React, { useState, useEffect } from "react"
import { Redirect, Link } from "react-router-dom"
import CommentTile from "./CommentTile.js"
import CommentForm from "./CommentForm.js"

import translateServerErrors from "../../services/translateServerErrors.js"

const TripShow = (props) => {
  const [trip, setTrip] = useState({
    comments: [],
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

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

  const handleDeleteShowPage = async () => {
    try {
      const response = await fetch(`/api/v1/trips/${tripId}`, {
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
    return <Redirect to="/" />
  }

  const userButton = [
    <div key="delete-edit" className="delete-edit-div">
      <button className="submit-button alert button" onClick={handleDeleteShowPage}>Delete</button>
      <Link to={`/trips/${tripId}/edit`}><button className="submit-button success button">Edit</button></Link>
    </div>
  ]

  const emptyPtag = [<p key="emptyP"></p>]

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
      <div className="tripShowText">
        <h4>{trip.city}, {trip.country} {trip.numberOfDays} day trip</h4>
        <p>{trip.description}</p>
        {trip.userId === trip.currentUserId ? userButton : emptyPtag}
      </div>
      <CommentForm
        tripId={trip.id}
        showTrip={showTrip}
        errors={errors}
        postComment={postComment}
      />
      {commentTiles}
    </div>
  )
}

export default TripShow
