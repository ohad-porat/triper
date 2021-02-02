import express from "express"

import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import CommentSerializer from "../../../serializers/CommentSerializer.js"

import Comment from "../../../models/Comment.js"

const tripCommentsRouter = new express.Router({ mergeParams: true })

tripCommentsRouter.post("/", async (req, res) => {
  const { body } = req
  const userId = req.user.id
  const { tripId } = req.params
  const formInput = cleanUserInput(body)

  try {
    const newComment = await Comment.query().insertAndFetch({
      ...formInput,
      userId,
      tripId,
    })
    const serializedComment = await CommentSerializer.getDetails(newComment)
    return res.status(201).json({ serializedComment })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default tripCommentsRouter
