import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Content.css';

class Content extends Component {

  render() {
    // const totalAmount = (this.props.monthlyPayment * (this.props.isFetchingData ? this.props.lastLoanDuration : this.props.loanDuration));
    return (
      <div className="content">
        <div className="main-header">EMI Info</div>
        <div className="wrapper">
          <div className="interest-rate header">Interest Rate:</div>
          <div className="interest-rate value">{this.props.interestRate}</div>
          <div className="monthly-payment header">Monthly Payment:</div>
          <div className="monthly-payment value">
            {this.props.monthlyPayment + " " + this.props.currencyUnit}
          </div>
          <div className="total-payment header">Total Amount Payable:</div>
          <div className="total-payment value">
            {this.props.totalPayableAmount}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { loanAmount, loanDuration, currencyUnit, interestRate,
     monthlyPayment, isFetchingData, lastLoanDuration, totalPayableAmount} = state;
  return {
    loanAmount, loanDuration, currencyUnit, interestRate, monthlyPayment, 
    isFetchingData, lastLoanDuration, totalPayableAmount
  }
}

export default connect(mapStateToProps)(Content);
