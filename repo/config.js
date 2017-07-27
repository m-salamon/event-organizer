require('dotenv').config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST_PRODUCTION, //'localhost',
        user: process.env.DB_USER_PRODUCTION, //'user',
        password: process.env.DB_PASSWORD_PRODUCTION,// 'password',
        database: process.env.DB_NAME_PRODUCTION // 'simcha-organizer'
    }
});

module.exports = knex;