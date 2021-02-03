import CommentSerializer from "./CommentSerializer.js"

class TripSerializer {
  static getSummary(trip) {
    const allowedAttributes = [
      "id",
      "continent",
      "country",
      "city",
      "title",
      "numberOfDays",
      "description",
    ]

    let serializedTrip = {}
    for (const attribute of allowedAttributes) {
      serializedTrip[attribute] = trip[attribute]
    }
    return serializedTrip
  }

  static async getDetails(trip) {
    const allowedAttributes = [
      "id",
      "continent",
      "country",
      "city",
      "title",
      "numberOfDays",
      "description",
      "userId"
    ]

    let serializedTrip = {}
    for (const attribute of allowedAttributes) {
      serializedTrip[attribute] = trip[attribute]
    }
    const comments = await trip.$relatedQuery("comments")
    serializedTrip.comments = await Promise.all(
      comments.map((comment) => {
        return CommentSerializer.getDetails(comment)
      })
    )
    return serializedTrip
  }
}

export default TripSerializer
