import React, { useState, useEffect } from "react"
import CommentTile from "./CommentTile.js"

const CommentList = (props) => {
  const [comments, setComments] = useState([])

  const getComments = async () => {
    try {
      const response = await fetch(`/api/v1/trips/${props.tripId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const tripData = await response.json()
      setComments(tripData.trip.comments)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  const commentTiles = comments.map((comment) => {
    return <CommentTile key={comment.id} comment={comment} />
  })

  return (
    <>
      <h3>Comments</h3>
      {commentTiles}
    </>
  )
}

export default CommentList
