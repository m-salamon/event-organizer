
exports.up = function (knex, Promise) {
    return knex.schema.createTable('participents-history', table => {
        table.increments('id').primary();
        table.integer('participentId');
        table.integer('simchaId');
        table.integer('amount');
        table.string('date');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('participents-history');
};
