import express from 'express'
import pg from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'
import register from './routes/register.js'
import {PORT} from './routes/connect.js'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.post('/register', register)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))