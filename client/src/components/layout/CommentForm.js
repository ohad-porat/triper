import React, { useState, useEffect } from "react"
import getCurrentUser from "../../services/getCurrentUser.js"

import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const Comment = (props) => {
  const [comment, setComment] = useState({
    title: "",
    content: "",
    userId: "",
    tripId: "",
  })
  const [errors, setErrors] = useState([])

  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    userName: "",
  })
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(() => {
        setCurrentUser(null)
      })
  }, [])

  comment.tripId = props.tripId
  comment.userId = currentUser.id

  const handleInputChange = (event) => {
    setComment({
      ...comment,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handlePost = async () => {
    try {
      const response = await fetch("/api/v1/comments", {
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
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handlePost()
    if (comment.title.trim() !== "") {
      setComment({ ...comment, title: "", content: "" })
    }
    props.showTrip()
  }

  return (
    <div className="comment">
      <form onSubmit={handleSubmit}>
        <ErrorList errors={errors} />
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={comment.title}
          ></input>
        </label>

        <label htmlFor="content">
          Comment:
          <textarea
            id="content"
            name="content"
            onChange={handleInputChange}
            value={comment.content}
          />
        </label>

        <input type="submit" value="submit comment"></input>
      </form>
    </div>
  )
}

export default Comment
