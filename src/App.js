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
        <History/>{/* Used to display the previous selections with the most recent one at the top. */}
        <Selections /> {/* Selections to be made by the user inorder to fetch the data from the api server. */}
        <Content /> {/* Used to display the result obtained from the server. */}
        {/* A busy to block the user from interacting with the UI when fetching data from the api server*/}
        {this.props.isFetchingData && <Loader />}
        {/* A snack bar to inform the user in-case of network-related errors. */}
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
