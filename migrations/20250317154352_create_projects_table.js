/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('portfolios', (table) => {
    table.increments('id').primary();                       
    table.integer('user_id').unsigned().notNullable();      
    table.string('repo_name', 255).notNullable();
    table.string('project_title', 255).notNullable();
    table.text('description');
    table.string('languages', 255);                         
    table.timestamps(true, true);                           

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('portfolios');
}
