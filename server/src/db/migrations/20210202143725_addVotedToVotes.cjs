/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("votes", (t) => {
    t.boolean("voted").notNullable()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("votes", (t) => {
    t.dropColumn("voted")
  })
}
