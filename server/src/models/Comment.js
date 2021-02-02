const Model = require("./Model.js")

class Comment extends Model {
  static get tableName() {
    return "comments"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
        content: { type: "text" },
        tripId: { type: ["integer", "string"] },
        userId: { type: ["integer", "string"] },
      },
    }
  }

  static get relationMappings() {
    const { Trip, User } = require("./index.js")

    return {
      trip: {
        relation: Model.BelongsToOneRelation,
        modelClass: Trip,
        join: {
          from: "comments.tripId",
          to: "trips.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Comment
