import React, { Component } from 'react';
import './Loader.css';

// A wrapper which covers the whole page thus blocking 
// the user from interacting with the UI 
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
