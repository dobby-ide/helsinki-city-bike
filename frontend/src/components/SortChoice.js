import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
//Choice.js takes care of what datasets to be displayed (May, June or July) through a select field
//it is also used to get user inputs about filters or sorting the database queries
const SortChoice = ({ userChoices }) => {
  let datasets = ['may', 'june', 'july'];
  let sortby = ['distance', 'duration'];



  const [month, setMonth] = useState('');
  const [sort, setSort] = useState('');

   const selectingMonth = (e) => {
    setMonth(e.target.value);
  };
  const selectingSortBy = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <div>
        month (mandatory)
        <select onChange={selectingMonth}>
          <option></option>

          {datasets.map((month) => {
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>
      </div></div>
      )}
      export default SortChoice;