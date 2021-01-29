import express from "express"

import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

import Comment from "../../../models/Comment.js"

const commentsRouter = new express.Router()

commentsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)

  try {
    const newComment = await Comment.query().insertAndFetch(formInput)
    return res.status(201).json({ newComment })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default commentsRouter
