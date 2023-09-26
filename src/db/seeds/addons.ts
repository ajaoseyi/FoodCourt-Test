import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('addons').del();

  // Inserts seed entries
  await knex('addons').insert([
    {
      amount: 200,
      meal_id: 1,
      meal_data: JSON.stringify({
        id: '1',
        name: 'Extra meat',
        active: true,
        amount: '200',
        brand_id: '1',
        item_type: 'FOOD',
      }),
    },
    {
      amount: 150,
      meal_id: 1,
      meal_data: JSON.stringify({
        id: '2',
        name: 'Extra cheese',
        active: true,
        amount: '150',
        brand_id: '2',
        item_type: 'FOOD',
      }),
    },
    {
      amount: 180,
      meal_id: 1,
      meal_data: JSON.stringify({
        id: '3',
        name: 'Extra sauce',
        active: true,
        amount: '180',
        brand_id: '3',
        item_type: 'FOOD',
      }),
    },
  ]);
}
