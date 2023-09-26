import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('brand_id').unsigned().notNullable();
    table.text('description').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.foreign('brand_id').references('id').inTable('brands');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}
