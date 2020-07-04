import React from 'react';
import PropTypes from 'prop-types';
import Ticket from './ticket';
import NoTickets from './noTickets';
import { uniqueId } from 'lodash';

function sortByDuration(array) {
  const result = array.sort(function (ticketA, ticketB) {
    const durationA = ticketA['segments'][0]['duration'] + ticketA['segments'][1]['duration'],
      durationB = ticketB['segments'][0]['duration'] + ticketB['segments'][1]['duration'];
    if (durationA < durationB) {
      return -1;
    } else if (durationA > durationB) {
      return 1;
    }
    return 0;
  });
  return result;
}

function sortByPrice(array) {
  const result = array.sort(function (ticketA, ticketB) {
    const priceA = ticketA['price'],
      priceB = ticketB['price'];
    if (priceA < priceB) {
      return -1;
    } else if (priceA > priceB) {
      return 1;
    }
    return 0;
  });
  return result;
}

function sortTickets(array, sortBy) {
  if (sortBy === 'cost') {
    sortByPrice(array);
  } else {
    sortByDuration(array);
  }
}

const filterByStops = (arrayTickets, arrayStops) => {
  const getArrayStopsFilter = (currentStopsState) => {
    let arrayForFilter = [];
    for (let key in currentStopsState) {
      if (currentStopsState[key] === true) {
        arrayForFilter = [...arrayForFilter, key];
      }
    }
    const stopsCount = {
      noStops: 0,
      oneStop: 1,
      twoStops: 2,
      threeStops: 3,
    };
    return arrayForFilter.map((item) => stopsCount[item]);
  };

  const checkArr = getArrayStopsFilter(arrayStops);
  function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === elem) {
        return true;
      }
    }
    return false;
  }
  return arrayTickets.filter((item) => contains(checkArr, item['segments'][0].stops.length));
};

function displayedTickets(array, numberOfDisplayed) {
  return array.slice(0, numberOfDisplayed);
}

export default function ListTickets(props) {
  const { tickets, stops, sortBy, numberOfDisplayed, currencyData, currencyDisplayed } = props;

  sortTickets(tickets, sortBy);
  const fiteredTickets =  filterByStops(tickets, stops);
  const displayTickets = displayedTickets(fiteredTickets, numberOfDisplayed);

  let listTickets;
  if (displayTickets.length !== 0) {
    listTickets = displayTickets.map((item) => {
      return (
        <Ticket
          key={uniqueId()}
          ticket={item}
          currencyData={currencyData}
          currencyDisplayed={currencyDisplayed}
        />
      );
    });
  } else {
    listTickets = <NoTickets />;
  }

  return <>{listTickets}</>;
}

ListTickets.proTypes = {
  displayTickets: PropTypes.array,
  currencyData: PropTypes.object,
  currencyDisplayed: PropTypes.string,
};
