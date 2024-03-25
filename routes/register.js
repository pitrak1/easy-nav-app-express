import {isUserExistingByName, addUser} from '../queries.js'
import {getHashedPassword, getJwtToken} from '../utilities/auth.js'

const register = async (req, res) => {
	const {name, password, confirmPassword} = req.body

	if (!name) {
		return res.status(400).json({
			message: `Name is required`
		});
	}

	const nameRegex = new RegExp('/^([a-zA-Z0-9_-]){8, 18}$/')
	if (!nameRegex.test(name)) {
		return res.status(400).json({
			message: `Name must be between 8 and 18 alphanumeric characters`
		});
	}

	if (!password) {
		return res.status(400).json({
			message: `Password is required`
		});
	}

	const passwordRegex = new RegExp('/^.{8, 18}$/')
	if (!passwordRegex.test(name)) {
		return res.status(400).json({
			message: `Password must be between 8 and 18 characters`
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