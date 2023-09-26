import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('brands', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().index('brand_name_index');
    table.string('description').notNullable();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('brands');
}
