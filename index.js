import express from 'express'
import postRegister from './routes/postRegister.js'
import postLogin from './routes/postLogin.js'
import getProfile from './routes/getProfile.js'
import postBlogs from './routes/postBlogs.js'
import getBlog from './routes/getBlog.js'
import postBlogPosts from './routes/postBlogPosts.js'
import { authenticateMiddleware } from './utilities/auth.js'

const PORT = process.env.PORT || 5001

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers')
  next()
})

app.post('/register', postRegister)
app.post('/login', postLogin)
app.get('/profile', authenticateMiddleware, getProfile)
app.post('/blogs', authenticateMiddleware, postBlogs)
app.get('/blogs/:blogId', authenticateMiddleware, getBlog)
app.post('/blogs/:blogId/posts', authenticateMiddleware, postBlogPosts)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
