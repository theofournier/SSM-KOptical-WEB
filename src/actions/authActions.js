import axios from 'axios';
import qs from 'querystring';
import { intl } from '../translations/IntlGlobalProvider';

import {
  LOGIN,
  SET_CURRENT_USER,
  AUTH_LOADING,
  AUTH_ERROR,
  FORGOT_PASSWORD,
  SEND_OTP,
} from './types';
import errorMessageHandler from '../utils/errorMessageHandler';
import { setAlert } from './alertAction';
import {
  setLocalStorage, keyCurrentUser, removeLocalStorage,
} from '../utils/localStorages';

const apiUrl = process.env.REACT_APP_API_URL;

export const loginUser = (userData, rememberMe) => async (dispatch) => {
  dispatch(setLoading(true, LOGIN));
  try {
    const res = await axios.post(`${apiUrl}/userlogin`, qs.stringify(userData));
    const { user } = res.data;
    if (rememberMe) {
      setLocalStorage(keyCurrentUser, user);
    }
    dispatch(setCurrentUser(user));
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

export const forgotPassword = (userData, callbackSuccess) => async (dispatch) => {
  dispatch(setLoading(true, FORGOT_PASSWORD));
  try {
    const res = await axios.post(`${apiUrl}/forgotpassword`, qs.stringify(userData));
    const { user } = res.data;
    if (callbackSuccess) {
      callbackSuccess(user);
    }
    dispatch(setError(false, '', '', FORGOT_PASSWORD));
  } catch (err) {
    const error = errorMessageHandler(err, FORGOT_PASSWORD);
    dispatch(setError(true, error.status, error.message, FORGOT_PASSWORD));
    dispatch(setAlert(error.message, 'error'));
  }
  dispatch(setLoading(false, FORGOT_PASSWORD));
};

export const sendOtp = (userData, callbackSuccess) => async (dispatch) => {
  dispatch(setLoading(true, SEND_OTP));
  try {
    await axios.post(`${apiUrl}/newandsendotp`, qs.stringify(userData));
    if (callbackSuccess) {
      callbackSuccess();
    }
    dispatch(setAlert(intl.formatMessage({ id: 'forgotPassword.otpSent' }), 'success'));
    dispatch(setError(false, '', '', SEND_OTP));
  } catch (err) {
    const error = errorMessageHandler(err, SEND_OTP);
    dispatch(setError(true, error.status, error.message, SEND_OTP));
    dispatch(setAlert(error.message, 'error'));
  }
  dispatch(setLoading(false, SEND_OTP));
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
