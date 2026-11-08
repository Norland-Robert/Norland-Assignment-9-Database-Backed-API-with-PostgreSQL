const { Pool } = require('pg')

//Creates the connection pool to PostgreSQL
const pool = new Pool ({
    user: process.env.PGUSER || 'postgres'
})