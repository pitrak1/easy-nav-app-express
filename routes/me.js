import {getUserById} from '../queries.js'
import {getHashedPassword, getJwtToken} from '../utilities/auth.js'

const me = async (req, res) => {
	const userId = req.userId

	try {
		const user = await getUserById(userId)
		
		return res.status(200).json({user})
	} catch (err) {
		return res.status(500).json({
			message: `User not successfully fetched`,
			error: err.message
		})
	}
}

export default me;