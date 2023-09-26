import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('brands').del();

  // Inserts seed entries
  await knex('brands').insert([
    {
      name: 'Jollof & Co.',
      description: 'Authentic African cuisine.',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Pizza Haven',
      description: 'Delicious pizza and Italian dishes.',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Burger Bites',
      description: 'The best burgers in town.',
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Add more brand entries as needed
  ]);
}
