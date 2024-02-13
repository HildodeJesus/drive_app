import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary().notNullable()
    table.string("name").notNullable()
    table.string("email").notNullable().unique()
    table.string("password").notNullable()
    table.datetime("created_at").notNullable()
    table.datetime("updated_at").notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users")
}

