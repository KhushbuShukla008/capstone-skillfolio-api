/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('projects').del();

  await knex('projects').insert([
    { id: 1, user_id: 1, project_name: 'Project 1', description: 'Description of Project 1', tech_stack: 'Node.js, React', github_link: 'https://github.com/johndoe/project1' },
    { id: 2, user_id: 2, project_name: 'Project 2', description: 'Description of Project 2', tech_stack: 'Python, Django', github_link: 'https://github.com/janedoe/project2' },
  ]);
}