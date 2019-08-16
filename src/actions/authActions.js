import axios from 'axios';
import qs from 'querystring';

import {
  LOGIN,
  SET_CURRENT_USER,
  AUTH_LOADING,
  AUTH_ERROR,
} from './types';
import errorMessageHandler from '../utils/errorMessageHandler';
import { setAlert } from './alertAction';
import { setLocalStorage, keyCurrentUser, removeLocalStorage } from '../utils/localStorages';

const apiUrl = process.env.REACT_APP_API_URL;

export const loginUser = (userData, callbackSuccess) => async(dispatch) => {
  dispatch(setLoading(true, LOGIN));
  try {
    const res = await axios.post(`${apiUrl}/userlogin`, qs.stringify(userData));
    const { user } = res.data;
    setLocalStorage(keyCurrentUser, JSON.stringify(user));
    dispatch(setCurrentUser(user));

    if (callbackSuccess) { callbackSuccess(); }
    dispatch(setError(false, '', '', LOGIN));
  } catch (err) {
    const error = errorMessageHandler(err, LOGIN);
    dispatch(setError(true, error.status, error.message, LOGIN));
    dispatch(setAlert(error.message, 'error'));
  }
  dispatch(setLoading(false, LOGIN));
};


// Set logged in user
export const setCurrentUser = (currentUser) => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  removeLocalStorage(keyCurrentUser);
  dispatch(setCurrentUser({}));
};

// Set the loading and error for a particular field
export const setLoading = (loading, field) => {
  return {
    type: AUTH_LOADING,
    payload: {
      loading,
      field,
    },
  };
};

export const setError = (hasFailed, status, message, field) => {
  return {
    type: AUTH_ERROR,
    payload: {
      hasFailed,
      status,
      message,
      field,
    },
  };
};
