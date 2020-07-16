// root reducer
import {combineReducers} from 'redux';
import cameraReducer from './cameraReducer';
import setupReducer from './setupReducer';


export default combineReducers({
    cameras: cameraReducer,
    setup: setupReducer

});