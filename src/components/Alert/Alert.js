import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Alert.css';
import { actions } from '../../store/actions';

class Alert extends Component {
  constructor(props) {
    super(props);
    // used for animating the postion of this component
    this.state = {
      style: {
        top: "-2.5rem"
      }
    }
    this.timeoutID = null;
    // used to remove this component by udating the store
    // when all transitions are ended.
    this.status = 0;
  }

  componentDidMount() {
    // not using setTimeout will result in the component
    // getting updated state by the time it is rendered.
    window.setTimeout(_=> {
      this.setState({style: {top: "0.7rem"} });
      // To remove this component after the below specified time
      this.timeoutID = window.setTimeout(this.hide, 3000);
    }, 0);
  }

  hide =  _=> {
    // when user clicks close button of this component
    // before the timeout period, timeout should be cleared
    // as not clearing it will resuling this component getting removed twice
    // which is not possible.
    window.clearTimeout(this.timeoutID);
    this.setState({style: {top: "-2.5rem"} });
    this.status = 1;
  }

  transitionEnded = _=> {
    if (this.status == 1) {
      // dispatching action to remove this component by updating the store
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

const mapDispatchToProps = (dispatch) => {
  return {
    hideAlert: _=> dispatch(actions.hideAlert())
  }
}

export default connect(null, mapDispatchToProps)(Alert);
