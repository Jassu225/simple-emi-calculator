import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
  render() {
    return (
      <div className="loader-container">
        <div className="loader">
          <div className="title">fetching</div>
          <div className="ring"></div>
        </div>
      </div>
    );
  }
}

export default Loader;
