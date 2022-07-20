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
  }, [dataset]);
  //using axios to query the server: get the total numbers of tours only and then divide them to have pagination in numbers
  const getNumberOfRows = async () => {
    //writing some crazy logic here to match all the possible filter/sort possibilities for the user query

    //all the cases(5)
    if (sort && enddayofsearch && distance2 && station && duration2) {
      console.log('it works &&');
      const data = await axios.get(
        `http://localhost:3000/sortedpagewithdays?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}`
      );
      setPageOfData(data.data);
    }

    //4 cases
    else if (sort && enddayofsearch && duration2 && station) {
      console.log('inside sort,day duration station');
    } else if (sort && enddayofsearch && distance2 && duration2) {
      console.log('inside sort,dayduration2distance');
    } else if (sort && enddayofsearch && station && distance2) {
      console.log('inside sort,day,distance station');
    } else if (sort && duration2 && station && distance2) {
      console.log('inside sortduration2station distance');
    }
    //3 cases
    else if (sort && enddayofsearch && duration2) {
      console.log('inside sort,dayduration2');
    } else if (sort && enddayofsearch && station) {
      console.log('inside sort,day station ');
    } else if (sort && enddayofsearch && distance2) {
      console.log('inside sort,day,distance');
    } else if (sort && duration2 && station) {
      console.log('inside sortduration2station ');
    } else if (sort && duration2 && distance2) {
      console.log('inside sortduration2 distance');
    } else if (sort && station && 'distance') {
      console.log('inside sort station distance');
    } else if (enddayofsearch && duration2 && station) {
      console.log('dayduration2station ');
    } else if (enddayofsearch && duration2 && distance2) {
      console.log('dayduration2distance');
    } else if (enddayofsearch && station && distance2) {
      console.log('inside day station distance');
    } else if (duration2 && station && distance2) {
      console.log('duration2station distance');
    }
    //two cases
    else if (sort && enddayofsearch) {
      console.log('inside sort,day');
    } else if (sort && duration2) {
      console.log('inside sortduration2');
    } else if (sort && station) {
      console.log('inside sort station ');
    } else if (sort && distance2) {
      console.log('inside sort,distance');
    } else if (enddayofsearch && duration2) {
      console.log('inside dayduration2');
    } else if (enddayofsearch && station) {
      console.log('inside day station ');
    } else if (enddayofsearch && distance2) {
      console.log('inside day,distance');
    } else if (duration2 && station) {
      console.log('insideduration2station ');
    } else if (duration2 && distance2) {
      console.log('insideduration2distance');
    } else if (station && distance2) {
      console.log('inside distance station');
    }
    //one case
    else if (enddayofsearch) {
      console.log('inside day');
      const data = await axios.get(
        `http://localhost:3000/sortedpagewithdays?month=${dataset}&sort=${sort}&start=${startdayofsearch}&end=${enddayofsearch}`
      );
      setPageOfData(data.data);
      // const total = Math.trunc(data.data / 1000);
      // const emptyArray = [...Array(total).keys()];
      // console.log(emptyArray);
      // setArrayOfpages(emptyArray);
    } else if (duration2) {
      console.log('insideduration2');
    } else if ('station') {
      console.log('inside station');
    } else if (distance2) {
      console.log('inside distance');
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
