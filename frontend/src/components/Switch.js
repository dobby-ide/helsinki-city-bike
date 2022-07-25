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
    <div className="switchcontainer">
      <div id="sort" onClick={onStarting}>
        Journeys
      </div>

      <div id="singlestation" onClick={onStarting}>
        Single Station View
      </div>
    </div>
  );
};
export default Switch;
