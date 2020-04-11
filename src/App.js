import React from 'react';
import './app.css';
import Header from './components/header/header';
import FilterTransfers from './components/filter_transfers/flter_transfers';
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
    numberOfDisplayed: 50,
    filterStops: [1, 2],
  };

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
          this.filterStops();
          console.log(
            'Стоп! Кончились билеты. Всего билетов получено: ',
            this.state.tickets.length
          );
          return;
        }
      }
    });
  };

  proccesingCurrenthPack = (tickets) => {
    const oldValue = this.state.tickets;
    console.log('Получаем пачку. Количество билетов: ', tickets.length);
    const newValue = [...oldValue, ...tickets];
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
    this.filterStops();
  };

  handleSortByDuration = (event) => {
    toggleClassBtnActive(event);
    const { tickets } = this.state;
    sortByDuration(tickets);
    this.filterStops();
  };

  componentDidMount() {
    this.processingAllTickets();
  }

  filterStops = () => {
    console.log('Запускаем фильтр');
    const { tickets, filterStops } = this.state;
    let result = [];
    for (let i = 0; i < filterStops.length; i += 1) {
      result = result.concat(tickets.filter((item) => item['segments'][0]['stops'].length === filterStops[i]));
    }
    this.moveItemsToDisplayTickets(result);
    return;
  };

  render() {
    const { displayTickets } = this.state;

    return (
      <div className="wrapper">
        <div className="app">
          <div className="header">
            <Header />
          </div>
          <div className="main">
            <div className="left-aside">
              <FilterTransfers />
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
