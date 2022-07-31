import axios from 'axios';
import { useEffect, useState } from 'react';
function InitialFetch({
  dataset,
  sort,
  startdayofsearch,
  enddayofsearch,
  distance1,
  distance2,
  duration1,
  duration2,
  station,
}) {
  console.log(station);
  //following useState() takes care of dividing the amount of data into small chunks (they are used in a function called by useEffect so at the mounting time of the app component)
  const [numberOfRows, setNumberOfRows] = useState();
  const [arrayOfPages, setArrayOfpages] = useState([]);
  const [pageOfData, setPageOfData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let port = '';
  if (process.env.NODE_ENV === 'development') {
    port = 'http://localhost:3000';
  }
  useEffect(() => {
    setNumberOfRows('');
    setPageOfData(['']);
    setIsLoading(true);
    getNumberOfRows();
  }, [dataset, sort, duration2, distance2, enddayofsearch, station]);
  //using axios to query the server: get the total numbers of tours only and then divide them to have pagination in numbers
  const getNumberOfRows = async () => {
    //writing some crazy logic here to match all the possible filter/sort possibilities for the user query

    //all the cases(5)
    if (sort && enddayofsearch && distance2 && station && duration2) {
      console.log('it works &&');
      const data = await axios.get(
        `${port}/sortedpageallparams?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
      setIsLoading(false);
    }

    //4 cases
    else if (sort && enddayofsearch && duration2 && station) {
      console.log('inside sort,day duration station');
      const data = await axios.get(
        `${port}/sortdaydurationstation?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && enddayofsearch && distance2 && duration2) {
      console.log('inside sort,dayduration,distance');
      const data = await axios.get(
        `${port}/sortdaydistanceduration?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && enddayofsearch && station && distance2) {
      console.log('inside sort,day,distance station');
      const data = await axios.get(
        `${port}/sortdaydistancestation?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&station=${station}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && duration2 && station && distance2) {
      console.log('inside sortduration2station distance');
      const data = await axios.get(
        `${port}/sortdurationdistancestation?month=${dataset}&sort=${sort}&distance1=${distance1}&distance2=${distance2}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    }
    //3 cases
    else if (sort && enddayofsearch && duration2) {
      console.log('inside sort,dayduration2');
      const data = await axios.get(
        `${port}/sortdayduration?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && enddayofsearch && station) {
      console.log('inside sort,day station ');
      const data = await axios.get(
        `${port}/sortdaystation?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&station=${station}&`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && enddayofsearch && distance2) {
      console.log('inside sort,day,distance');
      const data = await axios.get(
        `${port}/sortdaydistance?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && duration2 && station) {
      console.log('inside sortduration2station ');
      const data = await axios.get(
        `${port}/sortdurationstation?month=${dataset}&sort=${sort}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && duration2 && distance2) {
      console.log('inside sort duration distance');
      const data = await axios.get(
        `${port}/sortdurationdistance?month=${dataset}&sort=${sort}&distance1=${distance1}&distance2=${distance2}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && station && distance2) {
      console.log('inside sort station distance');
      const data = await axios.get(
        `${port}/sortstationdistance?month=${dataset}&sort=${sort}&distance1=${distance1}&distance2=${distance2}&station=${station}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (enddayofsearch && duration2 && station) {
      console.log('dayduration2station ');
      const data = await axios.get(
        `${port}/daydurationstation?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (enddayofsearch && duration2 && distance2) {
      console.log('dayduration2distance');
      const data = await axios.get(
        `${port}/daydurationdistance?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (enddayofsearch && station && distance2) {
      console.log('inside day station distance');
      const data = await axios.get(
        `${port}/daystationdistance?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&station=${station}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (duration2 && station && distance2) {
      console.log('duration2station distance');
      const data = await axios.get(
        `${port}/durationstationdistance?month=${dataset}&distance1=${distance1}&distance2=${distance2}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    }
    //two cases
    else if (sort && enddayofsearch) {
      console.log('inside sort,day');
      const data = await axios.get(
        `${port}/sortday?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && duration2) {
      console.log('inside sortduration2');
      const data = await axios.get(
        `${port}/sortduration?month=${dataset}&sort=${sort}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && station) {
      console.log('inside sort station ');
      const data = await axios.get(
        `${port}/sortstation?month=${dataset}&sort=${sort}&station=${station}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort && distance2) {
      console.log('inside sort,distance');
      const data = await axios.get(
        `${port}/sortdistance?month=${dataset}&sort=${sort}&distance1=${distance1}&distance2=${distance2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (enddayofsearch && duration2) {
      console.log('inside dayduration2');
      const data = await axios.get(
        `${port}/dayduration?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (enddayofsearch && station) {
      console.log('inside day station ');
      const data = await axios.get(
        `${port}/daystation?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&station=${station}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (enddayofsearch && distance2) {
      console.log('inside day,distance');
      const data = await axios.get(
        `${port}/daydistance?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (duration2 && station) {
      console.log('insideduration2station ');
      const data = await axios.get(
        `${port}/durationstation?month=${dataset}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (duration2 && distance2) {
      console.log('insideduration2distance');
      const data = await axios.get(
        `${port}/durationdistance?month=${dataset}&distance1=${distance1}&distance2=${distance2}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (station && distance2) {
      console.log('inside distance station');
      const data = await axios.get(
        `${port}/stationdistance?month=${dataset}&distance1=${distance1}&distance2=${distance2}&station=${station}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    }
    //one case
    else if (enddayofsearch) {
      console.log('inside day');
      const data = await axios.get(
        `${port}/onlyday?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
      // const total = Math.trunc(data.data / 1000);
      // const emptyArray = [...Array(total).keys()];
      // console.log(emptyArray);
      // setArrayOfpages(emptyArray);
    } else if (duration2) {
      console.log('insideduration2');
      const data = await axios.get(
        `${port}/onlyduration?month=${dataset}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (station) {
      console.log('inside station');
      const data = await axios.get(
        `${port}/onlystation?month=${dataset}&station=${station}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (distance2) {
      console.log('inside distance');
      const data = await axios.get(
        `${port}/onlydistance?month=${dataset}&distance1=${distance1}&distance2=${distance2}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else if (sort) {
      console.log('inside sort');
      const data = await axios.get(
        `${port}/onlysort?month=${dataset}&sort=${sort}`
      );
      setPageOfData(data.data);
      setIsLoading(false);
    } else {
      const data = await axios.get(
        `${port}/everytoursofthemonth?month=${dataset}`
      );
      setNumberOfRows(data.data);
      const total = Math.trunc(data.data / 10000);
      const emptyArray = [...Array(total).keys()];
      console.log(emptyArray);
      setArrayOfpages(emptyArray);
      let pieceOfData = await axios.get(`${port}/page?page=0&month=${dataset}`);
      setPageOfData(pieceOfData.data);
      setIsLoading(false);
    }
  };

  //fetching works with pages when no filter is used
  const fetching = async (e) => {
    console.log(e.target.id);
    const page = e.target.id;
    //if sort is enabled by a user choice then axios request is routed differently

    //IF (sort && filter) else if(sort) else....
    if (sort) {
      console.log('sort');
      let pieceOfData = await axios.get(
        `${port}/sortedpage?page=${page}&month=${dataset}&sort=${sort}`
      );
      setPageOfData(pieceOfData.data);
      setIsLoading(false);
    } else {
      let pieceOfData = await axios.get(
        `${port}/page?page=${page}&month=${dataset}`
      );
      setPageOfData(pieceOfData.data);
      setIsLoading(false);
      let initialDate = new Date(pieceOfData.data[0].departure);
      let convertedDate = initialDate.toDateString();
      console.log(convertedDate);
      setStartDate(convertedDate);
      let finalDate = new Date(
        pieceOfData.data[pieceOfData.data.length - 1].departure
      );
      let convertedFinalDate = finalDate.toDateString();
      console.log(convertedFinalDate);
      setFinalDate(convertedDate);
    }
  };
  //SORTING RESULTS ACCORDING TO COLUMNS PROVIDED
  const sortByDepartureStation = (e) => {
    const array = [...pageOfData];
    if (e.target.id === 'up') {
      array.sort((a, b) =>
        a.departure_station
          .toLowerCase()
          .localeCompare(b.departure_station.toLowerCase())
      );
    } else {
      array.sort((a, b) =>
        b.departure_station
          .toLowerCase()
          .localeCompare(a.departure_station.toLowerCase())
      );
    }
    setPageOfData(array);
    setIsLoading(false);
  };
  const sortByArriveStation = (e) => {
    const array = [...pageOfData];
    if (e.target.id === 'up') {
      array.sort((a, b) =>
        a.return_station
          .toLowerCase()
          .localeCompare(b.return_station.toLowerCase())
      );
    } else {
      array.sort((a, b) =>
        b.return_station
          .toLowerCase()
          .localeCompare(a.return_station.toLowerCase())
      );
    }
    setPageOfData(array);
    setIsLoading(false);
  };
  const sortingByDate = (e) => {
    const array = [...pageOfData];
    if (e.target.id === 'up') {
      array.sort((a, b) => {
        return new Date(b.departure) - new Date(a.departure);
      });
    } else {
      array.sort((a, b) => {
        return new Date(a.departure) - new Date(b.departure);
      });
    }
    setPageOfData(array);
    setIsLoading(false);
  };
  const sortingByDistance = (e) => {
    const array = [...pageOfData];
    if (e.target.id === 'up') {
      array.sort((a, b) => {
        return b.covered_distance - a.covered_distance;
      });
    } else {
      array.sort((a, b) => {
        return a.covered_distance - b.covered_distance;
      });
    }

    setPageOfData(array);
    setIsLoading(false);
  };
  const sortingByDuration = (e) => {
    const array = [...pageOfData];
    if (e.target.id === 'up') {
      array.sort((a, b) => {
        return b.duration - a.duration;
      });
    } else {
      array.sort((a, b) => {
        return a.duration - b.duration;
      });
    }

    setPageOfData(array);
    setIsLoading(false);
  };

  return (
    <div className="fetcher">
      {isLoading ? (
        <div className="fetcher--loading">
          <img
            src="\img\bikewheel2.png"
            alt="loading..."
            className="fetcher--loading-wheel-img"
          />
        </div>
      ) : null}
      {pageOfData ? (
        <div className="fetcher__data">
          <div className="fetcher__data--header">
            <div className="fetcher__data--header-5">
              <div className="fetcher__data--header-5-text">day</div>
              <div
                id="up"
                className="fetcher__data--header-5 uparrow"
                onClick={sortingByDate}
              >
                &#8963;{' '}
              </div>
              <div
                id="down"
                className="fetcher__data--header-5 downarrow"
                onClick={sortingByDate}
              >
                &#x2304;
              </div>
            </div>
            <div className="fetcher__data--header-1">
              <div className="fetcher__data--header-1-text">
                departure station
              </div>
              <div
                id="up"
                className="fetcher__data--header-1 uparrow"
                onClick={sortByDepartureStation}
              >
                &#8963;{' '}
              </div>
              <div
                id="down"
                className="fetcher__data--header-1 downarrow"
                onClick={sortByDepartureStation}
              >
                &#x2304;
              </div>
            </div>
            <div className="fetcher__data--header-2">
              <div className="fetcher__data--header-2-text">return station</div>
              <div
                id="up"
                className="fetcher__data--header-2 uparrow"
                onClick={sortByArriveStation}
              >
                &#8963;{' '}
              </div>
              <div
                id="down"
                className="fetcher__data--header-2 downarrow"
                onClick={sortByArriveStation}
              >
                &#x2304;
              </div>
            </div>
            <div className="fetcher__data--header-3">
              <div className="fetcher__data--header-3-text">
                duration(minutes)
              </div>
              <div
                id="up"
                className="fetcher__data--header-3 uparrow"
                onClick={sortingByDuration}
              >
                &#8963;{' '}
              </div>
              <div
                id="down"
                className="fetcher__data--header-3 downarrow"
                onClick={sortingByDuration}
              >
                &#x2304;
              </div>
            </div>
            <div className="fetcher__data--header-4">
              <div className="fetcher__data--header-4-text">distance</div>
              <div
                id="up"
                className="fetcher__data--header-4 uparrow"
                onClick={sortingByDistance}
              >
                &#8963;{' '}
              </div>
              <div
                id="down"
                className="fetcher__data--header-4 downarrow"
                onClick={sortingByDistance}
              >
                &#x2304;
              </div>
            </div>
          </div>
          {pageOfData.map((x) => {
            return (
              <div className="fetcher__data-content">
                <div className="fetcher__data-departure">
                  {!isLoading
                    ? new Date(x.departure)
                        .toDateString()
                        .split(' ')
                        .slice(1)
                        .join(' ')
                    : null}
                </div>
                <div className="fetcher__data-depstation">
                  {x.departure_station}
                </div>
                <div className="fetcher__data-arrstation">
                  {x.return_station}
                </div>
                <div className="fetcher__data-duration">
                  {!isLoading ? Math.round(x.duration / 60).toString() : null}
                </div>
                <div className="fetcher__data-distance">
                  {x.covered_distance}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {numberOfRows ? (
        <h1 className="fetcher__pages-header">
          total number of queries in {dataset.toUpperCase()}: {numberOfRows}
        </h1>
      ) : null}
      <div className="fetcher__pages">
        {arrayOfPages ? (
          arrayOfPages.map((x) => {
            return (
              <div
                className="fetcher__pages-content"
                key={x}
                id={x}
                onClick={fetching}
              >
                {x}
              </div>
            );
          })
        ) : (
          <div>...LOADING</div>
        )}
      </div>
    </div>
  );
}

export default InitialFetch;
