import React from 'react';
import './app.css';
import Header from './components/header/header';
import FilterStops from './components/filterStops/flterStops';
import NumberOfTicketsPanel from './components/numberOfTicketsPanel/numberOfTicketsPanel';
import SortingPanel from './components/sortingPanel/sortingPanel';
import ListTickets from './components/listTickets/listTickets';
import NoTickets from './components/listTickets/noTickets';
import CurrencyPanel from './components/currencyPanel/currencyPanel';
import {
  getSearchId,
  getOnePackTickets,
  sortByPrice,
  sortByDuration,
  getCurrencyFromCB,
} from './utils/utils';

class App extends React.Component {
  state = {
    tickets: [],
    displayTickets: [],
    numberOfDisplayed: 5,
    stops: {
      all: true,
      noStops: true,
      oneStop: true,
      twoStops: true,
      threeStops: true,
    },
    sortBy: 'cost',
    currencyData: {},
    currencyDisplayed: 'RUB',
  };

  componentDidMount() {
    this.processingAllTickets();
    this.getCurrency();
  }

  processingAllTickets = () => {
    getSearchId().then((id) => {
      this.getAllTickets(id);
    });
  };

  getAllTickets = (id) => {
    getOnePackTickets(id).then((response) => {
      if (!response) {
        this.getAllTickets(id);
      } else {
        const { stop, tickets } = response;
        if (stop === false) {
          this.proccesingCurrenthPack(tickets);
          this.moveItemsToDisplayTickets();
          this.getAllTickets(id);
        } else if (stop === true) {
          this.proccesingCurrenthPack(tickets);
        }
      }
    });
  };

  proccesingCurrenthPack = (newPackTickets) => {
    const { tickets } = this.state;
    this.setState(
      {
        tickets: [...tickets, ...newPackTickets],
      },
      () => this.updateTickets()
    );
  };

  getCurrency = () => {
    getCurrencyFromCB().then((response) => {
      const currencyDate = response.data.Date;
      const usd = response.data.Valute.USD.Value;
      const eur = response.data.Valute.EUR.Value;
      const currencyData = { date: currencyDate, usd, eur };
      this.setState({
        currencyData,
      });
    });
  };

  handleChangeNumberOfDisplated = (event) => {
    const id = Number(event.currentTarget.id);
    this.setState(
      {
        numberOfDisplayed: id,
      },
      () => {
        this.updateTickets();
      }
    );
  };

  handleChangeCurrency = (event) => {
    const id = event.currentTarget.id;
    this.setState(
      {
        currencyDisplayed: id,
      },
      () => {
        this.updateTickets();
      }
    );
  };

  handleChangeSort = (event) => {
    const id = event.currentTarget.id;
    this.setState(
      {
        sortBy: id,
      },
      () => this.sortTickets()
    );
  };

  sortTickets = () => {
    const { tickets, sortBy } = this.state;
    if (sortBy === 'cost') {
      sortByPrice(tickets);
    } else {
      sortByDuration(tickets);
    }
    this.filterByStops();
  };

  updateTickets = () => {
    this.sortTickets();
    this.filterByStops();
  };

  handleChangeFilterStops = (event) => {
    const theStop = event.currentTarget.id;
    const { stops } = this.state;
    const { all, noStops, oneStop, twoStops, threeStops } = stops;

    const stopsStateChange = (theStop) => {
      if (theStop === 'all' && all === false) {
        return {
          ...stops,
          all: true,
          noStops: true,
          oneStop: true,
          twoStops: true,
          threeStops: true,
        };
      }
      const stopsStatus = {
        noStops: { ...stops, noStops: !noStops, all: false },
        oneStop: { ...stops, oneStop: !oneStop, all: false },
        twoStops: { ...stops, twoStops: !twoStops, all: false },
        threeStops: { ...stops, threeStops: !threeStops, all: false },
        all: {
          ...stops,
          all: false,
          noStops: false,
          oneStop: false,
          twoStops: false,
          threeStops: false,
        },
      };
      for (let key in stopsStatus) {
        if (key === theStop) {
          return stopsStatus[key];
        }
      }
    };

    let newStops = stopsStateChange(theStop);

    if (
      newStops.all === false &&
      newStops.noStops === true &&
      newStops.oneStop === true &&
      newStops.twoStops === true &&
      newStops.threeStops === true
    ) {
      newStops = {
        ...stops,
        all: true,
        noStops: true,
        oneStop: true,
        twoStops: true,
        threeStops: true,
      };
    }
    this.setState({ stops: newStops }, () => this.updateTickets());
  };

  getArrayStopsFilter = () => {
    let arrayForFilter = [];
    const currentStopsState = this.state.stops;
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

  filterByStops = () => {
    const { tickets } = this.state;
    const checkArr = this.getArrayStopsFilter();
    function contains(arr, elem) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
          return true;
        }
      }
      return false;
    }
    const result = tickets.filter((item) => contains(checkArr, item['segments'][0].stops.length));
    this.moveItemsToDisplayTickets(result);
  };

  moveItemsToDisplayTickets = (array = this.state.tickets) => {
    const { numberOfDisplayed } = this.state;
    let newValue = [];
    for (let i = 0; i < numberOfDisplayed; i++) {
      if (array[i]) {
        newValue.push(array[i]);
      }
    }
    this.setState({
      displayTickets: newValue,
    });
  };

  render() {
    const {
      tickets,
      displayTickets,
      stops,
      sortBy,
      numberOfDisplayed,
      currencyData,
      currencyDisplayed,
    } = this.state;
    const totalTickets = tickets.length;

    const listTickets = displayTickets.length ? (
      <ListTickets
        displayTickets={displayTickets}
        currencyData={currencyData}
        currencyDisplayed={currencyDisplayed}
      />
    ) : (
      <NoTickets />
    );

    return (
      <div className="app">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <div className="left-aside">
            <FilterStops handleChangeFilterStops={this.handleChangeFilterStops} stopsData={stops} />
            <NumberOfTicketsPanel
              handleChange={this.handleChangeNumberOfDisplated}
              numberOfDisplayed={numberOfDisplayed}
              totalTickets={totalTickets}
            />
            <CurrencyPanel
              currencyData={currencyData}
              currencyDisplayed={currencyDisplayed}
              handleChangeCurrency={this.handleChangeCurrency}
            />
          </div>
          <div className="right-aside">
            <SortingPanel sortBy={sortBy} handleChange={this.handleChangeSort} />
            {listTickets}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
