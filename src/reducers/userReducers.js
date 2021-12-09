import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from "../constants/userConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const addUserReducer = (state = { addedUser: {} }, action) => {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return { loading: true };
    case ADD_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case ADD_USER_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usersReducer = (state = { userList: [] }, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true };
    case GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
