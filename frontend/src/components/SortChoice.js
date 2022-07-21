import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
//Choice.js takes care of what datasets to be displayed (May, June or July) through a select field
//it is also used to get user inputs about filters or sorting the database queries
const SortChoice = ({ userChoices }) => {
  let datasets = ['may', 'june', 'july'];
  let sortby = ['distance', 'duration'];

  //not yet copied
  let monthdays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  let month30days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState('');
  useEffect(() => {
    availableStations();
  }, []);
  const availableStations = async () => {
    const data = await axios.get('http://localhost:3000/allstations');

    let stationNames = data.data;
    setStations(stationNames);
  };
  const [invalid, setInvalid] = useState(false);
  const [month, setMonth] = useState('');
  const [sort, setSort] = useState('');
  const [beginDay, setBeginDay] = useState();
  const [endDay, setEndDay] = useState();
  const [distanceParam1, setDistanceFrom] = useState();
  const [distanceParam2, setDistanceTo] = useState();
  const [duration1, setDuration1] = useState();
  const [duration2, setDuration2] = useState();
  const selectingMonth = (e) => {
    setMonth(e.target.value);
  };
  const selectingSortBy = (e) => {
    setSort(e.target.value);
  };
  //passing month parameter to the parent component(App) via prop (monthchoice)
  const sendingOptions = () => {
    if (month) {
      setInvalid(false);
      userChoices(
        month,
        sort,
        beginDay,
        endDay,
        distanceParam1,
        distanceParam2,
        station,
        duration1,
        duration2
      );
    } else {
      setInvalid(true);
    }
  };
  const selectingStartDay = (e) => {
    setBeginDay(e.target.value);
  };
  const selectingEndDay = (e) => {
    setEndDay(e.target.value);
  };
  const distanceFrom = (e) => {
    setDistanceFrom(e.target.value);
  };
  const distanceTo = (e) => {
    setDistanceTo(e.target.value);
  };
  const selectingStation = (e) => {
    setStation(e.target.value);
  };
  const durationFrom = (e) => {
    setDuration1(e.target.value);
  };
  const durationTo = (e) => {
    setDuration2(e.target.value);
  };
  return (
    <div>
      <div>
        month (mandatory)
        <select onChange={selectingMonth}>
          <option></option>

          {datasets.map((month) => {
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        from station
        <select onChange={selectingStation}>
          <option></option>
          {stations.map((station) => {
            return (
              <option value={station.ID} key={station.FID}>
                {station.name} &nbsp; {station.address}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        from day
        <select onChange={selectingStartDay}>
          <option></option>
          {month === 'june'
            ? month30days.map((day) => {
                return <option key={day}>{day}</option>;
              })
            : monthdays.map((day) => {
                return <option key={day}>{day}</option>;
              })}
        </select>
      </div>
      {beginDay ? (
        <div>
          to day
          <select onChange={selectingEndDay}>
            <option defaultValue="choose the dataset"></option>
            {month === 'june'
              ? month30days
                  .filter((day) => day > beginDay)
                  .map((day) => {
                    return <option key={day}>{day}</option>;
                  })
              : monthdays
                  .filter((day) => day > beginDay)
                  .map((day) => {
                    return <option key={day}>{day}</option>;
                  })}
          </select>
        </div>
      ) : null}

      <div>
        <div>
          distance from
          <input id="distance_from" type="text" onChange={distanceFrom}></input>
        </div>
        {distanceParam1 ? (
          <div>
            distance to
            <input id="distance_to" type="text" onChange={distanceTo}></input>
          </div>
        ) : null}
      </div>
      <div>
        <div>
          duration from
          <input type="text" onChange={durationFrom}></input>
        </div>
        {duration1 ? (
          <div>
            duration to<input type="text" onChange={durationTo}></input>
          </div>
        ) : null}
      </div>

      <div>
        sort by
        <select onChange={selectingSortBy}>
          <option defaultValue="sort by"></option>

          {sortby.map((sort) => {
            return (
              <option key={sort} value={sort}>
                {sort}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={sendingOptions}>OK</button>
      {invalid ? <div>choose a month</div> : null}
    </div>
  );
};
export default SortChoice;
