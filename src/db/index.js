import { Pool } from 'pg';

let pool;

export async function createConnectionPool() {
    if (pool) {
        try { await pool.end(); } catch (e) { }
    }

    pool = new Pool();

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err);
        createConnectionPool();
    });
}

export async function getConnection() {
    if (!pool) {
        await createConnectionPool();
    }
    return pool;
}
