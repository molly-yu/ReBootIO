import { FETCH_CAMERAS, NEW_CAMERA, DELETE_CAMERA } from './types';
import axios from 'axios';

export const fetchCameras = () => dispatch => {
    console.log('fetched');  
    axios.get('http://localhost:3000/cameras')
    .then(res => dispatch({
        type: FETCH_CAMERAS,
        payload: res.data
        })
    )
    .catch(function (error) {
        console.log(error);
    });
};

export const createCamera = camera => dispatch => {
    axios.post('http://localhost:3000/cameras', camera).then(res => dispatch({
        type: NEW_CAMERA,
        payload: res.data
        })
      );

};

export const deleteCamera = id => dispatch => {
    axios.delete('http://localhost:3000/cameras/${id}').then(res => dispatch({
        type: DELETE_CAMERA,
        payload: id
        })
      );
    };