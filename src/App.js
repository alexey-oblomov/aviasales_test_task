import React from 'react';
import './app.css';
import Header from './components/header/header';
import FilterTransfers from './components/filter_transfers/flter_transfers';
import MainWindow from './components/main_window/main_window';
import { getSearchId, getOnePackTickets } from './utils/request';

class App extends React.Component {
  state = {
    tickets: [],
    displayTickets: [],
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
          console.log('Обычная обработка, кладем пачку в дисплей');
          this.moveItemsToDisplayTickets();
          this.getAllTickets(id);
        } else if (stop === true) {
          this.proccesingCurrenthPack(tickets);
          console.log('Последняя обработка, кладем пачку в дисплей');
          this.moveItemsToDisplayTickets();
          console.log('Стоп! Кончились билеты. ', stop);
          return;
        }
      }
    });
  };

  proccesingCurrenthPack = (tickets) => {
    const oldValue = this.state.tickets;
    console.log('Получаем пачку. Количество билетов: ', tickets.length);
    const newValue = [...oldValue, ...tickets];
    this.setState({
      tickets: newValue,
    });
  };

  moveItemsToDisplayTickets = () => {
    const currentTickets = this.state.tickets;
    let newValue = [];
    for (let i = 0; i < 15; i++) {
      newValue.push(currentTickets[i]);
    }
    this.setState({
      displayTickets: newValue,
    });
  };

  componentDidMount() {
    this.processingAllTickets();
  }

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
              <MainWindow displayTickets={displayTickets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
