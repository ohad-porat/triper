import React from "react"
import { Link } from "react-router-dom"

const TripTile = (props) => {
  let location = ""
  if (props.trip.city) {
    location = `${props.trip.city}, ${props.trip.country}`
  } else {
    location = `${props.trip.country}`
  }

  let numOfDays = ""
  if (props.trip.numberOfDays) {
    numOfDays = `Number Of Days: ${props.trip.numberOfDays}`
  }
  
  return (
    <div>
      <h2>
        <Link to={`/trips/${props.trip.id}`}>{props.trip.title}</Link>
      </h2>
      <h3>Location: {location}</h3>
      <h3>{numOfDays}</h3>
      <p>{props.trip.description}</p>
    </div>
  )
}

export default TripTile
