import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT,
} from "../constants/userConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST || LOGIN_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS || LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case REGISTER_FAIL || LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return null;
    default:
      return state;
  }
};
