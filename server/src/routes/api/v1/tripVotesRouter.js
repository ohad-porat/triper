import express from "express"

import Vote from "../../../models/Vote.js"

const tripVotesRouter = new express.Router({ mergeParams: true })

tripVotesRouter.get("/", async (req, res) => {
  const userId = req.user.id
  const { tripId } = req.params

  try {
    const votes = await Vote.query().where({ tripId: tripId })
    const userVote = votes.find((element) => element.userId === userId)
    let totalVotes = 0
    for (let thisVote of votes) {
      totalVotes += thisVote.vote
    }
    return res.status(200).json({userVote, totalVotes})
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

tripVotesRouter.post("/", async (req, res) => {
  const { body } = req
  const userId = req.user.id
  const { tripId } = req.params

  try {
    const newVote = await Vote.query().insertAndFetch({
      ...body,
      tripId,
      userId,
    })
    return res.status(201).json({ newVote })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

tripVotesRouter.patch("/", async (req, res) => {
  const { body } = req
  const userId = req.user.id
  const { tripId } = req.params
  const vote = await Vote.query().where({ userId: userId, tripId: tripId })
  
  try {
    const newVote = await Vote.query().updateAndFetchById(parseInt(vote[0].id), {
      ...body,
      tripId,
      userId,
    })
    return res.status(201).json({ newVote })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default tripVotesRouter
