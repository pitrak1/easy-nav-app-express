import express from 'express'
import pg from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'
import db from './server/db.js'
import {PORT} from './server/connect.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  
  .get('/db', db)

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))