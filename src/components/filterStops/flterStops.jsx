import React from 'react';
import './filterStops.css';

export default function FilterStops(props) {
  const { handleFilter, stopsData } = props;
  return (
    <form className="form-checkbox">
      <div className="inputs-block">
        <div className="checkbox-heading">Количество пересадок</div>

        <div className="checkbox">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="all"
              onChange={handleFilter}
              checked={stopsData.all}
            />
            <span className="checkbox__box"></span>
            Все
          </label>
        </div>

        <div className="checkbox">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="noStops"
              onChange={handleFilter}
              checked={stopsData.noStops}
            />
            <span className="checkbox__box"></span>
            Без пересадок
          </label>
        </div>

        <div className="checkbox">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="oneStop"
              onChange={handleFilter}
              checked={stopsData.oneStop}
            />
            <span className="checkbox__box"></span>1 пересадка
          </label>
        </div>

        <div className="checkbox">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="twoStops"
              onChange={handleFilter}
              checked={stopsData.twoStops}
            />
            <span className="checkbox__box"></span>2 пересадки
          </label>
        </div>

        <div className="checkbox">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="threeStops"
              onChange={handleFilter}
              checked={stopsData.threeStops}
            />
            <span className="checkbox__box"></span>3 пересадки
          </label>
        </div>
      </div>
    </form>
  );
}
