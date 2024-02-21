import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("files",(table) => {
    table.string('id').notNullable().primary()
    table.string('fileName').notNullable()
    table.string('s3Url').notNullable()
    table.string('userId').notNullable().references('id').inTable('users').onDelete("CASCADE")
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('files')
}

