import { isEmpty } from '../utils/validators';

import {
  SET_CURRENT_USER,
  AUTH_LOADING,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  loadings: {},
  errors: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        currentUser: payload,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          [payload.field]: payload.loading,
        },
      };
    case AUTH_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.field]: {
            hasFailed: payload.hasFailed,
            message: payload.message,
            status: payload.status,
          },
        },
      };
    default:
      return state;
  }
}
