/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("trips", t => {
    t.bigInteger("userId").notNullable().unsigned().index().references("users.id")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("trips", t => {
    t.dropColumn("userId")
  })
}
