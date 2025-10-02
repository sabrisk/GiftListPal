// lib/db.ts
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set in environment variables");
}

// Connection pool (singleton to avoid creating new pool per request)
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) {
	const res = await pool.query(text, params);
	return res;
}
