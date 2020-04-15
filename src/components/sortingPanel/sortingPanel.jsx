import React from 'react';
import PropTypes from 'prop-types';
import './sortingPanel.css';

export default function SortingPanel(props) {
  const { handleChange, sortBy } = props;

  return (
    <div className="sorting-panel__inputs-block">
      <div className="radiobox">
        <input
          type="radio"
          name="sortByCost"
          id="cost"
          className="radiobox__input"
          onChange={handleChange}
          checked={sortBy === 'cost'}
        />
        <label htmlFor="cost" className="radiobox__label first-child">
          <span>Самый дешевый</span>
        </label>
      </div>

      <div className="radiobox">
        <input
          type="radio"
          name="sortByDuration"
          id="duration"
          className="radiobox__input"
          onChange={handleChange}
          checked={sortBy === 'duration'}
        />
        <label htmlFor="duration" className="radiobox__label last-child">
          Самый быстрый
        </label>
      </div>
    </div>
  );
}

SortingPanel.propTypes = {
  handleChange: PropTypes.func,
  sortBy: PropTypes.string,
};
