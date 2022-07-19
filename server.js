//importing the express framework
const express = require('express');

require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const database = require('./controller/controller_db');
app.use(cors());
app.use(express.json());
//connecting
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  database.connecting((err) => {
    if (err) {
      console.log('problem connecting');
    } else {
      console.log('mySQL connection succesful');
    }
  });
});
//number of rows (use for pagination and better performance) in a SINGLE MONTH ONLY
app.route('/everytoursofthemonth').get(async (req, res) => {
  const month = req.query.month;
  console.log(month);
  try {
    //result will store the informations retrieved from the sql query (SELECT COUNT(id) as newid FROM may)
    const result = await database.totalsofonlymonth(month);

    //and send the response and the result to the client
    res.status(200).json(result[0].newid);
  } catch (err) {
    res.status(404).end();
  }
});
//number of rows in case of filtered search
app.route('/filteredtours').get(async (req, res) => {
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const monthtable = req.query.month;

  const departure = `2021-${month}-${req.query.start} 00:00:00`;
  const returning = `2021-${month}-${req.query.end} 00:00:00`;
  try {
    //result will store the informations retrieved from the sql query (SELECT COUNT(id) as newid FROM may)
    const result = await database.totalsofmonth(
      monthtable,
      departure,
      returning
    );
    console.log(result[0].newid);
    //and send the response and the result to the client
    res.status(200).json(result[0].newid);
  } catch (err) {
    res.status(404).end();
  }
});

//find all
app.route('/alltours').get(async (req, res) => {
  try {
    //result will store the informations retrieved from the sql query (SELECT * FROM may)
    const result = await database.findAll();
    console.log(result.length);
    //and send the response and the result to the client
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//implementing pagination

app.route('/page').get(async (req, res) => {
  console.log('inside page route');
  const month = req.query.month;
  const page = req.query.page;
  console.log(page);
  try {
    const result = await database.findSinglepageOfData(page, month);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//sorting by distance or duration and days
app.route('/sortedpagewithdays').get(async (req, res) => {
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const monthtable = req.query.month;
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const page = req.query.page;
  const sort = req.query.sort;
  console.log(page,month,start,end,sort);
  try {
    const result = await database.findSortedSinglepageOfData(
      monthtable,
      page,
      sort,
      start,
      end
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//1000 results: for SORT  
app.route('/sortedpage').get(async (req, res) => {
 
  const monthtable = req.query.month;
  const page = req.query.page;
  const sort = req.query.sort;
  console.log(page);
  try {
   
    const result = await database.sortbyandmonth(
      monthtable,
      page,
      sort
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

///////////////////////////STATIONS STATIONS STATIONS STATIONS
//retrieves all stations names
app.route('/allstations').get(async (req, res) => {
  try {
    //result will store the informations retrieved from the sql query (SELECT * FROM stations)
    const result = await database.findAllStations();
    console.log(result.length);
    //and send the response and the result to the client
    res.status(200).json(result);
  } catch (err) {
    res.status(404).end();
  }
});
