import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.boolean('completed').defaultTo(false);
    table.boolean('cancelled').defaultTo(false);
    table.boolean('kitchen_cancelled').defaultTo(false);
    table.boolean('kitchen_accepted').defaultTo(false);
    table.boolean('kitchen_dispatched').defaultTo(false);
    table.timestamp('kitchen_dispatched_time');
    table.timestamp('kitchen_accepted_time');
    table.timestamp('kitchen_prepared_time');
    table.timestamp('completed_time');
    table.boolean('kitchen_prepared').defaultTo(false);
    table.boolean('paid').defaultTo(false);
    table.string('order_code');
    table.integer('calculated_order_id').notNullable();
    table.timestamp('kitchen_verified_time');
    table.timestamp('kitchen_completed_time');
    table.integer('order_type_id');
    table.boolean('is_hidden').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
}
