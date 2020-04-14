import React from 'react';
import Ticket from './ticket';
import { uniqueId } from 'lodash';

export function ListTickets(props) {
  const { displayTickets, currencyExchange, currencyDisplayed } = props;

  return displayTickets.map((item) => {
    return (
      <Ticket
        key={uniqueId()}
        ticket={item}
        currencyExchange={currencyExchange}
        currencyDisplayed={currencyDisplayed}
      />
    );
  });
}
