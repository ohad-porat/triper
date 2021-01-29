const Model = require("./Model")

class Trip extends Model {
  static get tableName() {
    return "trips"
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
      },
    }
  }

  static get relationMappings() {
    const { Comment } = require("./index.js")
    
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "trips.id",
          to: "comments.tripId"
        }
      }
    }
  }
}

module.exports = Trip
