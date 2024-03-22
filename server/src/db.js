const pgp = require('pg-promise')();

const dbConfig = {
    host: 'localhost',
    port: 6000,
    database: 'notes_app',
    user: "postgres",
    password: "password"
}

const db = pgp(dbConfig);

module.exports = db;
