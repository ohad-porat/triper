import React from "react"
import { Link } from "react-router-dom"

const TripTile = (props) => {
  const { country, city, title, numberOfDays, description, id } = props.trip

  let location = ""
  if (city) {
    location = `${city}, ${country}`
  } else {
    location = `${country}`
  }

  let numOfDays = ""
  if (numberOfDays) {
    numOfDays = `${numberOfDays}`
  } else {
    numOfDays = <i>Not Provided</i>
  }

  return (
    <div className="tripList">
      <Link to={`/trips/${id}`}>
        <h2>{title}</h2>
      </Link>
      <h3>Location: {location}</h3>
      <h3>Number of Days: {numOfDays}</h3>
      <p>{description}</p>
    </div>
  )
}

export default TripTile
