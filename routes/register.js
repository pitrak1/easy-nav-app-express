import {isUserExistingByName, addUser} from '../queries.js'
import {getHashedPassword, getJwtToken} from '../utilities/auth.js'

const register = async (req, res) => {
	const {name, password, confirmPassword} = req.body

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

	if (password !== confirmPassword) {
		return res.status(400).json({
			message: `The password and confirm password do not match`
		});
	}

	try {
		const userExists = await isUserExistingByName(name)
		if (userExists) {
			return res.status(409).json({
				message: `The username ${name} is already taken`
			})
		}

		const hashedPassword = getHashedPassword(password)
		const user = await addUser(name, hashedPassword);
		const token = getJwtToken(user.id)
		
		return res.status(200).json({token})
	} catch (err) {
		return res.status(500).json({
			message: `User not successfully created`,
			error: err.message
		})
	}
}

export default register;