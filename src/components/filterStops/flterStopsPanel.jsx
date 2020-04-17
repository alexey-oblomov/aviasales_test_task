import React from 'react';
import PropTypes from 'prop-types';
import './filterStopsPanel.scss';

export default function FilterStops(props) {
  const { handleChangeFilterStops, stopsData } = props;
  return (
    <div className="filter-stops-panel__wrapper">
      <div className="filter-stops-panel__heading">Количество пересадок</div>
      <div className="filter-stops-panel__inputs-block">

        <div className="checkbox__container">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="all"
              onChange={handleChangeFilterStops}
              checked={stopsData.all}
            />
            <span className="checkbox__box"></span>
            Все
          </label>
        </div>

        <div className="checkbox__container">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="noStops"
              onChange={handleChangeFilterStops}
              checked={stopsData.noStops}
            />
            <span className="checkbox__box"></span>
            Без пересадок
          </label>
        </div>

        <div className="checkbox__container">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="oneStop"
              onChange={handleChangeFilterStops}
              checked={stopsData.oneStop}
            />
            <span className="checkbox__box"></span>1 пересадка
          </label>
        </div>

        <div className="checkbox__container">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="twoStops"
              onChange={handleChangeFilterStops}
              checked={stopsData.twoStops}
            />
            <span className="checkbox__box"></span>2 пересадки
          </label>
        </div>

        <div className="checkbox__container">
          <label className="checkbox__label">
            <input
              className="checkbox__input"
              type="checkbox"
              id="threeStops"
              onChange={handleChangeFilterStops}
              checked={stopsData.threeStops}
            />
            <span className="checkbox__box"></span>3 пересадки
          </label>
        </div>
      </div>
    </div>
  );
}

FilterStops.propTypes = {
  stopsData: PropTypes.object,
  handleChangeFilterStops: PropTypes.func,
};
