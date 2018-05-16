import * as pg from 'pg';

const pool = new pg.Pool();

export function query(text: string, params: string[]): Promise<pg.QueryResult> {
    return pool.query(text, params)
    .catch((err) => {
        if (err.code === "ECONNREFUSED") {
            console.error("DB connection refused. Check your DB configuration.");
            return null;
        }
        else {
            throw(err);
        }
    });
}