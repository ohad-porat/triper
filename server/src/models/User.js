/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt")
const unique = require("objection-unique")
const Model = require("./Model")

const saltRounds = 10

const uniqueFunc = unique({
  fields: ["email", "userName"],
  identifiers: ["id"],
})

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users"
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds)
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword)
  }

  static get relationMappings() {
    const { Trip, Comment } = require("./index.js")

    return {
      trips: {
        relation: Model.HasManyRelation,
        modelClass: Trip,
        join: {
          from: "users.id",
          to: "trips.userId",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "users.id",
          to: "comments.userId",
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "userName"],

      properties: {
        email: { type: "string" },
        cryptedPassword: { type: "string" },
        userName: { type: "string" },
      },
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json)

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword
    }

    return serializedJson
  }
}

module.exports = User
