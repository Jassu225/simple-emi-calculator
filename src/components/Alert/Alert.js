import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Alert.css';
import { actions } from '../../store/actions';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        top: "-2.5rem"
      }
    }
    this.timeoutID = null;
    this.status = 0;
  }

  componentDidMount() {
    window.setTimeout(_=> {
      this.setState({style: {top: "0.7rem"} });
      this.timeoutID = window.setTimeout(this.hide, 3000);
    }, 0);
  }

  hide =  _=> {
    window.clearTimeout(this.timeoutID);
    this.setState({style: {top: "-2.5rem"} });
    this.status = 1;
  }

  transitionEnded = _=> {
    // if(this.status == 0) {
    //   this.hide();
    // } else 
    if (this.status == 1) {
      this.props.hideAlert();
    }
  }

  render() {
    const message = this.props.message ? this.props.message : "some error occurred.";
    return (
      <div className="alert-dialog" style={this.state.style} onTransitionEnd={this.transitionEnded}>
        <div className="message">{message}</div>
        <div className="closeBtn" onClick={this.hide}>&#x2715;</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    hideAlert: _=> dispatch(actions.hideAlert())
  }
}

export default connect(null, mapDispatchToProps)(Alert);
