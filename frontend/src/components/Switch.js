import React from 'react';
import { useState } from 'react';
//Switch.js simply passes props to parent App.js and deceide which "route" to go for
const Switch = ({ initialchoice }) => {
  const [journeySearch, setJourneySearch] = useState(false);
  const onStarting = (e) => {
    if (e.target.id === 'journey') {
      setJourneySearch(true);
    } else {
      initialchoice(e.target.id);
    }
  };
  return (
    <div>
      <div id="journey" onClick={onStarting}>
        Journeys
      </div>
      <div id="stationlist" onClick={onStarting}>
        Station List
      </div>
      <div id="singlestation" onClick={onStarting}>
        Single Station View
      </div>
      {journeySearch ? (
        <div>
          <div id="filter" onClick={onStarting}>
            filter
          </div>
          <div id="sort" onClick={onStarting}>
            sort
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Switch;
