import pool from './connect.js'

const db = async (req, res) => {
	try {
	  const client = await pool.connect();
	  const result = await client.query('SELECT * FROM test_table');
	  const results = { 'results': (result) ? result.rows : null};
	  res.render('pages/db', results );
	  client.release();
	} catch (err) {
	  console.error(err);
	  res.send("Error " + err);
	}
}

export default db;