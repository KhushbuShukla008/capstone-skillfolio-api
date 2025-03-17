/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('github_username', 255);
  });

  await knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('project_name', 255).notNullable();
    table.string('description', 255);
    table.string('tech_stack', 255);
    table.string('github_link', 255);
  });

  await knex.schema.createTable('resumes', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.json('resume_data').notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('resumes');
  await knex.schema.dropTableIfExists('projects');
  await knex.schema.dropTableIfExists('users');
}