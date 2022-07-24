import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// setAVGfromMay(avgJourneyMayFrom);
// setAVGfromJune(avgJourneyJuneFrom);
// setAVGfromJuly(avgJourneyJulyFrom);
// setAVGtoMay(avgJourneyMayTo);
// setAVGtoJune(avgJourneyJuneTo);
// setAVGtoJuly(avgJourneyJulyTo);
// setAvgFrom(avgJourneyLengthFrom);
// setAvgTo(avgJourneyLengthTo);
const StationsData = ({ coords }) => {
  const [stations, setStations] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [departureNumber, setDepartureNumber] = useState();
  const [arrivalNumber, setArrivalNumber] = useState();
  const [currentStationId, setCurrentStationId] = useState();
  const [avgFrom, setAvgFrom] = useState();
  const [avgTo, setAvgTo] = useState();
  const [avgFromMay,setAVGfromMay]=useState();
  const [avgFromJune,setAVGfromJune]=useState();
  const [avgFromJuly,setAVGfromJuly]=useState();
  const [avgToMay,setAVGtoMay]=useState();
  const [avgToJune,setAVGtoJune]=useState();
  const [avgToJuly,setAVGtoJuly]=useState();
  const [top5Month,setTop5Month]=useState();
  const [topReturnFromHere,setTopReturnFromHere]=useState([])
  const [topReturnToHere,setTopReturnToHere]=useState([])
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
  const onTop5Stations=async()=>{
    const data = await axios.get(
      `http://localhost:3000/top5stations?id=${currentStationId}&month=${top5Month}`
    );
    console.log(data.data);
    const topDepartures = data.data.filter((x)=>x.departure_station_id===currentStationId);
     const topReturns = data.data.filter(
       (x) => x.return_station_id === currentStationId
     );
   const array2=[...topReturns];
   array2.sort((a,b)=>{
    return b.cont-a.cont;
   });
   setTopReturnToHere(array2)
   const array=[...topDepartures]
   array.sort((a,b)=>{
    return b.cont-a.cont;
   })
   setTopReturnFromHere(array)
  }
  const months=["may","june","july"];
  const selectMonth = (e)=>{
    setTop5Month(e.target.value)
  }
  return (
    <div>
      {avgFrom ? (
        <div>
          <div>
            average journey distance from this station(total): {avgFrom}
          </div>
          <div>
            average journey distance from this station(May): {avgFromMay}
          </div>
          <div>
            average journey distance from this station(June): {avgFromJune}
          </div>
          <div>
            average journey distance from this station(July): {avgFromJuly}
          </div>
          <div>average journey distance to this station(total): {avgTo}</div>
          <div>average journey distance to this station(May): {avgToMay}</div>
          <div>average journey distance to this station(June): {avgToJune}</div>
          <div>average journey distance to this station(July): {avgToJuly}</div>
        </div>
      ) : null}
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
          <div onClick={onFurtherInfos}>further station infos</div>
          <div>
            TOP 5 stations from and to this station in{' '}
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
          {topReturnFromHere ? (
            <div>
              <div>
                top 5 routes from here in {top5Month}
                {topReturnFromHere.map((station) => {
                  return (
                    <div>
                      <div>{station.return_station}</div>
                      <div>{station.cont}</div>
                    </div>
                  );
                })}
              </div>

              <div>
                top 5 routes to here in {top5Month}
                {topReturnToHere.map((station) => {
                  return (
                    <div>
                      <div>{station.departure_station}</div>
                      <div>{station.cont}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default StationsData;
