import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

import reducer from '../redux/reducers'

const loggerMiddleware = createLogger();

export default function configureStore(init) {
    const store = createStore(
        reducer, 
        init,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ));
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../redux/reducers', () => {
            const nextReducer = require('../redux/reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}