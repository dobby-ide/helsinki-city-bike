import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const StationsData = ({ coords }) => {
  const [stations, setStations] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [departureNumber, setDepartureNumber] = useState();
  const [stationName, setStationName] = useState('');
  const [arrivalNumber, setArrivalNumber] = useState();
  const [currentStationId, setCurrentStationId] = useState();
  const [avgFrom, setAvgFrom] = useState();
  const [avgTo, setAvgTo] = useState();
  const [avgFromMay, setAVGfromMay] = useState();
  const [avgFromJune, setAVGfromJune] = useState();
  const [avgFromJuly, setAVGfromJuly] = useState();
  const [avgToMay, setAVGtoMay] = useState();
  const [avgToJune, setAVGtoJune] = useState();
  const [avgToJuly, setAVGtoJuly] = useState();
  const [top5Month, setTop5Month] = useState();
  const [topReturnFromHere, setTopReturnFromHere] = useState([]);
  const [topReturnToHere, setTopReturnToHere] = useState([]);
  useEffect(() => {
    availableStations();
  }, []);
  const availableStations = async () => {
    const data = await axios.get('http://localhost:3000/allstations');

    let stationNames = data.data;
    setStations(stationNames);
  };
  const filteredStations = stations.filter((station) => {
    return station.name.toLocaleLowerCase().includes(searchField);
  });
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  const onRetrieveStationInformations = (e) => {
    const coordinates = stations.find((x) => x.ID === Number(e.target.id));
    console.log(coordinates);
    coords(coordinates.x_coord, coordinates.y_coord);
    setCurrentStationId(e.target.id);
    const stationName = coordinates.name;
    setStationName(stationName);
    setTopReturnFromHere([]);
    setAvgFrom(0);
    onStationsData(e.target.id);
  };
  const onStationsData = async (fid) => {
    const data = await axios.get(
      `http://localhost:3000/infostation?fid=${fid}`
    );
    let stationInfo = data.data[0];
    const numberOfDepartures = stationInfo[Object.keys(stationInfo)[0]];
    let stationInfo2 = data.data[1];
    const numberOfArrivals = stationInfo2[Object.keys(stationInfo2)[0]];

    setArrivalNumber(numberOfArrivals);
    setDepartureNumber(numberOfDepartures);
    console.log(data.data);
  };
  //logic to give the user the average distance from and to a station and monthly based or total
  const onFurtherInfos = async () => {
    const data = await axios.get(
      `http://localhost:3000/furtherinfostation?id=${currentStationId}`
    );
    console.log(data.data);
    const avgJourneyMayFrom = data.data[0].average;
    const avgJourneyJuneFrom = data.data[1].average;
    const avgJourneyJulyFrom = data.data[2].average;
    const avgJourneyMayTo = data.data[3].average;
    const avgJourneyJuneTo = data.data[4].average;
    const avgJourneyJulyTo = data.data[5].average;
    const avgJourneyLengthFrom =
      (avgJourneyMayFrom + avgJourneyJuneFrom + avgJourneyJulyFrom) / 3;
    const avgJourneyLengthTo =
      (avgJourneyMayTo + avgJourneyJuneTo + avgJourneyJulyTo) / 3;
    setAVGfromMay(avgJourneyMayFrom);
    setAVGfromJune(avgJourneyJuneFrom);
    setAVGfromJuly(avgJourneyJulyFrom);
    setAVGtoMay(avgJourneyMayTo);
    setAVGtoJune(avgJourneyJuneTo);
    setAVGtoJuly(avgJourneyJulyTo);
    setAvgFrom(avgJourneyLengthFrom);
    setAvgTo(avgJourneyLengthTo);
  };
  //TOP 5 Stations
  const onTop5Stations = async () => {
    const data = await axios.get(
      `http://localhost:3000/top5stations?id=${currentStationId}&month=${top5Month}`
    );
    console.log(data.data);
    const topDepartures = data.data.filter(
      (x) => x.departure_station_id === currentStationId
    );
    const topReturns = data.data.filter(
      (x) => x.return_station_id === currentStationId
    );
    const array2 = [...topReturns];
    array2.sort((a, b) => {
      return b.cont - a.cont;
    });
    setTopReturnToHere(array2);
    const array = [...topDepartures];
    array.sort((a, b) => {
      return b.cont - a.cont;
    });
    setTopReturnFromHere(array);
  };
  const months = ['may', 'june', 'july'];
  const selectMonth = (e) => {
    setTop5Month(e.target.value);
  };
  return (
    <div className="stationsdata_container">
      <div className="stationsdata_input">
        <input
          type="search"
          onChange={onSearchChange}
          placeholder="search stations"
        ></input>
      </div>
      <div className="stationsdata">
        {filteredStations.map((station) => {
          return (
            <div
              className="stationsdata_data"
              key={station.FID}
              id={station.ID}
              onClick={onRetrieveStationInformations}
            >
              <div className="stationsdata_data-name">{station.name}</div>
              <div className="stationsdata_data-address">
                {' '}
                {station.address}
              </div>
            </div>
          );
        })}
      </div>
      {arrivalNumber ? (
        <div className="stationsdata_container-arrival">
          <div className="stationsdata_container-arrival-header">
            {stationName} in numbers
          </div>
          <div
            onClick={onFurtherInfos}
            className="stationsdata_container-arrival-avg"
          >
            average length of journeys
          </div>
          <div className="stationsdata_container-arrival-popular">
            popular station connections in &nbsp;
            <select onChange={selectMonth}>
              <option></option>
              {months.map((month) => {
                return (
                  <option key={month} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            <button onClick={onTop5Stations}>ok</button>
          </div>
          <div className="stationsdata_container-arrival-maininfo">
            From {stationName} {departureNumber} journeys have been departing
            and {arrivalNumber} journeys finished to {stationName}
          </div>
          <div className="stationsdata_container-arrival-grid">
            {topReturnFromHere.length > 1 ? (
              <div className="stationsdata_container-arrival-grid-top">
                <div>
                  top return stations from here in {top5Month}
                  {topReturnFromHere.map((station) => {
                    return (
                      <div>
                        <div>
                          To {station.return_station}, {station.cont} times
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  top departure stations in {top5Month}
                  {topReturnToHere.map((station) => {
                    return (
                      <div>
                        <div>
                          From {station.departure_station}, {station.cont} times
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {avgFrom ? (
              <div className="stationsdata_container-arrival-grid-avg">
                <div>
                  average journey distance from this station(total):{' '}
                  {Math.round(avgFrom) / 1000}
                </div>
                <div>
                  average journey distance from this station(May):{' '}
                  {Math.round(avgFromMay) / 1000}
                </div>
                <div>
                  average journey distance from this station(June):{' '}
                  {Math.round(avgFromJune) / 1000}
                </div>
                <div>
                  average journey distance from this station(July):{' '}
                  {Math.round(avgFromJuly) / 1000}
                </div>
                <div>
                  average journey distance to this station(total):{' '}
                  {Math.round(avgTo) / 1000}
                </div>
                <div>
                  average journey distance to this station(May):{' '}
                  {Math.round(avgToMay) / 1000}
                </div>
                <div>
                  average journey distance to this station(June):{' '}
                  {Math.round(avgToJune) / 1000}
                </div>
                <div>
                  average journey distance to this station(July):{' '}
                  {Math.round(avgToJuly) / 1000}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StationsData;
