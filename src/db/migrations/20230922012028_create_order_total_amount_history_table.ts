import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('order_total_amount_historys', (table) => {
    table.increments('id').primary();
    table.timestamp('time').notNullable();
    table.integer('total_amount').notNullable();
    table.integer('order_id').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_total_amount_historys');
}
