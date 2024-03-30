import { getBlogPostById } from '../db/queries.js'

const getBlogPost = async (req, res) => {
  const { blogId, postId } = req.params

  try {
    const post = await getBlogPostById(blogId, postId)

    return res.status(200).json({ post })
  } catch (err) {
    return res.status(500).json({
      message: 'Profile not successfully fetched',
      error: err.message
    })
  }
}

export default getBlogPost
