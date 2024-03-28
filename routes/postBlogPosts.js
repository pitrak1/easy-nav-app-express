import { createBlogPost } from '../db/queries.js'

const postBlogPosts = async (req, res) => {
  const { name, contents } = req.body
  const { blogId } = req.params

  if (!name) {
    return res.status(400).json({
      message: 'Name is required'
    })
  }

  if (!contents) {
    return res.status(400).json({
      message: 'Contents is required'
    })
  }

  try {
    const post = createBlogPost(blogId, name, contents)

    return res.status(200).json({ post })
  } catch (err) {
    return res.status(500).json({
      message: 'Cannot create post',
      error: err.message
    })
  }
}

export default postBlogPosts
