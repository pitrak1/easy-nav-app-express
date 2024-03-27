import { getProfileBlogs } from '../db/queries.js'

const getProfile = async (req, res) => {
  const userId = req.userId

  try {
    const profile = await getProfileBlogs(userId)

    return res.status(200).json({ profile })
  } catch (err) {
    return res.status(500).json({
      message: 'Profile not successfully fetched',
      error: err.message
    })
  }
}

export default getProfile
