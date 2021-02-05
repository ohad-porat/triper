import express from "express"

import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

import Trip from "../../../models/Trip.js"
import TripSerializer from "../../../serializers/TripSerializer.js"
import tripVotesRouter from "./tripVotesRouter.js"
import tripCommentsRouter from "./tripCommentsRouter.js"

const tripsRouter = new express.Router()

tripsRouter.get("/", async (req, res) => {
  try {
    const rawTrips = await Trip.query()
    const trips = rawTrips.map((trip) => TripSerializer.getSummary(trip))
    return res.status(200).json({ trips })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

tripsRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  // let currentUserId = undefined
  // if (req.user) {
  //   currentUserId = req.user.id
  // }

  try {
    const rawTrip = await Trip.query().findById(id)
    const trip = await TripSerializer.getDetails(rawTrip)
    return res.status(200).json({ trip })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

tripsRouter.delete("/:id", async (req, res) => {
  const tripId = req.params.id

  try {
    await Trip.query().deleteById(tripId)
    return res.status(204).json({ message: "The trip has been deleted!"})
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

tripsRouter.patch("/:id", async (req, res) => {
  const body = req.body
  const {
    id,
    continent,
    country,
    title,
    description,
    userId,
    city
  } = body
  const formInput = cleanUserInput({ id, continent, country, title, description, userId })
  
  let numberOfDays = body.numberOfDays
  if (numberOfDays === "") {
    numberOfDays = null
  }
  
  try {
    const updatedTrip = await Trip.query().updateAndFetchById(parseInt(body.id), {
      ...formInput,
    numberOfDays,
    city
    })
    return res.status(200).json({ trip: updatedTrip })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

tripsRouter.post("/", async (req, res) => {
  const body = req.body
  const userId = req.user.id
  const cleanBody = cleanUserInput(body)

  try {
    const newTrip = await Trip.query().insertAndFetch({ ...cleanBody, userId })
    return res.status(201).json({ trip: newTrip })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

tripsRouter.use("/:tripId/votes", tripVotesRouter)
tripsRouter.use("/:tripId/comments", tripCommentsRouter)

export default tripsRouter
