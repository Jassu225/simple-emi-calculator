import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import { actions } from './actions';

// for redux dev-tools extension
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

store.subscribe(function(){
    let state = store.getState();
    let { fetchData, loanAmount, loanDuration, isFetchingData } = state;
    if (fetchData && !isFetchingData) {
        store.dispatch(actions.getData({loanAmount, loanDuration}));
    }
});

export default store;