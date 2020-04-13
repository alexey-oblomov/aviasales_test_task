import React from 'react';
import './app.css';
import Header from './components/header/header';
import FilterByStopstops from './components/filter_transfers/flter_transfers';
import MainWindow from './components/main_window/main_window';

import {
  getSearchId,
  getOnePackTickets,
  sortByPrice,
  sortByDuration,
  toggleClassBtnActive,
} from './utils/request';

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
  };

  componentDidMount() {
    this.processingAllTickets();
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
          console.log(
            'Стоп! Кончились билеты. Всего билетов получено: ',
            this.state.tickets.length
          );
        }
      }
    });
  };

  proccesingCurrenthPack = (tickets) => {
    const oldValue = this.state.tickets;
    console.log('Получаем пачку. Количество билетов: ', tickets.length);
    const newValue = [...oldValue, ...tickets];
    this.filterByStops();
    sortByPrice(newValue);
    this.setState({
      tickets: newValue,
    });
  };

  moveItemsToDisplayTickets = (array = this.state.tickets) => {
    const { numberOfDisplayed } = this.state;
    let newValue = [];
    for (let i = 0; i < numberOfDisplayed; i++) {
      newValue.push(array[i]);
    }
    this.setState({
      displayTickets: newValue,
    });
  };

  handleSortByPrice = (event) => {
    toggleClassBtnActive(event);
    const { tickets } = this.state;
    sortByPrice(tickets);
    this.filterByStops();
  };

  handleSortByDuration = (event) => {
    toggleClassBtnActive(event);
    const { tickets } = this.state;
    sortByDuration(tickets);
    this.filterByStops();
  };

  handleFilter = (event) => {
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
    this.setState({ stops: newStops });
  };

  stopFilter = () => {
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
    arrayForFilter = arrayForFilter.map((item) => stopsCount[item]);
    return arrayForFilter;
  };

  filterByStops = () => {
    const { tickets } = this.state;
    const checkArr = this.stopFilter();

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
    return;
  };

  render() {
    const { displayTickets, stops } = this.state;
    return (
      <div className="wrapper">
        <div className="app">
          <div className="header">
            <Header />
          </div>
          <div className="main">
            <div className="left-aside">
              <FilterByStopstops handleFilter={this.handleFilter} stopsData={stops} />
            </div>
            <div className="right-aside">
              <MainWindow
                displayTickets={displayTickets}
                handleSortByPrice={this.handleSortByPrice}
                handleSortByDuration={this.handleSortByDuration}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
