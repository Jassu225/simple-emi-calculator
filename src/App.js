import React from 'react';
import { connect } from 'react-redux';
// import logo from './logo.svg';
import './App.css';

import constants from './store/constants';

import Slider from './components/slider';
import History from './components/history';
import Content from './components/Content';

import { actions } from './store/actions';
import store from './store';

class App extends React.Component {
  generateRange(min, max, suffix) {
    let range = [];
    for (let i = min; i <= max; i++){
      range.push(i + " " + suffix);
    }
    return range;
  }

  onSlide = (event, data) => {
    let dispatch = store.dispatch;
    dispatch(data.userData.action(data.value));
    // let { loanAmount, loanDuration } = this.props;
    // dispatch(actions.getData({ loanAmount, loanDuration }));
  }

  render() {
    let loanAmountRange = this.generateRange(constants.loanAmountRange.min, constants.loanAmountRange.max, this.props.currencyUnit);
    let loanDurationRange = this.generateRange(constants.loanDurationRange.min, constants.loanDurationRange.max, constants.loanDurationRange.unit);
    return (
      <div className="App">
        <History/>
        <div className="sliders">
          <div className="slider-container">
            <Slider steps={loanAmountRange} data={{stateProp: "loanAmount", action: actions.updateLoanAmount }}
            showHandleLabel className="loanAmountSlider" onSlide={this.onSlide}/>
          </div>
          <div className="slider-selection loanAmount">{this.props.loanAmount + " " + this.props.currencyUnit}</div>
          <div className="slider-container">
            <Slider steps={loanDurationRange} data={{stateProp: "loanDuration", action: actions.updateLoanDuration }}
            showHandleLabel className="loanDurationSlider"  onSlide={this.onSlide}/>
          </div>
          <div className="slider-selection loanDuration">{this.props.loanDuration + " " + constants.loanDurationRange.unit}</div>
        </div>
        <Content />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loanAmount: state.loanAmount,
    loanDuration: state.loanDuration,
    currencyUnit: state.currencyUnit
  }
}

export default connect(mapStateToProps)(App);
