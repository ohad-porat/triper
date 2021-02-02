const Model = require("./Model.js")

class Vote extends Model {
  static get tableName() {
    return "votes"
  }

  static get relationMappings() {
    const { User, Trip } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id",
        },
      },

      trip: {
        relation: Model.BelongsToOneRelation,
        modelClass: Trip,
        join: {
          from: "votes.tripId",
          to: "trips.id",
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["vote"],
      properties: {
        userId: { type: ["integer", "string"] },
        tripId: { type: ["integer", "string"] },
        vote: { type: ["integer", "string"], minimum: -1, maximum: 1 },
      },
    }
  }
}

module.exports = Vote
