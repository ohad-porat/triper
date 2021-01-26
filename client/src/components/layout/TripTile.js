import React from "react"

const TripTile = ({country, city, title, numberOfDays, description}) => {
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
    <div>
      <h2>{title}</h2>
      <h3>Location: {location}</h3>
      <h3>Number of Days: {numOfDays}</h3>
      <p>{description}</p>
    </div>
  )
}

export default TripTile
