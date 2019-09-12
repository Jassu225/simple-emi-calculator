import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Selections.css';
import Slider from '../slider';

import constants from '../../store/constants';
import { actions } from '../../store/actions';

class Selections extends Component {
  generateRange(min, max, suffix) {
    let range = [];
    for (let i = min; i <= max; i++){
      range.push(i + " " + suffix);
    }
    return range;
  }

  onSlide = (event, data) => {
    this.props.updateData(data.userData.action,data.value);
    // let { loanAmount, loanDuration } = this.props;
    // dispatch(actions.getData({ loanAmount, loanDuration }));
  }

  render() {
    let loanAmountRange = this.generateRange(constants.loanAmountRange.min, constants.loanAmountRange.max, this.props.currencyUnit);
    let loanDurationRange = this.generateRange(constants.loanDurationRange.min, constants.loanDurationRange.max, constants.loanDurationRange.unit);
    return (
      <div className="sliders">
        <div className="header">Selections</div>
        <div className="slider-selection loanAmount">
          <div className="slider-selection-header">Loan Amount: </div>
          <div className="slider-selection-value">{this.props.loanAmount + " " + this.props.currencyUnit}</div>
        </div>
        <div className="slider-container">
          <Slider steps={loanAmountRange} data={{ stateProp: "loanAmount", action: actions.updateLoanAmount }}
            showHandleLabel className="loanAmountSlider" onSlide={this.onSlide} value={this.props.loanAmountHandleValue} />
        </div>
        <div className="slider-selection loanDuration">
          <div className="slider-selection-header">Duration: </div>
          <div className="slider-selection-value">{this.props.loanDuration + " " + constants.loanDurationRange.unit}</div>
        </div>
        <div className="slider-container">
          <Slider steps={loanDurationRange} data={{ stateProp: "loanDuration", action: actions.updateLoanDuration }}
            showHandleLabel className="loanDurationSlider" onSlide={this.onSlide} value={this.props.loanDurationHandleValue} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loanAmount: state.loanAmount,
    loanDuration: state.loanDuration,
    currencyUnit: state.currencyUnit,
    loanAmountHandleValue: state.loanAmountHandleValue,
    loanDurationHandleValue: state.loanDurationHandleValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateData: (action, payload) => dispatch(action(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selections);
