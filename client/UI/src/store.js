import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'remote-redux-devtools'

const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Your Instance Name',
  hostname: 'localhost',
  port: 1024 // the port your remotedev server is running at
})

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    initialState, 
    composeEnhancers (
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


export default store;