import express from 'express'
import pg from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'
import index from './server/index.js'
import db from './server/db.js'
import {PORT} from './server/connect.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  
  .get('/', index)
  .get('/db', db)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))