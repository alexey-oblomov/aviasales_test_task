import React from 'react';
import PropTypes from 'prop-types';
import './currencyPanel.css';
import { viewDate } from '../../utils/utils';
export default function CurrencyPanel(props) {
  const { currencyData, currencyDisplayed, handleChangeCurrency } = props;
  const { date, usd, eur } = currencyData;

  const displayDate = viewDate(new Date(date));
  const roundUsd = Number(usd).toFixed(2);
  const roundEur = Number(eur).toFixed(2);

  return (
    <div className="currencyPanel-wrapper">
      <div className="currencyPanel-heading">
        Курс ЦБ по состоянию на:
        <br /> {displayDate}
      </div>
      <div className="currencyPanel-text">USD: {roundUsd}</div>
      <div className="currencyPanel-text">EUR: {roundEur}</div>
      <div className="currencyPanel-heading">Показать стоимость в другой валюте:</div>
      <div className="currencyPanel__inputs-block">
        <div className="radiobox">
          <input
            type="radio"
            id="RUB"
            className="radiobox__input"
            onChange={handleChangeCurrency}
            checked={currencyDisplayed === 'RUB'}
          />
          <label htmlFor="RUB" className="radiobox__label first-child">
            RUB
          </label>
        </div>

        <div className="radiobox">
          <input
            type="radio"
            id="USD"
            className="radiobox__input"
            onChange={handleChangeCurrency}
            checked={currencyDisplayed === 'USD'}
          />
          <label htmlFor="USD" className="radiobox__label">
            USD
          </label>
        </div>

        <div className="radiobox">
          <input
            type="radio"
            id="EUR"
            className="radiobox__input"
            onChange={handleChangeCurrency}
            checked={currencyDisplayed === 'EUR'}
          />
          <label htmlFor="EUR" className="radiobox__label last-child">
            EUR
          </label>
        </div>
      </div>
    </div>
  );
}

CurrencyPanel.propTypes = {
  currencyData: PropTypes.object,
  currencyDisplayed: PropTypes.string,
  handleChangeCurrency: PropTypes.func,
};
