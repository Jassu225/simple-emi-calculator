import { actionTypes } from './actions';
import constants from './constants';
import localStore from './localStore';

let initialState = {
    loanAmount: constants.loanAmountRange.min,
    currencyUnit: "USD",
    lastLoanDuration : constants.loanDurationRange.min,
    loanDuration: constants.loanDurationRange.min, // in months
    interestRate: 0,
    monthlyPayment: 0,
    historyData: localStore.getData(),
    addToHistory: true,
    fetchData: false,
    isFetchingData: false,
    serverData: null
}

let reducer = function (state = initialState, action) {
    switch(action.type) {
        case actionTypes.updateLoanAmount: {
        let payload = null;
        if(action.payload)
            payload = parseFloat(action.payload);
        return {
            ...state, 
            loanAmount: payload && !isNaN(payload) ? payload : state.loanAmount,
            fetchData: true
        }}
        case actionTypes.updateLoanDuration: {
        let payload = null;
        if(action.payload)
            payload = parseFloat(action.payload);
        return {
            ...state, 
            lastLoanDuration: state.loanDuration,
            loanDuration: payload && !isNaN(payload) ? payload : state.loanDuration,
            fetchData: true
        }}
        case actionTypes.loadFromHistory:
        return {
            ...state,
            loanAmount: action.payload.principal.amount,
            loanDuration: action.payload.numPayments,
            fetchData: true,
            addToHistory: action.payload.addToHistory
        }
        case actionTypes.requestInitiated:
        return {
            ...state,
            isFetchingData: true,
            fetchData: false
        }
        case actionTypes.responseReceived:
        console.log(action.payload);
        let {interestRate, monthlyPayment} = action.payload;
        let newState = {
            ...state,
            isFetchingData: false,
            interestRate: interestRate * 100 + "%",
            monthlyPayment: monthlyPayment.amount,
            currencyUnit: monthlyPayment.currency
        }
        if  (state.addToHistory) {
            localStore.push(action.payload);
            newState.historyData = localStore.getData();
        } else
            newState.addToHistory = true;
        return newState;
        case actionTypes.requestFailed:
        return {
            ...state,
            isFetchingData: false
        }
        default: 
            return state;
    }
}

export default reducer;