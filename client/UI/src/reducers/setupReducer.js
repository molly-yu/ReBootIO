import {FETCH_SETUP, UPDATE_SETUP} from '../actions/types';

const initialState = {
    item: {}
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

        default:
            return state;
    }
}