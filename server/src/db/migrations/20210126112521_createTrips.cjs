/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("trips", (t) => {
    t.bigIncrements("id")
    t.string("continent").notNullable()
    t.string("country").notNullable()
    t.string("city")
    t.string("title").notNullable()
    t.integer("numberOfDays")
    t.text("description").notNullable()
    t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("trips")
}
