const { Pool } = require('pg')

//Creates the connection pool to PostgreSQL
const pool = new Pool ({
    user: process.env.PGUSER || 'postgres',
    host: process.enc.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'Assignment_9_Database',
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT || 5432)
})


module.exports = Pool