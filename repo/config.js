const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'simcha-organizer'
    }
});

module.exports = knex;