import React from 'react';
// import 'errorBoundary.css';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>Что-то пошло не так. Скоро починим</h1>
      )
    }
    return this.props.children;
  }
}
