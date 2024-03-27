import {getUserByNameAndPasswordHash} from '../db/queries.js'
import {getHashedPassword, getJwtToken} from '../utilities/auth.js'

const postLogin = async (req, res) => {
	const {name, password} = req.body

	if (!name) {
		return res.status(400).json({
			message: `Name is required`
		});
	}

	if (!password) {
		return res.status(400).json({
			message: `Password is required`
		});
	}


	try {
		const hashedPassword = getHashedPassword(password)
		const user = await getUserByNameAndPasswordHash(name, hashedPassword);
		const token = getJwtToken(user.id)
		
		return res.status(200).json({token, user})
	} catch (err) {
		return res.status(500).json({
			message: `Cannot login user`,
			error: err.message
		})
	}
}

export default postLogin;