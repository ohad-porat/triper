class TripSerializer {
  static getSummary(trip) {
    const allowedAttributes = ["id", "continent", "country", "city", "title","numberOfDays", "description"]

    let serializedTrip = {}
    for (const attribute of allowedAttributes) {
      serializedTrip[attribute] = trip[attribute]
    }
    return serializedTrip
  }
}

export default TripSerializer