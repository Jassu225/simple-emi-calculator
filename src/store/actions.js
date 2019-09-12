import fetch from 'cross-fetch';
import constants from './constants';

let action = function (type, payload) {
    return {
        type: type,
        payload: payload
    }
}

const actionTypes = {
    // data related
    updateLoanAmount: "updateLoanAmount",
    updateLoanDuration: "updateLoanDuration",
    loadFromHistory: "loadFromHistory",
    // network related
    requestInitiated: "requestInitiated",
    responseReceived: "responseReceived",
    requestFailed: "requestFailed",
    hideAlert: "hideAlert"
};

const actions = {
    updateLoanAmount: payload => action(actionTypes.updateLoanAmount, payload),
    updateLoanDuration: payload => action(actionTypes.updateLoanDuration, payload),
    loadFromHistory: payload => action(actionTypes.loadFromHistory, payload),
    // pure actions -- network related
    requestInitiated: _=> action(actionTypes.requestInitiated),
    responseReceived: payload => action(actionTypes.responseReceived, payload),
    requestFailed: payload => action(actionTypes.requestFailed, payload),
    hideAlert: _ => action(actionTypes.hideAlert),
    // impure actions -- network related -- asynchronous
    getData: function (payload) {
        let { loanAmount, loanDuration } = payload, { loanAmountRange, loanDurationRange } = constants;
        if (loanAmount && loanDuration && !isNaN(parseFloat(loanAmount)) && !isNaN(parseInt(loanDuration)) &&
            loanAmount >= loanAmountRange.min && loanAmount <= loanAmountRange.max &&
            loanDuration >= loanDurationRange.min && loanDuration <= loanDurationRange.max
        ) {
            return function(dispatch) {
                let isErrorOccurred = false;
                dispatch(actions.requestInitiated());
                return fetch(`${constants.apiRootURL}?amount=${loanAmount}&numMonths=${loanDuration}`)
                .then(response => response.json(), error => {
                    dispatch(actions.requestFailed({error}));
                    isErrorOccurred = true;
                }).then(json => {
                    if(!isErrorOccurred)
                        dispatch(actions.responseReceived(json));
                });
            };
        } else {
            // some error occurred
            return (dispatch=> dispatch(actions.requestFailed({error: ""})));
        }
    }
}

export {
    actions, actionTypes
};