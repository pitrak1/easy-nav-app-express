import pool from './connect.js'
import {getHashedPassword} from '../passwordHash.js'

const register = async (req, res) => {
	const {name, password, confirmPassword} = req.body

	if (password === confirmPassword) {
		const client = await pool.connect();

		const result = await client.query(`SELECT * FROM users WHERE name = '${name}';`)
		if (result.rowCount) {
			return res.status(409).send(`The username ${name} is already taken`)
		}

		const hashedPassword = getHashedPassword(password)

		await client.query(`INSERT INTO users (name, password_hash) VALUES ('${name}', '${hashedPassword}')`)
		return res.status(200)
	} else {
		return res.status(401).send(`The password and confirm password do not match`)
	}

}

export default register;