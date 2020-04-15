import React from 'react';
import PropTypes from 'prop-types';
import Ticket from './ticket';
import { uniqueId } from 'lodash';

export default function ListTickets(props) {
  const { displayTickets, currencyData, currencyDisplayed } = props;

  return displayTickets.map((item) => {
    return (
      <Ticket
        key={uniqueId()}
        ticket={item}
        currencyData={currencyData}
        currencyDisplayed={currencyDisplayed}
      />
    );
  });
}

ListTickets.proTypes = {
  displayTickets: PropTypes.array,
  currencyData: PropTypes.object,
  currencyDisplayed: PropTypes.string,
};
