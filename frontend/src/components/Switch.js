import React from 'react';

//Switch.js simply passes props to parent App.js and decide which "route" to go for
const Switch = ({ initialchoice }) => {
 
  const onStarting = (e) => {
    initialchoice(e.target.id);
  };
  return (
    <div className="switchcontainer">
      <div id="sort" onClick={onStarting} className="switchcontainer_sort">
        Journeys
      </div>
      <div
        id="singlestation"
        onClick={onStarting}
        className="switchcontainer_station">
        Single Station View
      </div>
    </div>
  );
};
export default Switch;
