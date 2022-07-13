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
//number of rows (use for pagination and better performance)
app.route('/totaltours').get(async (req, res) => {
  const month = req.query.month;
  try {
    //result will store the informations retrieved from the sql query (SELECT COUNT(id) as newid FROM may)
    const result = await database.totalsofmonth(month);
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
