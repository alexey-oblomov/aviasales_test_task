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

export function getCurrencyFromCB() {
  return axios.get(cbCurrencyUrl);
}
