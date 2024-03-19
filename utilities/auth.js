import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const maxTokenAge = 3 * 60 * 60 // 3 hours

export const getHashedPassword = (password) => {
	const sha256 = crypto.createHash('sha256')
	const hash = sha256.update(password).digest('base64')
	return hash
}

export const getJwtToken = (userId) => {
	return jwt.sign({data: userId}, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export const authenticateMiddleware = (req, res, next) => {
	const token = req.headers['authorization']

	if (token === null) {
		return res.sendStatus(401)
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
		if (err) {
			return res.sendStatus(403)
		}

		req.userId = userId
		next()
	})
}