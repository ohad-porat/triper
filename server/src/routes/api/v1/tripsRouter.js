import express from "express"

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

export default tripsRouter
