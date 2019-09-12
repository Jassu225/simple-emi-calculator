import React from 'react';
import { connect } from 'react-redux';
// import logo from './logo.svg';
import './App.css';

import History from './components/history';
import Content from './components/Content';
import Loader from './components/Loader';
import Alert from './components/Alert';
import Selections from './components/Selections';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <History/>
        <Selections />
        <Content />
        {this.props.isFetchingData && <Loader />}
        {this.props.showAlert && <Alert message={"some error occurred. Please try again."}/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetchingData: state.isFetchingData,
    showAlert: state.showAlert
  }
}

export default connect(mapStateToProps)(App);
