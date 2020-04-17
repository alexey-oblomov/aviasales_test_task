import axios from 'axios';
import { getSearchIdUrl as baseUrlSearchId } from './paths.js';
import { getTicketsUrl as baseUrlForTickets } from './paths.js';
import { cbCurrencyUrl } from './paths.js';

export const getSearchId = () => {
  const id = axios
    .get(baseUrlSearchId)
    .then((response) => {
      return response.data.searchId;
    })
    .catch((error) => {
      console.log(error);
    });
  return id;
};

export const getOnePackTickets = (id) => {
  const getTicketsUrl = baseUrlForTickets + id;
  let response = axios
    .get(getTicketsUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      getOnePackTickets(id);
    });

  return response;
};

export function sortByPrice(array) {
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

export function sortByDuration(array) {
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

export function getCurrencyFromCB() {
  return axios.get(cbCurrencyUrl);
}

export const displayCurrencySymbol = (currency) => {
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
};

export const displayPrice = (price) => {
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
};

export const getStopsNumber = (stops) => {
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
};

export function displayTime(time) {
  const hour = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hour}ч ${minutes}м `;
}

export function viewDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const arr = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Ноябрь',
    'Декабрь',
  ];
  return day + ' ' + arr[month] + ' ' + year;
}
