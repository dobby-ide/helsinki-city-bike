import './App.css';
import { useEffect, useState } from 'react';
import SortChoice from './components/SortChoice';
import Switch from './components/Switch';
function App() {
  const [initalChoice, setInitialChoice] = useState();
  const [chosenSort, setChosenSort] = useState('');
  const initialchoice = (e) => {
    console.log(e);
    setInitialChoice(e);
  };
  //choose what to be passed to SortChoice
  const userchoice = (sortby) => {
    if (sortby === 'distance') {
      setChosenSort('covered_distance');
    } else {
      setChosenSort(sortby);
    }
  };
  return (
    <div className="App">
      <Switch initialchoice={initialchoice}></Switch>
      {initalChoice === 'sort' ? (
        <SortChoice userChoices={userchoice}></SortChoice>
      ) : null}
    </div>
  );
}

export default App;
