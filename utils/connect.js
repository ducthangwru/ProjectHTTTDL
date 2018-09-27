const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: '12345678',
  port: 5432,
})

module.exports = pool;