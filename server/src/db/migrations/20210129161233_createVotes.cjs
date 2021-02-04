/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("votes", (t) => {
    t.bigIncrements("id")
    t.bigInteger("userId").index().unsigned().notNullable().references("users.id")
    t.bigInteger("tripId").index().unsigned().notNullable().references("trips.id")
    t.integer("vote").notNullable()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("votes")
}
