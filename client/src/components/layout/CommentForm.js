import React, { useState } from "react"
import ErrorList from "./ErrorList.js"

const CommentForm = (props) => {
  const [comment, setComment] = useState({
    title: "",
    content: "",
  })

  const handleInputChange = (event) => {
    setComment({
      ...comment,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (props.postComment(comment)) {
      setComment({ ...comment, title: "", content: "" })
    }
  }

  return (
    <div className="comment">
      <form onSubmit={handleSubmit}>
        <ErrorList errors={props.errors} />
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={comment.title}
          />
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

        <div className="submit-button-div">
          <input type="submit" className="button medium submit-button" value="Submit Comment" />
        </div>

      </form>
    </div>
  )
}

export default CommentForm
