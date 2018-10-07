const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: '12345678',
  port: 5432,
})

//thiết lập connect với PostgreSQL require('pg') là thư viện thôi
module.exports = pool;