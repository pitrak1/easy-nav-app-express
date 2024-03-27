import { createBlog } from '../db/queries.js'

const postBlogs = async (req, res) => {
  const userId = req.userId
  const { name } = req.body

  if (!name) {
    return res.status(400).json({
      message: 'Name is required'
    })
  }

  try {
    const blog = createBlog(name, userId)

    return res.status(200).json({ blog })
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot create blog',
      error: err.message
    })
  }
}

export default postBlogs
