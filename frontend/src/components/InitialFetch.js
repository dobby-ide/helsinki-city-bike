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
  useEffect(() => {
    setNumberOfRows('');
    setPageOfData(['']);
    getNumberOfRows();
  }, [dataset, sort, duration2, distance2, enddayofsearch, station]);
  //using axios to query the server: get the total numbers of tours only and then divide them to have pagination in numbers
  const getNumberOfRows = async () => {
    //writing some crazy logic here to match all the possible filter/sort possibilities for the user query

    //all the cases(5)
    if (sort && enddayofsearch && distance2 && station && duration2) {
      console.log('it works &&');
      const data = await axios.get(
        `http://localhost:3000/sortedpageallparams?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    }

    //4 cases
    else if (sort && enddayofsearch && duration2 && station) {
      console.log('inside sort,day duration station');
      const data = await axios.get(
        `http://localhost:3000/sortdaydurationstation?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (sort && enddayofsearch && distance2 && duration2) {
      console.log('inside sort,dayduration,distance');
      const data = await axios.get(
        `http://localhost:3000/sortdaydistanceduration?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (sort && enddayofsearch && station && distance2) {
      console.log('inside sort,day,distance station');
      const data = await axios.get(
        `http://localhost:3000/sortdaydistancestation?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&station=${station}`
      );
      setPageOfData(data.data);
    } else if (sort && duration2 && station && distance2) {
      console.log('inside sortduration2station distance');
      const data = await axios.get(
        `http://localhost:3000/sortdurationdistancestation?month=${dataset}&sort=${sort}&distance1=${distance1}&distance2=${distance2}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    }
    //3 cases
    else if (sort && enddayofsearch && duration2) {
      console.log('inside sort,dayduration2');
      const data = await axios.get(
        `http://localhost:3000/sortdayduration?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (sort && enddayofsearch && station) {
      console.log('inside sort,day station ');
      const data = await axios.get(
        `http://localhost:3000/sortdaystation?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&station=${station}&`
      );
      setPageOfData(data.data);
    } else if (sort && enddayofsearch && distance2) {
      console.log('inside sort,day,distance');
      const data = await axios.get(
        `http://localhost:3000/sortdaydistance?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}`
      );
      setPageOfData(data.data);
    } else if (sort && duration2 && station) {
      console.log('inside sortduration2station ');
      const data = await axios.get(
        `http://localhost:3000/sortdurationstation?month=${dataset}&sort=${sort}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (sort && duration2 && distance2) {
      console.log('inside sort duration distance');
      const data = await axios.get(
        `http://localhost:3000/sortdurationdistance?month=${dataset}&sort=${sort}&distance1=${distance1}&distance2=${distance2}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (sort && station && distance2) {
      console.log('inside sort station distance');
      const data = await axios.get(
        `http://localhost:3000/sortstationdistance?month=${dataset}&sort=${sort}&distance1=${distance1}&distance2=${distance2}&station=${station}`
      );
      setPageOfData(data.data);
    } else if (enddayofsearch && duration2 && station) {
      console.log('dayduration2station ');
      const data = await axios.get(
        `http://localhost:3000/daydurationstation?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (enddayofsearch && duration2 && distance2) {
      console.log('dayduration2distance');
      const data = await axios.get(
        `http://localhost:3000/daydurationdistance?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (enddayofsearch && station && distance2) {
      console.log('inside day station distance');
      const data = await axios.get(
        `http://localhost:3000/daystationdistance?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}&station=${station}`
      );
      setPageOfData(data.data);
    } else if (duration2 && station && distance2) {
      console.log('duration2station distance');
      const data = await axios.get(
        `http://localhost:3000/durationstationdistance?month=${dataset}&distance1=${distance1}&distance2=${distance2}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    }
    //two cases
    else if (sort && enddayofsearch) {
      console.log('inside sort,day');
      const data = await axios.get(
        `http://localhost:3000/sortday?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}`
      );
      setPageOfData(data.data);
    } else if (sort && duration2) {
      console.log('inside sortduration2');
      const data = await axios.get(
        `http://localhost:3000/sortduration?month=${dataset}&sort=${sort}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (sort && station) {
      console.log('inside sort station ');
      const data = await axios.get(
        `http://localhost:3000/sortstation?month=${dataset}&sort=${sort}&station=${station}`
      );
      setPageOfData(data.data);
    } else if (sort && distance2) {
      console.log('inside sort,distance');
      const data = await axios.get(
        `http://localhost:3000/sortdistance?month=${dataset}&sort=${sort}&distance1=${distance1}&distance2=${distance2}`
      );
      setPageOfData(data.data);
    } else if (enddayofsearch && duration2) {
      console.log('inside dayduration2');
      const data = await axios.get(
        `http://localhost:3000/dayduration?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (enddayofsearch && station) {
      console.log('inside day station ');
      const data = await axios.get(
        `http://localhost:3000/daystation?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&station=${station}`
      );
      setPageOfData(data.data);
    } else if (enddayofsearch && distance2) {
      console.log('inside day,distance');
      const data = await axios.get(
        `http://localhost:3000/daydistance?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}&distance1=${distance1}&distance2=${distance2}`
      );
      setPageOfData(data.data);
    } else if (duration2 && station) {
      console.log('insideduration2station ');
      const data = await axios.get(
        `http://localhost:3000/durationstation?month=${dataset}&station=${station}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (duration2 && distance2) {
      console.log('insideduration2distance');
      const data = await axios.get(
        `http://localhost:3000/durationdistance?month=${dataset}&distance1=${distance1}&distance2=${distance2}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (station && distance2) {
      console.log('inside distance station');
      const data = await axios.get(
        `http://localhost:3000/stationdistance?month=${dataset}&distance1=${distance1}&distance2=${distance2}&station=${station}`
      );
      setPageOfData(data.data);
    }
    //one case
    else if (enddayofsearch) {
      console.log('inside day');
      const data = await axios.get(
        `http://localhost:3000/onlyday?month=${dataset}&start=${startdayofsearch}&end=${enddayofsearch}`
      );
      setPageOfData(data.data);
      // const total = Math.trunc(data.data / 1000);
      // const emptyArray = [...Array(total).keys()];
      // console.log(emptyArray);
      // setArrayOfpages(emptyArray);
    } else if (duration2) {
      console.log('insideduration2');
      const data = await axios.get(
        `http://localhost:3000/onlyduration?month=${dataset}&duration1=${duration1}&duration2=${duration2}`
      );
      setPageOfData(data.data);
    } else if (station) {
      console.log('inside station');
      const data = await axios.get(
        `http://localhost:3000/onlystation?month=${dataset}&station=${station}`
      );
      setPageOfData(data.data);
    } else if (distance2) {
      console.log('inside distance');
      const data = await axios.get(
        `http://localhost:3000/onlydistance?month=${dataset}&distance1=${distance1}&distance2=${distance2}`
      );
      setPageOfData(data.data);
    } else if (sort) {
      console.log('inside sort');
      const data = await axios.get(
        `http://localhost:3000/onlysort?month=${dataset}&sort=${sort}`
      );
      setPageOfData(data.data);
    } else {
      const data = await axios.get(
        `http://localhost:3000/everytoursofthemonth?month=${dataset}`
      );
      setNumberOfRows(data.data);
      const total = Math.trunc(data.data / 1000);
      const emptyArray = [...Array(total).keys()];
      console.log(emptyArray);
      setArrayOfpages(emptyArray);
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
        `http://localhost:3000/sortedpage?page=${page}&month=${dataset}&sort=${sort}`
      );
      setPageOfData(pieceOfData.data);
    } else {
      let pieceOfData = await axios.get(
        `http://localhost:3000/page?page=${page}&month=${dataset}`
      );
      setPageOfData(pieceOfData.data);
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

  return (
    <div className="fetcher">
      {pageOfData ? (
        <div className="fetcher__data">
          <div className="fetcher__data--header">
            <div className="fetcher__data--header-1">departure station</div>
            <div className="fetcher__data--header-2">arrive station</div>
            <div className="fetcher__data--header-3">duration(minutes)</div>
            <div className="fetcher__data--header-4">distance</div>
            <div className="fetcher__data--header-5">day:{startDate}</div>
          </div>
          {pageOfData.map((x) => {
            return (
              <div className="fetcher__data-content">
                <div className="fetcher__data-depstation">
                  {x.departure_station}
                </div>
                <div className="fetcher__data-arrstation">
                  {x.return_station}
                </div>
                <div className="fetcher__data-duration">
                  {Math.round(x.duration / 60).toString()}
                </div>
                <div className="fetcher__data-distance">
                  {x.covered_distance}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>...LOADING</div>
      )}
      <h1 className="fetcher__pages-header">
        total number of queries in {dataset.toUpperCase()}: {numberOfRows}
      </h1>
      <div className="fetcher__pages">
        {numberOfRows
          ? arrayOfPages.map((x) => {
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
          : null}
      </div>
    </div>
  );
}

export default InitialFetch;
