const mysql = require('mysql');
var dbConnection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  multipleStatements: true,
});
module.exports = {
  connecting: () => {
    dbConnection.getConnection((err) => {
      if (err) {
        console.log(err);
        console.log('problem connecting to database');
      } else {
        console.log('connecting to database successfully');
      }
    });
  },
  //total numbers of row in may table
  totalsofmonth: (month) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT COUNT(id) as newid FROM ${month}`,
        (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(console.log(err));
          }
        }
      );
    }
    return new Promise(myProm);
  },

  //find all
  findAll: () => {
    function myProm(resolve, reject) {
      dbConnection.query('SELECT * FROM may LIMIT 100', (err, results) => {
        if (results) {
          resolve(results);
        } else {
          reject(console.log(err));
        }
      });
    }
    return new Promise(myProm);
  },

  //load pages of data(pagination)
  findSinglepageOfData: (page, month) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${month} where id>${page}*1000 AND id < (${page} + 1)*1000`,
        (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(console.log('here'));
          }
        }
      );
    }
    return new Promise(myProm);
  },
};