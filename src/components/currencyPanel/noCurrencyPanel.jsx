import React from 'react';
import './noCurrencyPanel.scss';

export default function NoCurrencyPanel() {
  return (
    <div className="currency-panel__wrapper">
      <div className="currency-panel__heading">
        Текущий курс ЦБ :
        <br /> <span className="noData">НЕТ ДАННЫХ</span>
      </div>
      <div className="currency-panel__heading">Показать стоимость в другой валюте:</div>
      <div className="currency-panel__inputs-block">

        <div className="radiobox__container">
          <input type="radio" id="RUB" className="radiobox__input" checked disabled />
          <label htmlFor="RUB" className="radiobox__label first-child">
            RUB
          </label>
        </div>

        <div className="radiobox__container">
          <input type="radio" id="USD" className="radiobox__input" checked={false} disabled />
          <label htmlFor="USD" className="radiobox__label">
            USD
          </label>
        </div>

        <div className="radiobox__container">
          <input type="radio" id="EUR" className="radiobox__input" checked={false} disabled />
          <label htmlFor="EUR" className="radiobox__label last-child">
            EUR
          </label>
        </div>
      </div>
    </div>
  );
}
