import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import heroes from '../Redux/reducers/heroes';
import filters from '../Redux/reducers/filters';

const stringMiddleware = () => (next) => (action) => { 
    if (typeof action === 'string') {
        return next({ type: action });
    }
    return next(action);
}

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(applyMiddleware(ReduxThunk, stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;