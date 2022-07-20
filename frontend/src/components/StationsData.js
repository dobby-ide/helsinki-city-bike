import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StationsData = ({ coords }) => {
  const [stations, setStations] = useState([]);
  const [searchField, setSearchField] = useState('');
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
    const coordinates = stations.find((x) => x.FID === Number(e.target.id));
    console.log(coordinates);
    coords(coordinates.x_coord, coordinates.y_coord);
  };
  return (
    <div>
      <input type="search" onChange={onSearchChange}></input>
      {filteredStations.map((station) => {
        return (
          <div
            id={station.FID}
            key={station.FID}
            onClick={onRetrieveStationInformations}
          >
            {station.name}
            &nbsp; {station.address}
          </div>
        );
      })}
    </div>
  );
};

export default StationsData;
