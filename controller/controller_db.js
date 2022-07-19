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
  totalsofmonth: (monthtable, departure, returning) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT COUNT(id) as newid FROM ${monthtable} WHERE departure>"${departure}" AND departure <"${returning}"`,
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

  //COUNT of ONLY MONTH
  totalsofonlymonth: (monthtable) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT COUNT(id) as newid FROM ${monthtable}`,
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
  //1000 results,only sort and month parameters
  sortbyandmonth: (monthtable, page, sort) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where id>${page}*1000 AND id < (${page} + 1)*1000 ORDER BY ${sort}`,
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
  //sorting by distance or duration
  findSortedSinglepageOfData: (monthtable, page, sort, start, end) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" ORDER BY ${sort} LIMIT 50000`,
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
  //retrieves all stations name
  findAllStations: () => {
    function myProm(resolve, reject) {
      dbConnection.query(
        'SELECT name,address,FID,x_coord,y_coord FROM stations',
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
};