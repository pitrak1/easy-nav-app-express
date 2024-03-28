import { getPostsByBlogId } from '../db/queries.js'

const getBlog = async (req, res) => {
  const { blogId } = req.params

  try {
    const posts = await getPostsByBlogId(blogId)

    posts.forEach(post => {
      post.wordCount = post.contents.trim().split(/\s+/).length
    })

    return res.status(200).json({ posts })
  } catch (err) {
    return res.status(500).json({
      message: 'Posts not successfully fetched',
      error: err.message
    })
  }
}

export default getBlog
