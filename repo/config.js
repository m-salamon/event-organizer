require('dotenv').config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST_DEVELOPMENT, //'localhost',
        user: process.env.DB_USER_DEVELOPMENT, //'user',
        password: process.env.DB_PASSWORD_DEVELOPMENT,// 'password',
        database: process.env.DB_NAME_DEVELOPMENT // 'simcha-organizer'
    }
});

module.exports = knex;