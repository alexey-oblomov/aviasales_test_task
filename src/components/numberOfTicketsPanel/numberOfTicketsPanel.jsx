import React from 'react';
import PropTypes from 'prop-types';
import './numberOfTicketsPanel.scss';

export default function NumberOfTicketsPanel(props) {
  const { handleChange, numberOfDisplayed, totalTickets } = props;
  return (
    <div className="number-panel__wrapper">
      <h1 className="number-panel__heading">Всего получено и обработано билетов:</h1>
      <span className="number-panel__text">{totalTickets}</span>

      <h1 className="number-panel__heading">Количество билетов для показа: </h1>

      <div className="number-panel__inputs-block">
        <div className="radiobox__container">
          <input
            type="radio"
            name="numberOfTickets"
            id="5"
            className="radiobox__input"
            onChange={handleChange}
            checked={numberOfDisplayed === 5}
          />
          <label htmlFor="5" className="radiobox__label first-child">
            5
          </label>
        </div>

        <div className="radiobox__container">
          <input
            type="radio"
            name="numberOfTickets"
            id="10"
            className="radiobox__input"
            onChange={handleChange}
            checked={numberOfDisplayed === 10}
          />
          <label htmlFor="10" className="radiobox__label">
            10
          </label>
        </div>

        <div className="radiobox__container">
          <input
            type="radio"
            name="numberOfTickets"
            id="15"
            className="radiobox__input"
            onChange={handleChange}
            checked={numberOfDisplayed === 15}
          />
          <label htmlFor="15" className="radiobox__label">
            15
          </label>
        </div>

        <div className="radiobox__container">
          <input
            type="radio"
            name="numberOfTickets"
            id="50"
            className="radiobox__input"
            onChange={handleChange}
            checked={numberOfDisplayed === 50}
          />
          <label htmlFor="50" className="radiobox__label last-child">
            50
          </label>
        </div>
      </div>
    </div>
  );
}

NumberOfTicketsPanel.propTypes = {
  handleChange: PropTypes.func,
  numberOfDisplayed: PropTypes.number,
  totalTickets: PropTypes.number,
};
