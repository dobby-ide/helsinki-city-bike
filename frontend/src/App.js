import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InitialFetch from './components/InitialFetch';
import Switch from './components/Switch';
import SortChoice from './components/SortChoice';
import StationsData from './components/StationsData';

import Map from './Map';
function App() {
  const [xcoord, setXcoord] = useState();
  const [ycoord, setYcoord] = useState();
  const [initalChoice, setInitialChoice] = useState();
  //storing to a state props passed from Choice.js
  const [chosenMonth, setChosenMonth] = useState('');
  const [chosenSort, setChosenSort] = useState('');
  const [beginDay, setBeginDay] = useState();
  const [endDay, setEndDay] = useState('');
  const [distance1, setDistance1] = useState();
  const [distance2, setDistance2] = useState();
  const [durationFrom, setDurationFrom] = useState();
  const [durationTo, setDurationTo] = useState();
  const [stationFrom, setStationFrom] = useState();
  //userchoice takes as parameters the initial choice made by user inside SortChoice to search for sorted or filtered results or for plain resutls of a single dataset(one month only is allowed at the moment). These will be passed as props to InitialFetch.js
  const userchoice = (
    month,
    sortby,
    beginDay,
    endDay,
    distanceParam1,
    distanceParam2,
    station,
    duration1,
    duration2
  ) => {
    console.log('inside app');
    setDistance1(distanceParam1);
    setDistance2(distanceParam2);
    setBeginDay(beginDay);
    setEndDay(endDay);
    setChosenMonth(month);
    setStationFrom(station);
    setDurationFrom(duration1);
    setDurationTo(duration2);
    if (sortby === 'distance') {
      setChosenSort('covered_distance');
    } else {
      setChosenSort(sortby);
    }
  };
  const initialchoice = (e) => {
    console.log(e);
    setInitialChoice(e);
  };
  const onShowingMapCoords = (x, y) => {
    setXcoord(x);
    setYcoord(y);
  };
  return (
    <div className="App">
      <Switch initialchoice={initialchoice}></Switch>
      {initalChoice === 'sort' ? (
        <SortChoice userChoices={userchoice}></SortChoice>
      ) : null}

      {chosenMonth ? (
        <InitialFetch
          dataset={chosenMonth}
          sort={chosenSort}
          startdayofsearch={beginDay}
          enddayofsearch={endDay}
          distance1={distance1}
          distance2={distance2}
          duration1={durationFrom}
          duration2={durationTo}
          station={stationFrom}
        />
      ) : null}
      {initalChoice === 'singlestation' ? (
        <StationsData coords={onShowingMapCoords}></StationsData>
      ) : null}
      {initalChoice === 'singlestation' ? (
        <Map className="map" x={xcoord} y={ycoord}></Map>
      ) : null}
    </div>
  );
}

export default App;
