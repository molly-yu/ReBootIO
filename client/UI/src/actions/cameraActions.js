import { FETCH_CAMERAS, NEW_CAMERA, DELETE_CAMERA } from './types';

export const fetchCameras = () => {
    console.log('fetched');
    return {
        type: FETCH_CAMERAS
    };
};

export const createCamera = id => {
    console.log('posted');
    return {
    type: NEW_CAMERA,
    payload: id
    };
};

export const deleteCamera = id => {
    console.log('posted');
    return {
    type: DELETE_CAMERA,
    payload: id
    };
};