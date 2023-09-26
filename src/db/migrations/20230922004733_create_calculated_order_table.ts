import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('calculated_orders', (table) => {
    table.increments('id').primary();
    table.decimal('total_amount', 10, 2).defaultTo(0.0);
    table.boolean('free_delivery').defaultTo(false);
    table.decimal('delivery_fee', 10, 2).defaultTo(0.0);
    table.decimal('service_charge', 10, 2).defaultTo(0.0);
    table.jsonb('address_details').notNullable();
    table.json('meals').notNullable();
    table.integer('user_id').notNullable();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('calculated_orders');
}
