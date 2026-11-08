const { Pool } = require('pg')

//Creates the connection pool to PostgreSQL
const pool = new Pool ({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'Assignment_9_Database',
    password: process.env.PGPASSWORD || 'CDFy819@421234567@',
    port: Number(process.env.PGPORT || 5442)
})


module.exports = pool