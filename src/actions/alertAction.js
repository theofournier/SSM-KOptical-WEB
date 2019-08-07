import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Add a new alert with a message and an alert type (success, error, warning)
// Remove this alert after timeout
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

// Remove an alert
export const removeAlert = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};
