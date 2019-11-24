exports.up = function(knex) {
    return knex.schema
    .createTable('posts', function (table) {
       table.increments('id');
       table.string('title', 255).notNullable();
       table.text('content');
       table.timestamps();
    });
};

exports.down = function(knex) {
  //
};
