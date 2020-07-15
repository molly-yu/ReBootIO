import {FETCH_SETUP, UPDATE_SETUP, SAVE_OPTION} from '../actions/types';

const initialState = {
    item: {},
    value:{}
};

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_SETUP:
            return {
                ...state,
                item: action.payload
            };
        case UPDATE_SETUP:
            return {
                ...state,
                 item:action.payload
            };
            case SAVE_OPTION:
            return {
                ...state,
                 value:action.data
            };
        default:
            return state;
    }
}