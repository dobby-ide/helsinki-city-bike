# Helsinki-city-bike: a Full Stack Application
## To see the working app deployed to Heroku, <a href="https://helsinki-city-bike.herokuapp.com/">click here </a>
## Context:
### to retrieve informations from 4 different datasets, owned by Helsinki city bike company(HSL®), imported to a sql database and show informations to the final user. Three datasets are for the journeys (time of departure, departure station, return station, distance etc.) and divided by month (May, June, July) and the last dataset represents the stations informations (station name, address coordinates etc.)
***
## Beginning of the project:
## Journeys:
### My first thought after importing the 3 huge journeys datasets into sql database (online, hosted by the University of Tampere), was to try to find a solution not to query all of the data at once but divide it into chuncks if no filter was to be applied to the query.
### So the program can only query a single month of data: so each query is month constrained (I have put each dataset into separate tables named may, june, july) and choosing a month is mandatory. If a user wants to query without any filter he will have the whole result from the month chosen however due to the big amount of data the displayed results are divided into single pages of 10000 results each and each page of 10000 results is accessible at the bottom of the page in form of page numbers.
### When any of the filter is used the result will be shown with a limit of 50000 rows and not in chuncks so the filter is effective. However this is not a big limitations, due to the amount of filters and sortings available a user could easily finds the data accessible.
### Each column header gives further ability to sort results according to the column name property in ascending or descending order (up and down arrow).

## Stations view

### Stations view shows all the available stations at once with the posibility to search for the right station. When a user clicks the station it will show a map with the station, and further infos about that station: total number of journeys departing from the station and number of journeys returning to the station.
### Then the user has also the possibility to seek further numbers facts about the station: average length of journeys and popular station connections according to the month chosen.
***
***

## Possible improvements after release 1.0
### Possibility to add an Admin view where user can post new stations or modifying existing stations, a complete place where to gather control over the data on each station and adding new journeys as well.

***
***
## Used Technologies:
### This application is using Node.js (Javascript) for the backend, SQL programming and React.js for the frontend part.
### Please refer to the package.json in the main folder and in frontend folder to see the dependency installed. For the frontend, I have used SASS for styling and BEM alike methods. 
***
# how to install:  
### To run the program in your own computer you need to create some sql table and import there the datasets (not provided here), clone the project to own computer, install the dependencies both from main folder and frontend folder. Server must run on port 3000.


<pre><code>
//you need to overwrite the values in ./controller/controller_db.js
//var dbConnection needs to have your authentication to your database

git clone https://github.com/dobby-ide/helsinki-city-bike.git
//in root folder
npm install 
cd frontend
//inside frontend folder
npm install
//start inside root directory and also inside frontend directory
npm start
//or nodemon server.js
//or node server.js
cd frontend
npm start
</code></pre>
***
### SQL code to create stations table
<pre>
<code>
CREATE TABLE stations(  
    FID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ID INT,
    name VARCHAR(60),
    address VARCHAR(80),
    city VARCHAR(40),
    capacity INT,
    x_coord FLOAT(10,6),
    y_coord FLOAT(10,6)
);

</code>
</pre>
### SQL code to create may, june and july tables (change in first line table name accordingly)
<pre>
<code>
CREATE TABLE `may` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departure` datetime DEFAULT NULL,
  `returning` datetime DEFAULT NULL,
  `departure_station_id` varchar(4) DEFAULT NULL,
  `departure_station` varchar(80) DEFAULT NULL,
  `return_station_id` varchar(4) DEFAULT NULL,
  `return_station` varchar(80) DEFAULT NULL,
  `covered_distance` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
</code>
</pre>
## known bugs
#### <code>position:sticky </code> has not been supported in IE previous versions than Microsoft Edge

#### in Journeys view filter needs to include an end day when a start day is selected, a max distance when a minimum distance is selected, a maximum time, when a minimum duration is selected to obtain the query to give the wished results. logic to be add to tell the user to compile end day if start day was selected etc.

