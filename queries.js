import pool from './db.js'

export const isUserExistingByName = async (name) => {
	const result = await pool.query(`
		SELECT *
		FROM users 
		WHERE name = '${name}';
	`)
	return result.rowCount > 0;
}

export const addUser = async (name, passwordHash) => {
	const result = await pool.query(`
		INSERT INTO users (name, password_hash) 
		VALUES ('${name}', '${passwordHash}')
		RETURNING *;
	`)
	return result.rows[0]
}