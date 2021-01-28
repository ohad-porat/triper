import express from "express"

import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

import Trip from "../../../models/Trip.js"
import TripSerializer from "../../../serializers/TripSerializer.js"

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
  try {
    const trips = await Trip.query().findById(id)
    return res.status(200).json({ trips })
  } catch (error) {
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

export default tripsRouter
