exports.up = function(knex) {
    return knex.schema
    .createTable('posts', function (table) {
       table.increments('id').unsigned();
       table.uuid('uuid').unique().notNullable();
       table.string('title', 255).notNullable();
       table.string('slug', 255).notNullable();
       table.text('content').nullable();
       table.timestamps();
       table.timestamp('deleted_at').nullable();
    });
};

exports.down = function(knex) {
  //
};
