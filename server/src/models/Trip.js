const Model = require("./Model")

class Trip extends Model {
  static get tableName() {
    return "trips"
  }

  static get relationMappings() {
    const { User, Comment } = require("./index.js")

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "trips.userId",
          to: "users.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "trips.id",
          to: "comments.tripId",
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["continent", "country", "title", "description"],
      properties: {
        continent: { type: "string" },
        country: { type: "string" },
        city: { type: "string" },
        title: { type: "string" },
        numberOfDays: { type: ["integer", "string"] },
        description: { type: "text" },
        userId: { type: ["integer", "string"] },
      },
    }
  }
}

module.exports = Trip
