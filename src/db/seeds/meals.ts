import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('meals').del();

  // Inserts seed entries
  await knex('meals').insert([
    {
      name: 'Chicken Curry',
      description: 'Delicious chicken curry with spices.',
      price: 10.99,
      brand_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Vegetable Stir-Fry',
      description: 'Healthy vegetable stir-fry with tofu.',
      price: 9.99,
      brand_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Beef Burger',
      description: 'Juicy beef burger with cheese and fries.',
      price: 8.49,
      brand_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
