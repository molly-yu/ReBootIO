// root reducer
import {combineReducers} from 'redux';
import cameraReducer from './cameraReducer';


export default combineReducers({
    cameras: cameraReducer
});