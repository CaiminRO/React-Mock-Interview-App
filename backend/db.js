const knex = require('knex');

const keyfile = require('./knexfile');

const db = knex(keyfile.development);

module.exports = db;