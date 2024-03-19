import express from 'express'
import register from './routes/register.js'
import {authenticateMiddleware} from './utilities/auth.js'

const PORT = process.env.PORT || 5001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.post('/register', register)
app.post('/register/auth', authenticateMiddleware, register)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))