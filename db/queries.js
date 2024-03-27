import pool from './db.js'

export const isUserExistingByName = async (name) => {
	const result = await pool.query(`
		SELECT *
		FROM users 
		WHERE name = '${name}';
	`)
	return result.rowCount > 0;
}

export const getUserByNameAndPasswordHash = async (name, passwordHash) => {
	const result = await pool.query(`
		SELECT id, name
		FROM users
		WHERE name = '${name}' AND password_hash = '${passwordHash}';
	`)

	return result.rows[0]
}

export const addUser = async (name, passwordHash) => {
	const result = await pool.query(`
		INSERT INTO users (name, password_hash) 
		VALUES ('${name}', '${passwordHash}')
		RETURNING *;
	`)
	return result.rows[0]
}

export const getUserById = async (id) => {
	const result = await pool.query(`
		SELECT id, name 
		FROM users
		WHERE id = ${id};
	`)
	return result.rows[0]
}

export const getProfileBlogs = async (id) => {
	const result = await pool.query(`
		SELECT blogs.id, blogs.name, blogs.user_id, COUNT(posts.id)
		FROM blogs
		LEFT JOIN posts ON blogs.id = posts.blog_id
		WHERE user_id = ${id}
		GROUP BY blogs.id;
	`)
	return result.rows
}

export const createBlog = async (name, userId) => {
	const result = await pool.query(`
		INSERT INTO blogs (name, user_id)
		VALUES ('${name}', ${userId})
		RETURNING *;
	`)
	return result.rows[0]
}
