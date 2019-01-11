const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_shop',
  password: '121212'
});


module.exports = pool.promise();