import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('log_requests', (table) => {
    table.increments('id').primary();
    table.string('url').notNullable();
    table.json('body').notNullable();
    table.string('method').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('log_requests');
}
