export async function up(knex) {
    await knex.schema.table('users', (table) => {
        table.integer('github_user_id').nullable();
    });
    }

    export async function down(knex) {
    await knex.schema.table('users', (table) => {
        table.dropColumn('github_user_id'); 
    });
    }
