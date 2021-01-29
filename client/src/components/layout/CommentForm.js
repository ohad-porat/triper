import React, { useState } from "react"

import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const Comment = (props) => {
  const [comment, setComment] = useState({
    title: "",
    content: "",
  })
  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setComment({
      ...comment,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

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

  return (
    <div className="comment">
      <form onSubmit={handleSubmit}>
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
