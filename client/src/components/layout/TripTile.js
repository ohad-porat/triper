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
        <h2 className="trip-list-header tripListText">{title}</h2>
      </Link>
      <h4 className="tripListText">Location: {location}</h4>
      <h4 className="tripListText">Number of Days: {numOfDays}</h4>
    </div>
  )
}

export default TripTile
