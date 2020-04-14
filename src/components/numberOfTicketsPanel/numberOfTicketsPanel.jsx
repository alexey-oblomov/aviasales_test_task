import React from 'react';
import './numberOfTicketsPanel.css';

export default function NumberOfTicketsPanel(props) {
  const { handleChange, numberOfDisplayed } = props;
  return (
    <div className="number-panel-wrapper">
      <h1 className="title">Количество билетов для показа: </h1>

      <div className="number-panel__inputs-block">
        <div className="radiobox">
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

        <div className="radiobox">
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

        <div className="radiobox">
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

        <div className="radiobox">
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
