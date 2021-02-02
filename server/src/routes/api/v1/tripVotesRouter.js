import express from "express"

import Vote from "../../../models/Vote.js"

const tripVotesRouter = new express.Router({ mergeParams: true })

tripVotesRouter.post("/", async (req, res) => {
  const body = { req }
  const userId = req.user.id
  const { tripId } = req.params

  try {
    const newVote = await Vote.query().insertAndFetch({
      ...body,
      tripId,
      userId,
    })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default tripVotesRouter
