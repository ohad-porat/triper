/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("comments", (t) => {
    t.bigIncrements("id")
    t.string("title").notNullable()
    t.text("content")
    t.bigInteger("tripId").notNullable().unsigned().index().references("trips.id")
    t.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("comments")
}
