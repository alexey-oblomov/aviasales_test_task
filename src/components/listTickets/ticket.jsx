import React from 'react';
import PropTypes from 'prop-types';
import './ticket.css';

export default function Ticket(props) {
  const { ticket, currencyData, currencyDisplayed } = props;
  const { carrier, segments } = ticket;
  let { price } = ticket;
  const { usd, eur } = currencyData;
  const carrierUrl = `http://pics.avs.io/99/36/${carrier}.png`;
  const segmentForward = segments[0];
  const {
    origin: originForward,
    destination: destinationForward,
    duration: durationForward,
    stops: stopsForward,
  } = segmentForward;
  const segmentBack = segments[1];
  const {
    origin: originBack,
    destination: destinationBack,
    duration: durationBack,
    stops: stopsBack,
  } = segmentBack;

  if (currencyDisplayed === 'USD') {
    price = Math.round(price / usd);
  } else if (currencyDisplayed === 'EUR') {
    price = Math.round(price / eur);
  }

  function displayCurrencySymbol(currency) {
    const StopNumber = {
      RUB: 'Р',
      USD: '$',
      EUR: '€',
    };
    for (let key in StopNumber) {
      if (key === currency) {
        return StopNumber[key];
      }
    }
  }

  function displayPrice(price) {
    let string = price.toString();
    const length = string.length;
    if (length > 3) {
      string.split('');
      const idx = length - 1 - 3;
      const firstItems = string.slice(price[0], idx + 1);
      const lastItems = string.slice(idx + 1, length + 1);
      string = firstItems + ' ' + lastItems;
      return string;
    }
    return string;
  }

  function getStopsNumber(stops) {
    const StopNumber = {
      1: '1 пересадка',
      2: '2 пересадки',
      3: '3 пересадки',
      0: 'без пересадок',
    };
    for (let key in StopNumber) {
      if (Number(key) === stops) {
        return StopNumber[key];
      }
    }
  }

  function displayTime(time) {
    const hour = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hour}ч ${minutes}м `;
  }

  const viewTimeForward = displayTime(durationForward);
  const viewTimeBack = displayTime(durationBack);
  const viewPrice = displayPrice(price);
  const viewCurrency = displayCurrencySymbol(currencyDisplayed);
  const viewStopsForward = getStopsNumber(stopsForward.length);
  const viewStopsBack = getStopsNumber(stopsBack.length);

  return (
    <div className="ticket-wrapper">
      <div className="ticket-header">
        <div className="ticket-header__price">
          {viewPrice} {viewCurrency}
        </div>
        <div className="ticket-header__logo">
          <img src={carrierUrl} alt=""></img>
        </div>
      </div>

      <div className="ticked-forward__container">
        <div className="ticket-forward__header">
          <div className="ticket-forward__header-route">
            <span className="ticket-forward__header-route--span">
              {originForward} - {destinationForward}
            </span>
          </div>
          <div className="ticket-forward__header-length">
            <span className="ticket-forward__header-length--span">В пути</span>
          </div>
          <div className="ticket-forward__header-stops">
            <span className="ticket-forward__header-stops--span">{viewStopsForward}</span>
          </div>
        </div>
        <div className="ticket-forward__value">
          <div className="ticket-forward__value-route">
            <span className="ticket-forward__value-route--span">10:45-18:00</span>
          </div>
          <div className="ticket-forward__value-length">
            <span className="ticket-forward__value-length--span">{viewTimeForward}</span>
          </div>
          <div className="ticket-forward__value-stops">
            <span className="ticket-forward__value-stops--span">{stopsForward.join(' ')}</span>
          </div>
        </div>
      </div>

      <div className="ticked-back-container">
        <div className="ticket-back__header">
          <div className="ticket-back__header-route">
            <span className="ticket-back__header-route--span">
              {destinationBack} - {originBack}
            </span>
          </div>
          <div className="ticket-back__header-length">
            <span className="ticket-back__header-length--span">В пути</span>
          </div>
          <div className="ticket-back__header-stops">
            <span className="ticket-back__header-stops--span">{viewStopsBack}</span>
          </div>
        </div>
        <div className="ticket-back__value">
          <div className="ticket-back__value-route">
            <span className="ticket-back__value-route--span">10:45-18:00</span>
          </div>
          <div className="ticket-back__value-length">
            <span className="ticket-back__value-length--span">{viewTimeBack}</span>
          </div>
          <div className="ticket-back__value-stops">
            <span className="ticket-back__value-stops--span">{stopsBack.join(' ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.object,
  currencyData: PropTypes.object,
  currencyDisplayed: PropTypes.string,
};
