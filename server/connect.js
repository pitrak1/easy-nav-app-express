import pg from 'pg'

const {Pool} = pg
const pool = (() => {
  if (process.env.NODE_ENV !== 'production') {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: false
    })
  } else {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false}
    })
  }
})()

export const PORT = process.env.PORT || 5001

export default pool