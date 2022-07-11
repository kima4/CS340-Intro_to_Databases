var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : [redacted],
  password        : [redacted],
  database        : [redacted]'
});
module.exports.pool = pool;
