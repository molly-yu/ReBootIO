import { UPDATE_SETUP, FETCH_SETUP, SAVE_OPTION } from './types';
import axios from 'axios';

export const fetchSetup = () => dispatch => {
    console.log('fetched');  
    axios.get('http://localhost:3000/setup')
    .then(res => dispatch({
        type: FETCH_SETUP,
        payload: res.data
        })
    );
};
 
export const updateSetup = setup => dispatch => {
    axios.put('http://localhost:3000/setup', setup).then(res => dispatch({
        type: UPDATE_SETUP,
        payload: res.data
        })
      );
};
