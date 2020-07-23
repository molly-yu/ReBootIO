import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'

// const composeEnhancers = composeWithDevTools({
//   realtime: true,
//   name: 'Your Instance Name',
//   hostname: 'localhost',
//   port: 1024 // the port your remotedev server is running at
// })
// const composeEnhancers = composeWithDevTools({ realtime: true, hostname:'localhost', port: 8000 })

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


export default store;