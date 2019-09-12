import React, { Component } from 'react';
import { connect } from 'react-redux';

import './history.css';
import constants from '../../store/constants';
import { actions } from '../../store/actions';

class History extends Component {
  historyItemClicked = index => {
    let data = this.props.historyData[index];
    this.props.loadDataFromHistory({
      ...data,
      addToHistory: index != this.props.historyData.length - 1
    });
  }

  render() {
    // console.log(this.props);
    let elements = [], history = this.props.historyData ? this.props.historyData : [];
    for(let i = history.length - 1; i >= 0 ; i--) {
      elements.push(
        <div className="history-item" key={i}>
          <div className="history-loan-amount">
            {history[i].principal.amount + " " + history[i].principal.currency}
          </div>
          <div className="history-loan-duration">
            {history[i].numPayments + " " + constants.loanDurationRange.unit}
          </div>
          <div className="action-container">
            <div className="action btn" onClick={ _=> this.historyItemClicked(i)}>view</div>
          </div>
        </div>
      );
    }
    return (
      <div className="history">
        <div className="history-header">
          <div className="title">History</div>
          <div className="sub-headers">
            <div>Loan Amount</div>
            <div>Duration</div>
            <div>Action</div>
          </div>
        </div>
        <div className="history-content">
          {elements.length ? elements : <div className="no-history">history goes here</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let {historyData} = state;
  return {historyData};
}

const mapDispatchToProps = dispatch => {
  return {
    loadDataFromHistory: payload => dispatch(actions.loadFromHistory(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
