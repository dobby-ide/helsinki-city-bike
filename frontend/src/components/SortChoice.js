import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
//Choice.js takes care of what datasets to be displayed (May, June or July) through a select field
//it is also used to get user inputs about filters or sorting the database queries
const SortChoice = ({ userChoices }) => {
  let datasets = ['may', 'june', 'july'];
  let sortby = ['distance', 'duration'];
  let port = '';
  if (process.env.NODE_ENV === 'development') {
    port = 'http://localhost:3000';
  }

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
    const data = await axios.get(`${port}/allstations`);

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
    <div className="sortchoice">
      <div className="sortchoice--month">
        <select id="month" onChange={selectingMonth}>
          <option value="choose a month" disabled selected hidden>
            choose a month
          </option>
          <option></option>

          {datasets.map((month) => {
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>
        <label className="sortchoice--month_label" for="month">
          month (mandatory)
        </label>
      </div>
      <div className="sortchoice--fromstation">
        <select onChange={selectingStation} id="station">
          <option disabled selected hidden>
            filter by station
          </option>
          <option></option>
          {stations.map((station) => {
            return (
              <option value={station.ID} key={station.FID}>
                {station.name} &nbsp; {station.address}
              </option>
            );
          })}
        </select>
        <label for="station">filter by station</label>
      </div>
      <div className="sortchoice--day">
        <div className="sortchoice--day_from">
          <select onChange={selectingStartDay} id="startday">
            <option disabled selected hidden>
              start day
            </option>
            <option></option>
            {month === 'june'
              ? month30days.map((day) => {
                  return <option key={day}>{day}</option>;
                })
              : monthdays.map((day) => {
                  return <option key={day}>{day}</option>;
                })}
          </select>
          <label for="startday">start day</label>
        </div>
        {beginDay ? (
          <div className="sortchoice--day_to">
            <select onChange={selectingEndDay} id="endday">
              <option disabled selected hidden>
                end day
              </option>
              <option></option>
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
            <label for="endday">end day</label>
          </div>
        ) : null}
      </div>
      <div className="sortchoice--distance">
        <div className="sortchoice--distance_from">
          <input
            id="distance_from"
            type="text"
            onChange={distanceFrom}
            placeholder="minimum distance"
          ></input>
          <label for="distance_from">minimum distance</label>
        </div>
        {distanceParam1 ? (
          <div className="sortchoice--distance_to">
            <input
              id="distance_to"
              type="text"
              onChange={distanceTo}
              placeholder="maximum distance"
            ></input>
            <label for="distance_to">max distance</label>
          </div>
        ) : null}
      </div>
      <div className="sortchoice--duration">
        <div className="sortchoice--duration_from">
          <input
            type="text"
            onChange={durationFrom}
            id="durationfrom"
            placeholder="minimum time"
          ></input>
          <label for="durationfrom">minimum time</label>
        </div>
        {duration1 ? (
          <div className="sortchoice--duration_to">
            <input
              type="text"
              onChange={durationTo}
              placeholder="maximum time"
            ></input>
            <label for="maxduration">maximum time</label>
          </div>
        ) : null}
      </div>
      <div className="sortchoice--sortby">
        <select onChange={selectingSortBy} id="sortby">
          <option disabled selected hidden>
            sort results
          </option>
          <option></option>

          {sortby.map((sort) => {
            return (
              <option key={sort} value={sort}>
                {sort}
              </option>
            );
          })}
        </select>
        <label for="sortby">sort results</label>
      </div>
      <div className="sortchoice--btn">
        <button onClick={sendingOptions} className="sortchoice--btn_btn">
          OK
        </button>
        {invalid ? <div>choose a month</div> : null}
      </div>
    </div>
  );
};
export default SortChoice;
