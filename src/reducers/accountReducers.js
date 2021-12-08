import {
  ADD_ACCOUNT_FAIL,
  ADD_ACCOUNT_REQUEST,
  ADD_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  GET_ACCOUNTS_FAIL,
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  UPDATE_ACCOUNT_FAIL,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
} from "../constants/accountContants";

export const accountsReducer = (state = { accountList: [] }, action) => {
  switch (action.type) {
    case GET_ACCOUNTS_REQUEST:
      return { loading: true };
    case GET_ACCOUNTS_SUCCESS:
      return { loading: false, accounts: action.payload };
    case GET_ACCOUNTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accountReducer = (state = { accountDetails: {} }, action) => {
  switch (action.type) {
    case GET_ACCOUNT_REQUEST:
      return { loading: true };
    case UPDATE_ACCOUNT_REQUEST:
      return { loading: true };
    case ADD_ACCOUNT_REQUEST:
      return { loading: true };
    case DELETE_ACCOUNT_REQUEST:
      return { loading: true };
    case GET_ACCOUNT_SUCCESS:
      return { loading: false, account: action.payload };
    case UPDATE_ACCOUNT_SUCCESS:
      return { loading: false, account: action.payload };
    case ADD_ACCOUNT_SUCCESS:
      return { loading: false, account: action.payload };
    case DELETE_ACCOUNT_SUCCESS:
      return { loading: false, account: action.payload };
    case GET_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
