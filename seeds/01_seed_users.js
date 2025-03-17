/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('users').del();
  
  await knex('users').insert([
    { id: 1, username: 'johndoe', email: 'john@example.com', password: 'password123', github_username: 'johndoe' },
    { id: 2, username: 'janedoe', email: 'jane@example.com', password: 'password123', github_username: 'janedoe' },
  ]);
}