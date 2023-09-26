import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('order_logs', (table) => {
    table.increments('id').primary();
    table.string('description').notNullable();
    table.integer('order_id').nullable();
    table.dateTime('time').notNullable();
    table.boolean('is_deleted').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_logs');
}
