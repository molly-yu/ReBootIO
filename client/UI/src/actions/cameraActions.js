import { FETCH_CAMERAS, NEW_CAMERA, DELETE_CAMERA } from './types';
import axios from 'axios';
import data from '../../../../server/cameras.json';

export const fetchCameras = () => {
    console.log('fetched');
    return {
        type: FETCH_CAMERAS,
        payload: cameras
    };
};

export const createCamera = postData => {
    return{
        type: NEW_CAMERA,
        payload: camera
    };
};

// export const deleteCamera = id  => {
//     console.log('posted');
//     dispatch({
//     type: DELETE_CAMERA,
//     payload: id
//     })
// };