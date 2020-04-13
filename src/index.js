import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary.jsx';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);
