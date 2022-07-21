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
  //FILTERING 5 PARAMETERS
  findData5Params: (
    monthtable,
    sort,
    start,
    end,
    distance1,
    distance2,
    station,
    duration1,
    duration2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND covered_distance>${distance1} and covered_distance<${distance2} AND departure_station_id = ${station} AND duration>${duration1} and duration<${duration2} ORDER BY ${sort} LIMIT 50000`,
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

  //FILTER SORT DAY DURATION STATION
  findsortdaydurationstation: (
    monthtable,
    sort,
    start,
    end,
    station,
    duration1,
    duration2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND departure_station_id = ${station} AND duration>${duration1} and duration<${duration2} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdaydistanceduration
  findsortdaydistanceduration: (
    monthtable,
    sort,
    start,
    end,
    distance1,
    distance2,
    duration1,
    duration2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND duration>${duration1} and duration<${duration2} AND covered_distance>${distance1} AND covered_distance<${distance2} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdaydistancestation
  findsortdaydistancestation: (
    monthtable,
    sort,
    start,
    end,
    distance1,
    distance2,
    station
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND departure_station_id=${station} AND covered_distance>${distance1} AND covered_distance<${distance2} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdurationdistancestation

  findsortdurationdistancestation: (
    monthtable,
    sort,
    duration1,
    duration2,
    distance1,
    distance2,
    station
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where duration>${duration1} AND duration<${duration2} AND departure_station_id=${station} AND covered_distance>${distance1} AND covered_distance<${distance2} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdayduration

  findsortdayduration: (monthtable, sort, start, end, duration1, duration2) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND duration>${duration1} AND duration<${duration2} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdaystation
  findsortdaystation: (monthtable, sort, start, end, station) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND departure_station_id=${station} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdaydistance

  findsortdaydistance: (monthtable, sort, start, end, distance1, distance2) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND covered_distance=${distance1} AND covered_distance=${distance2} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdurationstation
  findsortdurationstation: (
    monthtable,
    sort,
    duration1,
    duration2,
    station
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where duration>${duration1} AND duration < ${duration2} AND departure_station_id =${station} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdurationdistance
  findsortdurationdistance: (
    monthtable,
    sort,
    duration1,
    duration2,
    distance1,
    distance2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where duration>${duration1} AND duration < ${duration2} AND covered_distance>${distance1} AND covered_distance<${distance2}  ORDER BY ${sort} LIMIT 50000`,
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
  //sortstationdistance
  findsortstationdistance: (
    monthtable,
    sort,
    station,
    distance1,
    distance2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure_station_id=${station} AND covered_distance>${distance1} AND covered_distance<${distance2}  ORDER BY ${sort} LIMIT 50000`,
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

  //daydurationstation

  finddaydurationstation: (
    monthtable,
    start,
    end,
    duration1,
    duration2,
    station
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure_station_id=${station} AND duration>${duration1} AND duration<${duration2}  AND departure>"${start}" AND departure<"${end}" LIMIT 50000`,
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

  //daydurationdistance
  finddaydurationdistance: (
    monthtable,
    start,
    end,
    duration1,
    duration2,
    distance1,
    distance2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where covered_distance<${distance1} AND covered_distance>${distance2} AND duration>${duration1} AND duration<${duration2}  AND departure>"${start}" AND departure<"${end}"  LIMIT 50000`,
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

  //daystationdistance
  finddaystationdistance: (
    monthtable,
    start,
    end,
    station,
    distance1,
    distance2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where covered_distance>${distance1} AND covered_distance<${distance2} AND departure_station_id=${station} AND departure>"${start}" AND departure<"${end}"  LIMIT 50000`,
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

  //durationstationdistance
  finddurationstationdistance: (
    monthtable,
    duration1,
    duration2,
    station,
    distance1,
    distance2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where covered_distance<${distance1} AND covered_distance>${distance2} AND departure_station_id=${station} AND duration>${duration1} AND duration<${duration2}  LIMIT 50000`,
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

  //sortday
  findsortday: (monthtable, start, end, sort) => {
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

  findsortduration: (monthtable, duration1, duration2, sort) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where duration<${duration1} AND duration>${duration2} ORDER BY ${sort} LIMIT 50000`,
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

  //sortstation
  findsortstation: (monthtable, station, sort) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure_station_id=${station} ORDER BY ${sort} LIMIT 50000`,
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

  //sortdistance
  findsortdistance: (monthtable, distance1, distance2, sort) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where covered_distance>${distance1} AND covered_distance<${distance2} ORDER BY ${sort} LIMIT 50000`,
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

  //dayduration
  finddayduration: (monthtable, start, end, duration1, duration2) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND duration>${duration1} AND duration<${duration2} LIMIT 50000`,
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

  //daystation
  finddaystation: (monthtable, start, end, station) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND departure_station_id=${station} LIMIT 50000`,
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

  //daydistance
  finddaydistance: (monthtable, start, end, distance1, distance2) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}" AND covered_distance>${distance1} AND covered_distance<${distance2} LIMIT 50000`,
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
  //durationstation
  finddurationstation: (monthtable, station, duration1, duration2) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where duration>${duration1} AND duration<${duration2} AND departure_station_id=${station} LIMIT 50000`,
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

  //durationdistance
  finddurationdistance: (
    monthtable,
    distance1,
    distance2,
    duration1,
    duration2
  ) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where duration>${duration1} AND duration<${duration2} AND covered_distance>${distance1} AND covered_distance<${distance2} LIMIT 50000`,
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

  //stationdistance

  findstationdistance: (monthtable, distance1, distance2, station) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where covered_distance>${distance1} AND covered_distance<${distance2} AND departure_station_id=${station} LIMIT 50000`,
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

  //onlyday
  findonlyday: (monthtable, start, end) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure>"${start}" AND departure<"${end}"  LIMIT 50000`,
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

  //onlyduration
  findonlyduration: (monthtable, duration1, duration2) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where duration>${duration1} AND duration<${duration2} LIMIT 50000`,
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

  //onlystation
  findonlystation: (monthtable, station) => {
    console.log(station);
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where departure_station_id=${station} LIMIT 50000`,
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

  //onlydistance

  findonlydistance: (monthtable, distance1, distance2) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} where covered_distance>${distance1} AND covered_distance<${distance2} LIMIT 50000`,
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

  //onlysort
  findonlysort: (monthtable, sort) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT * FROM ${monthtable} ORDER BY ${sort} LIMIT 50000`,
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
        'SELECT name,address,ID,FID,x_coord,y_coord FROM stations',
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