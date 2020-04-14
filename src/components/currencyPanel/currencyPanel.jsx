import React from 'react';
import './currencyPanel.css';

export default function CurrencyPanel(props) {
  const { currencyExchange, currencyDisplayed, handleChangeCurrency } = props;
  const { date, usd, eur } = currencyExchange;

  function viewDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
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
    const result = hours + ':' + minutes + ' ' + day + ' ' + arr[month] + ' ' + year;
    return result;
  }

  const date1 = new Date(date);
  const displayDate = viewDate(date1);
  return (
    <div className="currencyPanel-wrapper">
      <span className="currencyPanel-heading">Курс ЦБ по состоянию на: {displayDate}</span>
      <span className="currencyPanel-text">USD: {usd}</span>
      <span className="currencyPanel-text">EUR: {eur}</span>
      <span className="currencyPanel-heading">Показать стоимость в другой валюте:</span>
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
