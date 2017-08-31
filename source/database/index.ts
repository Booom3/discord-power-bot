import { Pool, QueryResult } from 'pg';

const pool = new Pool();

export function query(text: string, params: string[]): Promise<QueryResult> {
    return pool.query(text, params);
}