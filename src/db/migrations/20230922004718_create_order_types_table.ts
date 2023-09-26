import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('order_types', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_types');
}
