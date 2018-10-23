import {createStore} from 'redux'
import reducer from '../redux/reducers'

export default function configureStore(init) {
    const store = createStore(reducer, init);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../redux/reducers', () => {
            const nextReducer = require('../redux/reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}