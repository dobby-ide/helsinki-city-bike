//importing the express framework
const express = require('express');

require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const database = require('./controller/controller_db');
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
