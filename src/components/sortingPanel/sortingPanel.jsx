import React from 'react';
import './sortingPanel.css';

export default function sortingPanel(props) {
  const { handleSortByPrice, handleSortByDuration } = props;
  return (
    <div className="main-window__wrapper">
      <div className="main-window__btn-container">
        <div>
          <button className="btn btn-left btn-active" onClick={handleSortByPrice}>
            Самый дешевый
          </button>
        </div>
        <div>
          <button className="btn btn-right" onClick={handleSortByDuration}>
            Самый быстрый
          </button>
        </div>
      </div>
    </div>
  );
}
