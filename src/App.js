import React from 'react';
import './app.css';

import Grid from '@material-ui/core/Grid';
import Header from './components/header/header';
import FilterStops from './components/filterStops/flterStopsPanel';
import NumberOfTicketsPanel from './components/numberOfTicketsPanel/numberOfTicketsPanel';
import SortingPanel from './components/sortingPanel/sortingPanel';
import ListTickets from './components/listTickets/listTickets';
import CurrencyPanel from './components/currencyPanel/currencyPanel';
import NoCurrencyPanel from './components/currencyPanel/noCurrencyPanel';
import { getSearchId, getOnePackTickets, getCurrencyFromCB } from './utils/utils';

class App extends React.Component {
  state = {
    tickets: [],
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
    numberOfFailure: 0,
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
    let { numberOfFailure } = this.state;
    if (!id) {
      if (numberOfFailure === 5) {
        return;
      } else {
        numberOfFailure += 1;
        this.setState(
          {
            numberOfFailure,
          },
          () => {
            console.log('Попытка получить id номер', numberOfFailure, 'Cервер не отвечает');
            this.getAllTickets(id);
          }
        );
      }
      return;
    } else {
      if (numberOfFailure <= 10) {
        getOnePackTickets(id).then((response) => {
          if (!response) {
            numberOfFailure += 1;
            this.setState(
              {
                numberOfFailure,
              },
              () => {
                console.log('Попытка номер ', numberOfFailure);
                this.getAllTickets(id);
              }
            );
          } else {
            const { stop, tickets } = response;
            if (stop === false) {
              this.proccesingCurrenthPack(tickets);
              this.getAllTickets(id);
            } else if (stop === true) {
              this.proccesingCurrenthPack(tickets);
            }
          }
        });
      } else {
        console.log('Превышено количество попыток получения билетов');
        return;
      }
    }
  };

  proccesingCurrenthPack = (newPackTickets) => {
    const { tickets } = this.state;
    this.setState({
      tickets: [...tickets, ...newPackTickets],
    });
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
    this.setState({
      numberOfDisplayed: id,
    });
  };

  handleChangeCurrency = (event) => {
    const id = event.currentTarget.id;
    this.setState({
      currencyDisplayed: id,
    });
  };

  handleChangeSort = (event) => {
    const id = event.currentTarget.id;
    this.setState({
      sortBy: id,
    });
  };

  handleChangeFilterStops = (event) => {
    const theStop = event.currentTarget.id;
    const { stops } = this.state;
    const { all, noStops, oneStop, twoStops, threeStops } = stops;

    const stopsStateChange = (theStop) => {
      if (theStop === 'all' && all === false) {
        return {
          all: true,
          noStops: true,
          oneStop: true,
          twoStops: true,
          threeStops: true,
        };
      }

      if (theStop === 'all' && all === true) {
        return {
          all: false,
          noStops: false,
          oneStop: false,
          twoStops: false,
          threeStops: false,
        };
      }

      const stopsStatus = {
        noStops: { ...stops, noStops: !noStops, all: false },
        oneStop: { ...stops, oneStop: !oneStop, all: false },
        twoStops: { ...stops, twoStops: !twoStops, all: false },
        threeStops: { ...stops, threeStops: !threeStops, all: false },
        all: {
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

    // if (
    //   newStops.all === false &&
    //   newStops.noStops === true &&
    //   newStops.oneStop === true &&
    //   newStops.twoStops === true &&
    //   newStops.threeStops === true
    // ) {
    //   newStops = {
    //     all: true,
    //     noStops: true,
    //     oneStop: true,
    //     twoStops: true,
    //     threeStops: true,
    //   };
    // }
    this.setState({ stops: newStops });
  };

  render() {
    const {
      tickets,
      stops,
      sortBy,
      numberOfDisplayed,
      currencyData,
      currencyDisplayed,
    } = this.state;
    const numberOfTickets = tickets.length;

    const listTicketsProps = {
      tickets,
      stops,
      sortBy,
      numberOfDisplayed,
      currencyData,
      currencyDisplayed,
    };

    const currencyPanel = currencyData.date ? (
      <CurrencyPanel
        currencyData={currencyData}
        currencyDisplayed={currencyDisplayed}
        handleChangeCurrency={this.handleChangeCurrency}
      />
    ) : (
      <NoCurrencyPanel />
    );

    return (
      <div className="app">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <div className="header">
              <Header />
            </div>
          </Grid>

          {/* <div className="main"> */}
          <Grid item xs={12} sm={6} className="main">
            <div className="left-aside">
              <FilterStops
                handleChangeFilterStops={this.handleChangeFilterStops}
                stopsData={stops}
              />
              <NumberOfTicketsPanel
                handleChange={this.handleChangeNumberOfDisplated}
                numberOfDisplayed={numberOfDisplayed}
                numberOfTickets={numberOfTickets}
              />
              {currencyPanel}
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="right-aside">
              <SortingPanel sortBy={sortBy} handleChange={this.handleChangeSort} />
              <ListTickets {...listTicketsProps} />
            </div>
          </Grid>
        </Grid>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
