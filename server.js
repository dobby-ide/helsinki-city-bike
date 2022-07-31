//importing the express framework
const express = require('express');

require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const database = require('./controller/controller_db');
app.use(cors());
app.use(express.static('frontend/build'));
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
app.route('/sortedpageallparams').get(async (req, res) => {
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const monthtable = req.query.month;
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const sort = req.query.sort;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const station = req.query.station;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;

  try {
    const result = await database.findData5Params(
      monthtable,
      sort,
      start,
      end,
      distance1,
      distance2,
      station,
      duration1,
      duration2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//sort day duration station
app.route('/sortdaydurationstation').get(async (req, res) => {
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const monthtable = req.query.month;
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const sort = req.query.sort;
  const station = req.query.station;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;

  try {
    const result = await database.findsortdaydurationstation(
      monthtable,
      sort,
      start,
      end,
      station,
      duration1,
      duration2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//sortdaydistanceduration
app.route('/sortdaydistanceduration').get(async (req, res) => {
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const monthtable = req.query.month;
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const sort = req.query.sort;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;

  try {
    const result = await database.findsortdaydistanceduration(
      monthtable,
      sort,
      start,
      end,
      distance1,
      distance2,
      duration1,
      duration2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortdaydistancestation
app.route('/sortdaydistancestation').get(async (req, res) => {
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const monthtable = req.query.month;
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const sort = req.query.sort;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const station = req.query.station;

  try {
    const result = await database.findsortdaydistancestation(
      monthtable,
      sort,
      start,
      end,
      distance1,
      distance2,
      station
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortdurationdistancestation
app.route('/sortdurationdistancestation').get(async (req, res) => {
  const monthtable = req.query.month;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  const sort = req.query.sort;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const station = req.query.station;

  try {
    const result = await database.findsortdurationdistancestation(
      monthtable,
      sort,

      distance1,
      distance2,
      duration1,
      duration2,
      station
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortdayduration
app.route('/sortdayduration').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  const sort = req.query.sort;

  try {
    const result = await database.findsortdayduration(
      monthtable,
      sort,
      start,
      end,
      duration1,
      duration2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//sortdaystation
app.route('/sortdaystation').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const station = req.query.station;
  const sort = req.query.sort;

  try {
    const result = await database.findsortdaystation(
      monthtable,
      sort,
      start,
      end,
      station
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortdaydistance

app.route('/sortdaydistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const sort = req.query.sort;

  try {
    const result = await database.findsortdaydistance(
      monthtable,
      sort,
      start,
      end,
      distance1,
      distance2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortdurationstation

app.route('/sortdurationstation').get(async (req, res) => {
  const monthtable = req.query.month;
  const sort = req.query.sort;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  const station = req.query.station;
  try {
    const result = await database.findsortdurationstation(
      monthtable,
      sort,
      duration1,
      duration2,
      station
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortdurationdistance
app.route('/sortdurationdistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const sort = req.query.sort;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  try {
    const result = await database.findsortdurationdistance(
      monthtable,
      sort,
      duration1,
      duration2,
      distance1,
      distance2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortstationdistance

app.route('/sortstationdistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const sort = req.query.sort;
  const station = req.query.station;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  try {
    const result = await database.findsortstationdistance(
      monthtable,
      sort,
      station,
      distance1,
      distance2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//daydurationstation

app.route('/daydurationstation').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const station = req.query.station;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  try {
    const result = await database.finddaydurationstation(
      monthtable,
      start,
      end,
      duration1,
      duration2,
      station
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//daydurationdistance
app.route('/daydurationdistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  try {
    const result = await database.finddaydurationdistance(
      monthtable,
      start,
      end,
      duration1,
      duration2,
      distance1,
      distance2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//daystationdistance
app.route('/daystationdistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const station = req.query.station;
  try {
    const result = await database.finddaystationdistance(
      monthtable,
      start,
      end,
      station,
      distance1,
      distance2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//durationstationdistance

app.route('/durationstationdistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const station = req.query.station;
  try {
    const result = await database.finddurationstationdistance(
      monthtable,
      duration1,
      duration2,
      station,
      distance1,
      distance2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortday
app.route('/sortday').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const sort = req.query.sort;
  try {
    const result = await database.findsortday(monthtable, start, end, sort);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortduration
app.route('/sortduration').get(async (req, res) => {
  const monthtable = req.query.month;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  const sort = req.query.sort;
  try {
    const result = await database.findsortduration(
      monthtable,
      duration1,
      duration2,
      sort
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortstation
app.route('/sortstation').get(async (req, res) => {
  const monthtable = req.query.month;
  const station = req.query.station;
  const sort = req.query.sort;
  try {
    const result = await database.findsortstation(monthtable, station, sort);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//sortdistance
app.route('/sortdistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const sort = req.query.sort;
  try {
    const result = await database.findsortdistance(
      monthtable,
      distance1,
      distance2,
      sort
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//dayduration
app.route('/dayduration').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;

  try {
    const result = await database.finddayduration(
      monthtable,
      start,
      end,
      duration1,
      duration2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//daystation
app.route('/daystation').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const station = req.query.station;

  try {
    const result = await database.finddaystation(
      monthtable,
      start,
      end,
      station
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//daydistance
app.route('/daydistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;

  try {
    const result = await database.finddaydistance(
      monthtable,
      start,
      end,
      distance1,
      distance2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//durationstation
app.route('/durationstation').get(async (req, res) => {
  const monthtable = req.query.month;
  const station = req.query.station;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  try {
    const result = await database.finddurationstation(
      monthtable,
      station,
      duration1,
      duration2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//durationdistance

app.route('/durationdistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  try {
    const result = await database.finddurationdistance(
      monthtable,
      distance1,
      distance2,
      duration1,
      duration2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//stationdistance
app.route('/stationdistance').get(async (req, res) => {
  const monthtable = req.query.month;
  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  const station = req.query.station;
  try {
    const result = await database.findstationdistance(
      monthtable,
      distance1,
      distance2,
      station
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//ONE CASE
//onlyday
app.route('/onlyday').get(async (req, res) => {
  const monthtable = req.query.month;
  const month =
    req.query.month === 'may' ? '05' : req.query.month === 'june' ? '06' : '07';
  const start = `2021-${month}-${req.query.start} 00:00:00`;
  const end = `2021-${month}-${req.query.end} 00:00:00`;
  try {
    const result = await database.findonlyday(monthtable, start, end);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//onlyduration
app.route('/onlyduration').get(async (req, res) => {
  const monthtable = req.query.month;
  const duration1 = req.query.duration1;
  const duration2 = req.query.duration2;
  try {
    const result = await database.findonlyduration(
      monthtable,
      duration1,
      duration2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//only station
app.route('/onlystation').get(async (req, res) => {
  const monthtable = req.query.month;

  const station = req.query.station;
  try {
    const result = await database.findonlystation(monthtable, station);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//onlydistance
app.route('/onlydistance').get(async (req, res) => {
  const monthtable = req.query.month;

  const distance1 = req.query.distance1;
  const distance2 = req.query.distance2;
  try {
    const result = await database.findonlydistance(
      monthtable,
      distance1,
      distance2
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//onlysort
app.route('/onlysort').get(async (req, res) => {
  const monthtable = req.query.month;

  const sort = req.query.sort;
  try {
    const result = await database.findonlysort(monthtable, sort);
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

//single station informations
app.route('/infostation').get(async (req, res) => {
  const fid=req.query.fid;
  try {
    const result = await database.findInfoStation(fid);
    console.log(result.length);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});

//further info station
app.route('/furtherinfostation').get(async (req, res) => {
  const id = req.query.id;
  try {
    const result = await database.findFurtherInfoStation(id);
    console.log(result.length);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//TOP 5 stations
app.route('/top5stations').get(async (req, res) => {
  const id = req.query.id;
  const month = req.query.month;
  try {
    const result = await database.findtop5stations(id,month);
    console.log(result.length);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
