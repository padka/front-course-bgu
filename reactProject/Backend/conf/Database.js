const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
});

async function executeQuery(query, params = []) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(query, params);
        return rows;
    } catch (error) {
        console.error(`Error executing query: ${error.message}`);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = { executeQuery };
