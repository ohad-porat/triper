import React from "react"

const CommentTile = (props) => {
  const { title, content } = props.comment
  const userName = props.comment.user.userName

  let conditionalContent = ""
  if (content) {
    conditionalContent = content
  } else {
    conditionalContent = <i>No Content</i>
  }

  return (
    <div>
      <h4>{title}</h4>
      <p>by {userName}</p>
      <p>{conditionalContent}</p>
    </div>
  )
}

export default CommentTile
