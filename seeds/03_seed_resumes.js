/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('resumes').del();
  
  await knex('resumes').insert([
    { id: 1, user_id: 1, resume_data: JSON.stringify({ experience: '5 years', skills: ['JavaScript', 'Node.js'] }) },
    { id: 2, user_id: 2, resume_data: JSON.stringify({ experience: '3 years', skills: ['Python', 'Django'] }) },
  ]);
}