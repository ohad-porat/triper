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
}

module.exports = Trip
