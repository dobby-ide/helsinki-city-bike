import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StationsData = ({ coords }) => {
  const [stations, setStations] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [departureNumber, setDepartureNumber] = useState();
  const [arrivalNumber, setArrivalNumber] = useState();

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

  return (
    <div>
      <input type="search" onChange={onSearchChange}></input>
      {filteredStations.map((station) => {
        return (
          <div
            id={station.ID}
            key={station.FID}
            onClick={onRetrieveStationInformations}
          >
            {station.name}
            &nbsp; {station.address}
          </div>
        );
      })}
      {arrivalNumber ? (
        <div>
          <div>
            total numbers of journeys from this station: {departureNumber}
          </div>
          <div>
            total numbers of journeys to this station:
            {arrivalNumber}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StationsData;
