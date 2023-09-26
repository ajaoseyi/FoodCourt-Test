import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('addons', (table) => {
    table.increments('id').primary();
    table.decimal('amount', 10, 2).notNullable();
    table.integer('meal_id').notNullable();
    table.jsonb('meal_data').notNullable();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('addons');
}
