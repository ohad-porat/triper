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
    ]

    let serializedTrip = {}
    for (const attribute of allowedAttributes) {
      serializedTrip[attribute] = trip[attribute]
    }
    const comments = await trip.$relatedQuery("comments")
    let serializedComments = []
    for (let i = 0; i < comments.length; i++) {
      const comment = await CommentSerializer.getDetails(comments[i])
      serializedComments.push(comment)
    }
    serializedTrip.comments = serializedComments
    return serializedTrip
  }
}

export default TripSerializer
