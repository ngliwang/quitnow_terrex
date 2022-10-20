import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';


// const datesToAddClassTo = [tomorrow, dayAfterTomorrow];

// const dateArray = { '2022-09-19': 'red', '2022-09-20': 'green', '2022-09-21': 'yellow' };

// function clickedDay(value, event) {

//   // convert date to string
//   const date = format(value, 'yyyy-MM-dd');

//   // if date not in dateArray
//   if (!(date in dateArray)) {
//     // add date to dateArray
//     dateArray[date] = 'red';
//   }
//   // change color of date in DateArray
//   if (dateArray[date] === 'red') {
//     dateArray[date] = 'green';
//   }
//   else if (dateArray[date] === 'green') {
//     dateArray[date] = 'yellow';
//   }
//   else {
//     dateArray[date] = 'red';
//   }
//   console.log(dateArray);
// }


function CalendarComp() {

  

  // react state to manage days update on calendar
  const [date, setDate] = useState(new Date())

  return (
    <Calendar
      onClickDay={(value, event) => {
        // self-define function to handle click event
        // and set the state of date
        clickedDay(value, event);
        setDate(value);
      }
      }

      // dateArray is a dictionary with date as key and color as value
      // dateArray = {'2022-09-19':'red', '2022-09-20':'green', '2022-09-21':'yellow'};
      // retrieve from database supposingly
      // changes class names of the date tile
      tileClassName={({ date, view }) => {
        // date will return every date visible on calendar and view will view type (eg. month)
        //  if selected date is in dateArray then return 'selected-date' class
        // convert javascript date object to string using date-fns
        var testDate = format(date, 'yyyy-MM-dd');

        // if date is in dateArray
        // render its class with color accordingly
        if (testDate in dateArray) {
          return `react-calendar__tile--${dateArray[testDate]}`; // your class name
        }}} />
  );
}

export default CalendarComp;