const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'taolacuong123',
  port: 5432,
})

//thiết lập connect với PostgreSQL require('pg') là thư viện thôi
module.exports = pool;