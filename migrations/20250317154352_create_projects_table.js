/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();      
      table.string('repo_name', 255).notNullable();
      table.string('project_title', 255).notNullable();
      table.text('description');
      table.string('tech_stack', 255);
      table.string('github_link', 255);                         
      table.timestamps(true, true);                           


    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
}
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTableIfExists('projects');
  }